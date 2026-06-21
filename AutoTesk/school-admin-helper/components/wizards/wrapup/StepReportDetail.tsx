'use client';

import { useWrapupStore } from '@/lib/store/wrapupStore';

export function StepReportDetail() {
  const { summary, achievements, improvements, attachments, update, addAchievement, updateAchievement, removeAchievement, addImprovement, updateImprovement, removeImprovement } = useWrapupStore();

  const prefixes = ['가', '나', '다', '라', '마', '바'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">결과보고서 상세 입력</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">운영 결과 요약</label>
          <textarea
            value={summary}
            onChange={(e) => update('summary', e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
            placeholder="교육과정 박람회를 성황리에 마무리하였으며, 학생과 교사 모두 높은 만족도를 보였음."
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">주요 성과</label>
          <div className="space-y-2">
            {achievements.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 w-6">{prefixes[i]}.</span>
                <textarea
                  value={item}
                  onChange={(e) => updateAchievement(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
                  placeholder="성과를 입력하세요"
                />
                {achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAchievement(i)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAchievement}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + 항목 추가
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <label className="text-sm font-semibold text-gray-600 block mb-2">향후 개선 사항</label>
          <div className="space-y-2">
            {improvements.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 w-6">{prefixes[i]}.</span>
                <textarea
                  value={item}
                  onChange={(e) => updateImprovement(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
                  placeholder="개선사항을 입력하세요"
                />
                {improvements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImprovement(i)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImprovement}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + 항목 추가
            </button>
          </div>
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
    </div>
  );
}
