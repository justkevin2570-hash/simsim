'use client';

import { useState, useEffect } from 'react';
import { useGuideStore } from '@/lib/guideStore';

/**
 * 관리자 간편 반영기 탭
 * 좌측: JSON 붙여넣기
 * 우측: TypeScript 코드 생성 + 로컬 DB 즉시 반영
 */
export function AdminPanel({
  onTabChange,
}: {
  onTabChange?: (tab: 'view' | 'build' | 'admin') => void;
}) {
  const [rawJson, setRawJson] = useState('');
  const [parsed, setParsed] = useState<any>(null);
  const [verifyBadge, setVerifyBadge] = useState(false);
  const [tsCode, setTsCode] = useState('');
  const [storeCode, setStoreCode] = useState('');
  const { addSubmittedGuide, adminPendingJson, setAdminPendingJson } = useGuideStore();

  // builder에서 보낸 JSON 자동 수신
  useEffect(() => {
    if (adminPendingJson) {
      setRawJson(adminPendingJson);
      setAdminPendingJson(null);
      // 자동 분석
      setTimeout(() => {
        const btn = document.querySelector('[data-admin-parse]') as HTMLButtonElement;
        btn?.click();
      }, 100);
    }
  }, [adminPendingJson, setAdminPendingJson]);

  /** JSON 분석 및 TypeScript 코드 생성 */
  const handleParse = () => {
    if (!rawJson.trim()) {
      alert('JSON 데이터를 붙여넣으세요.');
      return;
    }
    try {
      const data = JSON.parse(rawJson);
      if (!data.taskName || !data.steps || !Array.isArray(data.steps)) {
        throw new Error('필수 필드 누락: taskName 또는 steps 배열');
      }
      setParsed(data);
      setVerifyBadge(true);

      // TypeScript 코드 생성
      const domainId = data.taskName
        .replace(/[^가-힣a-zA-Z0-9]/g, '_')
        .toLowerCase()
        .replace(/^_+|_+$/g, '');
      const stepsCode = data.steps
        .map(
          (s: any, i: number) =>
            `  {\n    order: ${i + 1},\n    title: '${s.stepName.replace(/'/g, "\\'")}',\n    stepLabel: 'STEP ${String(i + 1).padStart(2, '0')}',\n    summary: '${(s.guideText || '').slice(0, 100).replace(/'/g, "\\'")}',\n    contentHtml: \`<div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">\n      <h3 class="font-bold text-gray-900 mb-2">📌처리 방법 설명</h3>\n      <p class="text-sm text-gray-600">${(s.guideText || '').replace(/`/g, '\\`')}</p>\n    </div>\`,\n  }`,
        )
        .join(',\n');

      const ts = `/**
 * ${data.taskName} — 자동 생성 (관리자 반영)
 */
import { registerGuide, type ProcessStep } from '@/lib/processGuides';

const steps: ProcessStep[] = [
${stepsCode}
];

registerGuide({
  domainId: '${domainId}',
  steps,
});
`;
      setTsCode(ts);

      // Store 코드 생성
      const storeSnippet = `// useGuideStore.addSubmittedGuide()로 추가 가능한 데이터:
{
  taskName: '${data.taskName.replace(/'/g, "\\'")}',
  category: '${(data.category || '').replace(/'/g, "\\'")}',
  keywords: '${(data.keywords || '').replace(/'/g, "\\'")}',
  steps: ${JSON.stringify(data.steps.map((s: any) => ({
    stepName: s.stepName,
    guideText: s.guideText,
    files: s.files || [],
  })), null, 2)}
}`;
      setStoreCode(storeSnippet);
    } catch (e: any) {
      alert(`JSON 파싱 오류: ${e.message}`);
      setVerifyBadge(false);
    }
  };

  /** 로컬 DB에 즉시 반영 (인메모리 검증) */
  const handleApplyToLocalDB = () => {
    if (!parsed) return;
    const newId = addSubmittedGuide({
      taskName: parsed.taskName,
      category: parsed.category || '기타',
      keywords: parsed.keywords || '',
      steps: parsed.steps.map((s: any) => ({
        stepName: s.stepName,
        guideText: s.guideText,
        files: s.files || [],
      })),
    });
    alert(
      `✅ 로컬 DB에 반영 완료! (taskId: ${newId})\n조회 탭에서 확인해보세요.`,
    );
    if (onTabChange) onTabChange('view');
  };

  /** 샘플 데이터 로드 */
  const loadSample = () => {
    const sample = {
      taskName: '지필평가 문항 원안 출제',
      category: '교무/인사',
      keywords: '시험, 지필, 중간고사, 기말고사, 원안, 출제',
      steps: [
        {
          stepName: '출제 계획 및 이원목적분류표 작성',
          guideText:
            '평가계획서 기준 시수와 채점비율을 맞춰 이원목적분류표를 사전에 작성합니다.',
          files: [],
        },
        {
          stepName: '시험 문제 원안 기안',
          guideText:
            '안전하게 비밀번호가 설정된 보안 USB를 이용하여 기안을 태우고 원안을 비밀 인쇄실로 인계합니다.',
          files: [],
        },
      ],
    };
    setRawJson(JSON.stringify(sample, null, 2));
    alert('테스트 샘플이 로드되었습니다.');
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* 좌측: JSON 입력 (5col) */}
      <section className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            <span className="text-indigo-500 mr-2">📥</span>수신 데이터 수집함
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            선생님들께 전달받은 JSON 데이터를 아래에 붙여넣으세요.
          </p>
        </div>

        <textarea
          value={rawJson}
          onChange={(e) => setRawJson(e.target.value)}
          placeholder="이곳에 전달받은 텍스트(JSON)를 붙여넣으세요..."
          className="w-full flex-1 min-h-[280px] bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-admin-parse
            onClick={handleParse}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <span className="mr-1.5">🔮</span>분석 및 검증
          </button>
          <button
            type="button"
            onClick={loadSample}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            테스트 샘플 로드
          </button>
        </div>
      </section>

      {/* 우측: 코드 생성 결과 (7col) */}
      <section className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              <span className="text-slate-700 mr-2">⚡</span>자동화 코드 제너레이터
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              프로젝트에 즉각 반영할 수 있도록 코드가 자동 생성됩니다.
            </p>
          </div>
          {verifyBadge && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              ✅ 검증 완료
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {/* TypeScript 코드 */}
          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-bold text-slate-500 mb-1">
              📄 TypeScript 파일 코드 (
              <code className="text-blue-600">lib/processGuides/&lt;domain&gt;.ts</code>
              )
            </label>
            <textarea
              readOnly
              value={
                tsCode ||
                '데이터 분석 완료 후 코드가 자동 생성됩니다...'
              }
              className="w-full flex-1 bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-xs focus:outline-none resize-none min-h-[180px]"
            />
          </div>

          {/* Store 코드 */}
          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-bold text-slate-500 mb-1">
              📝 로컬 DB 추가용 데이터
            </label>
            <textarea
              readOnly
              value={
                storeCode ||
                '로컬 데이터베이스에 즉시 반영할 수 있는 코드입니다...'
              }
              className="w-full flex-1 bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-xs focus:outline-none resize-none min-h-[120px]"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="pt-4 border-t border-slate-100 flex space-x-2">
          <button
            type="button"
            onClick={handleApplyToLocalDB}
            disabled={!parsed}
            className={`flex-1 font-bold py-3 rounded-xl text-sm transition-all cursor-pointer ${
              parsed
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span className="mr-1.5">💾</span>로컬 DB에 즉시 반영 (테스트)
          </button>
          <button
            type="button"
            onClick={() => {
              if (tsCode) {
                navigator.clipboard.writeText(tsCode);
                alert('TypeScript 코드가 클립보드에 복사되었습니다!');
              }
            }}
            disabled={!tsCode}
            className={`px-5 font-bold rounded-xl text-sm transition-colors cursor-pointer ${
              tsCode
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-slate-50 text-slate-300 cursor-not-allowed'
            }`}
          >
            📋 코드 복사
          </button>
        </div>
      </section>
    </div>
  );
}
