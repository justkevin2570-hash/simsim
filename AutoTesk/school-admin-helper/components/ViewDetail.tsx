'use client';

import type { Guide, GuideStep } from '@/lib/guideStore';

type Props = {
  guide: Guide;
  step: GuideStep;
  onCloneToBuilder: () => void;
};

/**
 * 우측 상세 매뉴얼 영역
 */
export function ViewDetail({ guide, step, onCloneToBuilder }: Props) {
  const filesHtml =
    step.files.length > 0 ? (
      <div className="space-y-2">
        {step.files.map((f, i) => (
          <a
            key={i}
            href={f.url}
            className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <span className="text-blue-500 text-lg">📄</span>
              <span className="text-xs font-semibold">{f.name}</span>
            </div>
            <span className="text-slate-400 text-sm">⬇</span>
          </a>
        ))}
      </div>
    ) : (
      <p className="text-xs text-slate-400">
        <span className="mr-1">📭</span>
        등록된 표준 서식이 없습니다.
      </p>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-slate-100 pb-4 mb-5">
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
          Detail Manual
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-2">
          {step.stepOrder}. {step.stepName} — 상세 매뉴얼
        </h2>
      </div>

      <div className="space-y-6 flex-1">
        {/* 처리 절차 */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            처리 절차 및 방법 가이드
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            {step.guideText}
          </p>
        </div>

        {/* 관련 서식 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            이 단계와 관련된 표준 서식
          </h4>
          {filesHtml}
        </div>
      </div>
    </div>
  );
}
