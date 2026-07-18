'use client';

import { useState } from 'react';
import { useGuideStore } from '@/lib/guideStore';
import { useMyTaskStore } from '@/lib/myTaskStore';
import { ViewDetail } from '@/components/ViewDetail';

/**
 * 내 업무 탭
 * 사용자가 저장한 업무만 모아서 보여준다.
 */
export function MyTaskPanel() {
  const { guides } = useGuideStore();
  const { myTasks, getMyGuides, removeMyTask } = useMyTaskStore();
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const myGuides = getMyGuides(guides);
  const activeGuide = guides.find((g) => g.taskId === activeTaskId);
  const activeStepData = activeGuide?.steps.find(
    (s) => s.stepOrder === activeStep,
  );

  const handleSelectTask = (taskId: number) => {
    setActiveTaskId(taskId);
    const task = guides.find((g) => g.taskId === taskId);
    setActiveStep(task && task.steps.length > 0 ? task.steps[0].stepOrder : null);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* 좌측: 내 업무 목록 (5col) */}
      <section className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            ⭐ 내 업무 ({myGuides.length}개)
          </h2>
        </div>

        {myGuides.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12">
            <span className="text-3xl mb-2">📂</span>
            <p className="text-sm">저장된 업무가 없습니다.</p>
            <p className="text-xs mt-1">
              조회탭에서 업무를 검색하고 &apos;내 업무에 추가&apos;를 눌러보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-1 flex-1">
            {myGuides.map((guide) => {
              const isActive = guide.taskId === activeTaskId;
              return (
                <div key={guide.taskId} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSelectTask(guide.taskId)}
                    className={`flex-1 text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>
                      <span className="mr-1.5">📁</span>
                      {guide.taskName}
                    </span>
                    <span
                      className={`text-[10px] font-normal ${
                        isActive ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {guide.category}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeMyTask(guide.taskId);
                      if (activeTaskId === guide.taskId) {
                        setActiveTaskId(null);
                        setActiveStep(null);
                      }
                    }}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                    title="삭제"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeGuide && (
          <>
            <hr className="border-slate-100" />
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
                const isActiveStep = step.stepOrder === activeStep;
                const isLast =
                  step.stepOrder === activeGuide.steps.length;
                return (
                  <div key={step.stepOrder}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(step.stepOrder)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer shadow-xs ${
                        isActiveStep
                          ? 'border-blue-600 bg-blue-50/50'
                          : 'border-slate-200 bg-white hover:border-blue-400'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold block mb-0.5 ${
                          isActiveStep ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      >
                        STEP {String(step.stepOrder).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-bold text-sm ${
                          isActiveStep ? 'text-blue-950' : 'text-slate-800'
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
          </>
        )}
      </section>

      {/* 우측: 상세 매뉴얼 (7col) */}
      <section className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
        {activeStepData ? (
          <ViewDetail
            guide={activeGuide!}
            step={activeStepData}
            onCloneToBuilder={() => {}}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <span className="text-4xl text-slate-300 block mb-3">📖</span>
              <p className="text-sm">
                {activeGuide
                  ? '왼쪽 프로세스 맵에서 단계를 선택하세요'
                  : '내 업무를 선택하면 매뉴얼이 표시됩니다'}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
