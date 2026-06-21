'use client';

import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useAppStore } from '@/lib/store';

const typeLabels: Record<string, { title: string; desc: string }> = {
  snack: { title: '학생 간식 품의', desc: '인원수와 단가로 품의서 자동 작성' },
  fee: { title: '강사 수당 품의', desc: '강사 시수·단가 기반 수당 품의서 작성' },
  goods: { title: '운영 물품 품의', desc: '부스 운영 물품 일괄 품의' },
};

export function StepEventInfo() {
  const { purchaseType, eventName, schoolName, department, writerName, writerPosition, date, reason, basis, budgetLine, expectedEffect, attachments, update } = usePurchaseStore();
  const { schoolInfo } = useAppStore();
  const labels = typeLabels[purchaseType];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{purchaseType === 'snack' ? '🍪' : purchaseType === 'fee' ? '💰' : '📦'}</span>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{labels.title}</h2>
          <p className="text-xs text-gray-500">{labels.desc}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">행사명</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => update('eventName', e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">학교명</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => update('schoolName', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">담당 부서</label>
            <input
              type="text"
              value={department}
              onChange={(e) => update('department', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">품의일자</label>
            <input
              type="date"
              value={date}
              onChange={(e) => update('date', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">품의자 직위</label>
            <input
              type="text"
              value={writerPosition}
              onChange={(e) => update('writerPosition', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
              placeholder="교사"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">품의자 성명</label>
            <input
              type="text"
              value={writerName}
              onChange={(e) => update('writerName', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
              placeholder="홍길동"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">목적 / 사유</label>
          <textarea
            value={reason}
            onChange={(e) => update('reason', e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">근거 규정</label>
          <input
            type="text"
            value={basis}
            onChange={(e) => update('basis', e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">예산 과목</label>
            <input
              type="text"
              value={budgetLine}
              onChange={(e) => update('budgetLine', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">붙임 문서명</label>
            <input
              type="text"
              value={attachments}
              onChange={(e) => update('attachments', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">기대 효과</label>
          <textarea
            value={expectedEffect}
            onChange={(e) => update('expectedEffect', e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}
