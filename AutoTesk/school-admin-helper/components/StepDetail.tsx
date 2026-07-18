'use client';

import Link from 'next/link';
import type { ProcessStep } from '@/lib/processGuides';

type Props = {
  step: ProcessStep;
};

/**
 * 우측 상세 가이드 영역
 * 선택한 단계의 상세 설명·체크리스트·참고파일·유틸리티 버튼 표시
 */
export function StepDetail({ step }: Props) {
  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="border-b border-gray-100 pb-4 mb-5">
        <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
          Detail View
        </span>
        <h2 id="detail-title" className="text-2xl font-black text-gray-900 mt-2">
          {step.order}. {step.title} — 세부 가이드
        </h2>
        {step.summary && (
          <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-3xl">
            {step.summary}
          </p>
        )}
      </div>

      {/* HTML 콘텐츠 (설명 박스, 체크리스트 등) */}
      <div
        id="detail-content"
        className="space-y-6 flex-1"
        dangerouslySetInnerHTML={{ __html: step.contentHtml }}
      />

      {/* 유틸리티 버튼 (기존 마법사 링크) */}
      {step.utilities && step.utilities.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">
            <span className="mr-2">🔧</span>연동 유틸리티
          </h3>
          <div className="flex flex-wrap gap-3">
            {step.utilities.map((util) => (
              <Link
                key={util.label}
                href={util.href}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-colors shadow-sm"
              >
                {util.icon && <span>{util.icon}</span>}
                {util.label}
              </Link>
            ))}
          </div>
          {step.utilities.some((u) => u.description) && (
            <div className="mt-2 space-y-1">
              {step.utilities.map((util) =>
                util.description ? (
                  <p key={util.label} className="text-xs text-gray-400">
                    <span className="text-gray-300">•</span> {util.description}
                  </p>
                ) : null,
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
