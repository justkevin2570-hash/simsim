'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useGuideStore } from '@/lib/guideStore';

type BuilderStep = {
  id: number;
  name: string;
  guide: string;
  file?: string;
};

function buildMermaidCode(taskName: string, steps: BuilderStep[]): string {
  const name = taskName || '신규 업무';
  const lines = steps.map(
    (s, i) => `    s${i}["${i + 1}. ${s.name.replace(/"/g, '')}"]`,
  );
  const arrows = steps.slice(0, -1).map((_, i) => `    s${i} --> s${i + 1}`);
  return `graph TD\n${lines.join('\n')}\n${arrows.join('\n')}`;
}

/**
 * 선생님용 업무 제작기 탭
 */
export function BuilderPanel({
  onTabChange,
}: {
  onTabChange?: (tab: 'view' | 'build' | 'admin') => void;
}) {
  const { builderPreset, setBuilderPreset, setAdminPendingJson } = useGuideStore();

  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('학생지도/행사');
  const [keywords, setKeywords] = useState('');
  const [steps, setSteps] = useState<BuilderStep[]>([]);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  // builderPreset이 있으면 폼에 자동 채움
  useEffect(() => {
    if (builderPreset) {
      setTaskName(builderPreset.taskName);
      setCategory(builderPreset.category);
      setKeywords(builderPreset.keywords);
      setSteps(
        builderPreset.steps.map((s, i) => ({
          id: i + 1,
          name: s.stepName,
          guide: s.guideText,
          file: s.files?.[0]?.name || '',
        })),
      );
      nextIdRef.current = builderPreset.steps.length + 1;
      setBuilderPreset(null);
    } else if (steps.length === 0) {
      // 초기값: 빈 상태로 시작
      const id = nextIdRef.current++;
      setSteps([
        { id, name: '계획안 내부결재', guide: '행정의 시작이므로, 먼저 계획을 구체적으로 세워 기안을 올립니다.' },
      ]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addStep = () => {
    const id = nextIdRef.current++;
    setSteps([...steps, { id, name: '새로운 가이드 단계', guide: '이 단계에서 처리해야 할 업무 내용과 방법을 자세히 기재해 주세요.' }]);
  };

  const removeStep = (id: number) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((s) => s.id !== id));
  };

  const moveStep = (idx: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[idx], next[target]] = [next[target], next[idx]];
    setSteps(next);
  };

  const updateStep = (id: number, key: keyof BuilderStep, val: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [key]: val } : s)));
  };

  // Mermaid 차트
  const renderMermaid = useCallback(async () => {
    if (!mermaidRef.current) return;
    try {
      const mermaid = await import('mermaid');
      mermaid.default.initialize({ startOnLoad: false, theme: 'default' });
      const code = buildMermaidCode(taskName, steps);
      const { svg } = await mermaid.default.render('mermaid-svg-' + Date.now(), code);
      mermaidRef.current.innerHTML = svg;
    } catch {
      // silent
    }
  }, [taskName, steps]);

  useEffect(() => {
    const timer = setTimeout(renderMermaid, 500);
    return () => clearTimeout(timer);
  }, [renderMermaid]);

  // JSON 생성 & 모달
  const [showModal, setShowModal] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('');

  const generateJson = () => {
    if (!taskName.trim()) {
      alert('업무명을 입력해주세요.');
      return;
    }
    const payload = {
      taskName,
      category,
      keywords,
      steps: steps.map((s) => ({
        stepName: s.name,
        guideText: s.guide,
        files: s.file ? [{ name: s.file, url: '#' }] : [],
      })),
    };
    setJsonOutput(JSON.stringify(payload, null, 2));
    setShowModal(true);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* 좌측: 편집 폼 (7col) */}
      <section className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 overflow-y-auto max-h-[80vh]">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            <span className="text-blue-500 mr-2">✏️</span>업무 흐름도 제작 및 설계
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            학교에서 자주하는 행사나 잡무의 프로세스를 직접 완성해 보세요.
          </p>
        </div>

        {/* 메타 정보 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">
              행정 업무명 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="예: 방과후학교 외부강사 채용"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">
              분류 카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="학생지도/행사">학생지도 및 행사</option>
              <option value="교무/인사">교무행정 및 인사</option>
              <option value="예산/회계">예산운영 및 회계</option>
              <option value="시설/환경">시설관리 및 환경</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1.5">
              검색용 키워드 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="예: 외부강사, 강사채용, 방과후수업, 수당"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 단계 편집 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              <span className="text-blue-500 mr-2">📋</span>단계별 세부 가이드라인
            </h3>
            <button
              type="button"
              onClick={addStep}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <span className="mr-1">+</span>단계 추가
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 relative space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    단계 {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveStep(idx, 'up')}
                      disabled={idx === 0}
                      className="text-slate-400 hover:text-blue-500 text-xs p-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="위로"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(idx, 'down')}
                      disabled={idx === steps.length - 1}
                      className="text-slate-400 hover:text-blue-500 text-xs p-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="아래로"
                    >
                      ↓
                    </button>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(step.id)}
                        className="text-slate-400 hover:text-red-500 text-xs p-1 cursor-pointer"
                        title="삭제"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    단계 제목 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={step.name}
                    onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    예시 파일명 (옵션)
                  </label>
                  <input
                    type="text"
                    value={step.file || ''}
                    onChange={(e) => updateStep(step.id, 'file', e.target.value)}
                    placeholder="예: 계획서 표준안.hwp"
                    className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    세부 가이드 매뉴얼 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={step.guide}
                    onChange={(e) => updateStep(step.id, 'guide', e.target.value)}
                    rows={3}
                    className="w-full border border-slate-200 bg-white rounded-lg p-2.5 text-xs focus:outline-none resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 우측: 미리보기 + 제출 (5col) */}
      <section className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4">
        <div className="space-y-4 flex-1">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              <span className="text-emerald-500 mr-2">👁</span>실시간 흐름도 미리보기
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              입력하신 단계 정보가 즉시 차트로 구조화됩니다.
            </p>
          </div>

          <div
            ref={mermaidRef}
            className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-center min-h-[220px] overflow-auto"
          >
            <div className="text-slate-400 text-xs">
              {taskName
                ? '차트 생성 중...'
                : '업무명을 입력하면 흐름도가 표시됩니다.'}
            </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl text-xs text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">
              <span className="mr-1">💡</span>설계를 마치셨나요?
            </p>
            <p className="text-amber-700">
              하단의 &apos;제출용 데이터 생성&apos; 버튼을 눌러 JSON을
              관리자에게 전송해주세요!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={generateJson}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-100 cursor-pointer text-sm"
        >
          <span className="mr-2">📤</span>제출용 데이터 생성하기
        </button>
      </section>

      {/* JSON 출력 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                <span className="text-blue-500 mr-2">📤</span>
                전송할 데이터를 복사하세요
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              아래 데이터를 복사하거나, 관리자 반영기로 바로 보낼 수 있습니다.
            </p>
            <textarea
              readOnly
              value={jsonOutput}
              className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-600 focus:outline-none resize-none"
            />
            <div className="mt-4 flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(jsonOutput);
                  alert('클립보드에 복사되었습니다!');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                📋 복사하기
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdminPendingJson(jsonOutput);
                  setShowModal(false);
                  onTabChange?.('admin');
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                🔐 반영기로 보내기
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
