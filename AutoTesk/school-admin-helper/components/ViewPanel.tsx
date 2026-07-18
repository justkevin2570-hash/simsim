'use client';

import { useState, useMemo } from 'react';
import { useGuideStore, type Guide } from '@/lib/guideStore';
import { ViewDetail } from '@/components/ViewDetail';

/**
 * 업무 검색 및 조회 탭
 * 좌측: 검색 + 업무 목록 + STEP 흐름도
 * 우측: 상세 매뉴얼
 */
export function ViewPanel() {
  const { guides, searchGuides, activeTaskId, setActiveTaskId } =
    useGuideStore();
  const [query, setQuery] = useState('');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const results = useMemo(() => searchGuides(query), [query, guides]);

  const activeGuide = guides.find((g) => g.taskId === activeTaskId);
  const activeStepData = activeGuide?.steps.find(
    (s) => s.stepOrder === activeStep,
  );

  const handleSelectTask = (task: Guide) => {
    setActiveTaskId(task.taskId);
    setActiveStep(task.steps.length > 0 ? task.steps[0].stepOrder : null);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* 좌측: 검색 + 업무 목록 + STEP 흐름도 (5col) */}
      <section className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        {/* 검색 */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            행정 업무 검색
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="업무명 또는 키워드 입력 (예: 체험학습, 수당)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <span className="absolute right-4 top-3 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>

        {/* 업무 목록 */}
        <div>
          <span className="text-xs font-bold text-slate-400 block mb-2">
            등록된 전체 업무 리스트 ({results.length})
          </span>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {results.length === 0 ? (
              <span className="text-xs text-slate-400 block px-3 py-2">
                검색 결과가 없습니다.
              </span>
            ) : (
              results.map((task) => {
                const isActive = task.taskId === activeTaskId;
                return (
                  <button
                    key={task.taskId}
                    type="button"
                    onClick={() => handleSelectTask(task)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>
                      <span className="mr-1.5">📁</span>
                      {task.taskName}
                    </span>
                    <span
                      className={`text-[10px] font-normal ${
                        isActive ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {task.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 선택된 업무 정보 + STEP 흐름도 */}
        {activeGuide ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {activeGuide.category}
              </span>
              <span className="text-[10px] text-slate-400">
                {activeGuide.source === 'builtin' ? '📦 기본' : '📝 제안됨'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeGuide.taskName}
            </h2>

            <div className="space-y-1">
              {activeGuide.steps.map((step) => {
                const isActive = step.stepOrder === activeStep;
                const isLast =
                  step.stepOrder === activeGuide.steps.length;
                return (
                  <div key={step.stepOrder}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(step.stepOrder)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer shadow-xs ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/50'
                          : 'border-slate-200 bg-white hover:border-blue-400'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold block mb-0.5 ${
                          isActive ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      >
                        STEP{' '}
                        {String(step.stepOrder).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-bold text-sm ${
                          isActive ? 'text-blue-950' : 'text-slate-800'
                        }`}
                      >
                        {step.stepOrder}. {step.stepName}
                      </span>
                    </button>
                    {!isLast && (
                      <div className="flex justify-center py-0.5">
                        <span className="text-slate-300 text-lg leading-none">
                          ↓
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 수정하러 가기 (향후 builder 연동) */}
            <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl flex items-center justify-between mt-2">
              <div className="text-xs text-blue-900 leading-relaxed">
                <p className="font-bold">💡 팁이 있거나 수정이 필요하신가요?</p>
                <p className="text-blue-700 text-[10px]">
                  제작기 탭에서 이 업무를 수정하고 제출해 주세요!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  /* TODO: switch to build tab with data */
                }}
                className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
              >
                수정하러 가기
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            <span className="text-3xl block mb-2">📋</span>
            왼쪽 목록에서 업무를 선택하세요
          </div>
        )}
      </section>

      {/* 우측: 상세 매뉴얼 (7col) */}
      <section className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
        {activeStepData ? (
          <ViewDetail
            guide={activeGuide!}
            step={activeStepData}
            onCloneToBuilder={() => {
              /* TODO */
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <span className="text-4xl text-slate-300 block mb-3">📖</span>
              <p className="text-sm">
                {activeGuide
                  ? '왼쪽 프로세스 맵에서 단계를 선택하세요'
                  : '왼쪽 목록에서 업무를 선택하세요'}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
