'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { StepEventInfo } from '@/components/wizards/purchase/StepEventInfo';
import { StepItems } from '@/components/wizards/purchase/StepItems';
import { PurchasePreview } from '@/components/wizards/purchase/PurchasePreview';

const TOTAL_STEPS = 3; // 1:정보입력, 2:내역입력, 3:미리보기

function PurchaseWizardContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as string;
  const { purchaseType, currentStep, setCurrentStep, initType, resetAll } = usePurchaseStore();

  // URL type 파라미터로 초기화
  useEffect(() => {
    if (type && ['snack', 'fee', 'goods'].includes(type)) {
      if (purchaseType !== type) {
        initType(type as 'snack' | 'fee' | 'goods');
      }
    }
  }, [type]);

  if (!type || !['snack', 'fee', 'goods'].includes(type)) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/fair" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              ← 교육과정 박람회
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">품의서 유형 선택</h1>
            <p className="text-sm text-gray-500 mt-1">작성할 품의서 유형을 선택해주세요.</p>
          </div>
          <div className="grid gap-4">
            {[
              { type: 'snack', title: '학생 간식 품의', icon: '🍪', desc: '인원수와 단가로 학생 간식 품의서를 자동 작성합니다' },
              { type: 'fee', title: '강사 수당 품의', icon: '💰', desc: '강사 시수·단가 기반 수당 품의서를 작성합니다' },
              { type: 'goods', title: '운영 물품 품의', icon: '📦', desc: '부스 운영에 필요한 물품을 일괄 품의합니다' },
            ].map((item) => (
              <Link
                key={item.type}
                href={`/fair/purchase?type=${item.type}`}
                className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
              >
                <span className="text-3xl select-none">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</div>
                  <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors mt-1 text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const isPreview = currentStep === TOTAL_STEPS;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/fair/purchase" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            ← 품의서 유형 선택
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {purchaseType === 'snack' ? '🍪' : purchaseType === 'fee' ? '💰' : '📦'} 품의서 마법사
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {currentStep} / {TOTAL_STEPS} 단계
          </p>
        </div>

        {/* 단계 표시기 */}
        <div className="flex gap-2 mb-6 print:hidden">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step < currentStep ? 'bg-blue-600 text-white' :
                step === currentStep ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-600' :
                'bg-gray-100 text-gray-400'
              }`}>
                {step < currentStep ? '✓' : step}
              </div>
              <span className={`text-xs font-medium ${
                step <= currentStep ? 'text-blue-700' : 'text-gray-400'
              }`}>
                {step === 1 ? '정보 입력' : '내역 입력'}
              </span>
              {step < 2 && <div className={`w-8 h-0.5 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 print:border-0 print:shadow-none print:p-0">
          {isPreview ? (
            <PurchasePreview onEdit={(step) => setCurrentStep(step)} />
          ) : currentStep === 1 ? (
            <StepEventInfo />
          ) : (
            <StepItems />
          )}
        </div>

        <div className="flex justify-between items-center mt-6 print:hidden">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
            )}
            {currentStep === 1 && (
              <Link
                href="/fair/purchase"
                className="px-5 py-2.5 border rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                유형 선택
              </Link>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (isPreview) {
                  resetAll();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isPreview
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isPreview ? '처음부터 작성' : currentStep === TOTAL_STEPS - 1 ? '미리보기' : '다음 단계'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </main>
    }>
      <PurchaseWizardContent />
    </Suspense>
  );
}
