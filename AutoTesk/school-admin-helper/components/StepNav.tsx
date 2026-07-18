'use client';

import type { ProcessStep } from '@/lib/processGuides';

type Props = {
  steps: ProcessStep[];
  activeStep: number | null;
  onStepChange: (order: number) => void;
};

/**
 * 좌측 프로세스 단계 네비게이션
 * 각 단계를 border 카드로 표시하고 활성/비활성 스타일을 구분한다.
 * 마지막 단계를 제외한 각 카드 아래에 ↓ 화살표를 표시한다.
 */
export function StepNav({ steps, activeStep, onStepChange }: Props) {
  return (
    <div className="flex flex-col space-y-0">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">
        업무 프로세스 지도
      </h2>

      {steps.map((step) => {
        const isActive = step.order === activeStep;
        const isLast = step.order === steps.length;

        return (
          <div key={step.order}>
            <button
              type="button"
              onClick={() => onStepChange(step.order)}
              className={`
                step-btn w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer
                ${!isLast ? 'shadow-xs' : 'shadow-xs'}
                ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/50 hover:border-blue-600'
                    : 'border-gray-200 bg-white hover:border-blue-500'
                }
              `}
            >
              <span
                className={`text-xs font-semibold block mb-1 ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {step.stepLabel}
              </span>
              <span
                className={`font-bold text-base ${
                  isActive ? 'text-blue-900' : 'text-gray-800'
                }`}
              >
                {step.order}. {step.title}
              </span>
            </button>

            {/* 화살표 (마지막 단계 제외) */}
            {!isLast && (
              <div className="flex justify-center py-1">
                <span className="text-gray-300 text-xl leading-none">↓</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
