'use client';

type StepperProps = {
  currentStep: number;
  onStepClick: (step: number) => void;
};

const stepLabels = [
  '기본 개요',
  '목적 및 방침',
  '시간표 구성',
  '부스 운영',
  '동아리 부스',
  '특강 계획',
  '예산 계획',
  '기대 효과',
  '별첨 서식',
];

export function Stepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-start min-w-[640px] pt-1">
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isClickable = stepNum < currentStep;

          return (
            <div key={stepNum} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(stepNum)}
                disabled={!isClickable}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isCurrent
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap ${
                    isCompleted
                      ? 'text-blue-600'
                      : isCurrent
                      ? 'text-blue-700'
                      : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </button>
              {idx < stepLabels.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 mt-[-10px] ${
                    stepNum < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
