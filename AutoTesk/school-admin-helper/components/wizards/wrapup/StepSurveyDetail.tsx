'use client';

import { useWrapupStore } from '@/lib/store/wrapupStore';

export function StepSurveyDetail() {
  const { surveyAreas, updateSurveyQuestion } = useWrapupStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">만족도 조사 문항 편집</h2>
      <p className="text-xs text-gray-400">
        각 영역별 문항을 수정하거나 추가할 수 있습니다. 모든 문항은 5점 척도(①~⑤)로 자동 구성됩니다.
      </p>

      <div className="space-y-6">
        {surveyAreas.map((area) => (
          <div key={area.id} className="border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">{area.label}</h3>
            <div className="space-y-3">
              {area.questions.map((q, qi) => (
                <div key={qi}>
                  <label className="text-xs text-gray-500 block mb-1">
                    문항 {qi + 1}
                  </label>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => updateSurveyQuestion(area.id, qi, e.target.value)}
                    className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
        <p className="text-xs text-gray-500 font-medium">
          💡 각 문항에 대해 응답자는 ① 매우 그렇다 ~ ⑤ 매우 아니다 중 선택하게 됩니다.
          설문지는 복사하여 구글 폼/리로스쿨 등에 붙여넣어 활용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
