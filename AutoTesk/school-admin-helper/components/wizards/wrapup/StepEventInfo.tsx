'use client';

import { useWrapupStore } from '@/lib/store/wrapupStore';

export function StepEventInfo() {
  const { wrapupType, eventName, schoolName, department, date, target, participantCount, update } = useWrapupStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{wrapupType === 'survey' ? '📊' : '📝'}</span>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {wrapupType === 'survey' ? '만족도 조사' : '결과보고서'}
          </h2>
          <p className="text-xs text-gray-500">
            {wrapupType === 'survey'
              ? '5점 척도 만족도 조사 문항을 자동 생성합니다'
              : '운영 결과와 평가를 담은 보고서를 작성합니다'}
          </p>
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
            <label className="text-sm font-semibold text-gray-600 block mb-1">일시</label>
            <input
              type="date"
              value={date}
              onChange={(e) => update('date', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">대상</label>
            <input
              type="text"
              value={target}
              onChange={(e) => update('target', e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
              placeholder="1학년 전체, 2학년 전체"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">참여 인원</label>
            <input
              type="number"
              min={0}
              value={participantCount}
              onChange={(e) => update('participantCount', Number(e.target.value))}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
