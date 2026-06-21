'use client';

import Link from 'next/link';
import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import { Stepper } from '@/components/Stepper';
import { Step1BasicInfo } from '@/components/wizards/fairPlan/Step1BasicInfo';
import { Step2Purpose } from '@/components/wizards/fairPlan/Step2Purpose';
import { Step3Timetable } from '@/components/wizards/fairPlan/Step3Timetable';
import { Step4Booths } from '@/components/wizards/fairPlan/Step4Booths';
import { Step5Clubs } from '@/components/wizards/fairPlan/Step5Clubs';
import { Step6Lecture } from '@/components/wizards/fairPlan/Step6Lecture';
import { Step7Budget } from '@/components/wizards/fairPlan/Step7Budget';
import { Step8Expectation } from '@/components/wizards/fairPlan/Step8Expectation';
import { Step9Attachments } from '@/components/wizards/fairPlan/Step9Attachments';
import { PlanPreview } from '@/components/PlanPreview';

const stepComponents: Record<number, React.ReactNode> = {
  1: <Step1BasicInfo />,
  2: <Step2Purpose />,
  3: <Step3Timetable />,
  4: <Step4Booths />,
  5: <Step5Clubs />,
  6: <Step6Lecture />,
  7: <Step7Budget />,
  8: <Step8Expectation />,
  9: <Step9Attachments />,
  10: null, // PlanPreview는 별도로 처리
};

export default function FairPlanWizard() {
  const { currentStep, setCurrentStep, resetAll } = useFairPlanStore();

  const isPreview = currentStep === 10;

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/fair" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            ← 교육과정 박람회
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">교육과정 박람회 운영 계획서 마법사</h1>
          <p className="text-sm text-gray-500 mt-1">9단계로 완성하는 마스터 계획서</p>
        </div>

        <div className="mb-6 print:hidden">
          <Stepper currentStep={currentStep > 9 ? 9 : currentStep} onStepClick={setCurrentStep} />
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 print:border-0 print:shadow-none print:p-0">
          {isPreview ? (
            <PlanPreview onEdit={(step) => setCurrentStep(step)} />
          ) : (
            stepComponents[currentStep]
          )}
        </div>

        <div className="flex justify-between items-center mt-6 print:hidden">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
            )}
            {currentStep === 1 && (
              <Link
                href="/fair"
                className="px-5 py-2.5 border rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                메인으로
              </Link>
            )}
          </div>

          <div className="flex gap-2">
            {!isPreview ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {currentStep === 9 ? '미리보기' : '다음 단계'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => resetAll()}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                처음부터 작성
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
