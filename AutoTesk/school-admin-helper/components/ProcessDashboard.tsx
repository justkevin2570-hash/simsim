'use client';

import { useState } from 'react';
import { getProcessGuide, type ProcessGuide } from '@/lib/processGuides';
import { StepNav } from '@/components/StepNav';
import { StepDetail } from '@/components/StepDetail';

// fair.ts를 평가하여 가이드 등록
import '@/lib/processGuides/fair';

type Props = {
  domainId: string;
};

/**
 * 프로세스 대시보드 메인 레이아웃
 * 좌측(StepNav) + 우측(StepDetail) 투컬럼
 */
export function ProcessDashboard({ domainId }: Props) {
  const guide: ProcessGuide | undefined = getProcessGuide(domainId);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (!guide) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>등록된 업무 가이드가 없습니다. (domainId: {domainId})</p>
      </div>
    );
  }

  const currentStepData = guide.steps.find((s) => s.order === activeStep);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* 좌측: 프로세스 단계 네비게이션 (4col) */}
      <section className="md:col-span-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-start">
        <StepNav
          steps={guide.steps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />
      </section>

      {/* 우측: 상세 가이드 콘텐츠 (8col) */}
      <section className="md:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
        {currentStepData ? (
          <StepDetail step={currentStepData} />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>단계를 선택해주세요.</p>
          </div>
        )}
      </section>
    </div>
  );
}
