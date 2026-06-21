'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';

export function Step5Clubs() {
  const { step5, updateStep } = useFairPlanStore();

  const addClub = () => {
    const newClub = {
      id: `c${Date.now()}`,
      clubName: '',
      activity: '',
      teacher: '',
    };
    updateStep('step5', { clubs: [...step5.clubs, newClub] });
  };

  const removeClub = (id: string) => {
    updateStep('step5', { clubs: step5.clubs.filter((c) => c.id !== id) });
  };

  const updateClub = (id: string, field: string, value: string) => {
    updateStep('step5', {
      clubs: step5.clubs.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">5단계: 진로 연계 동아리 부스 & 설명회</h2>

      <div>
        <label className="text-sm font-semibold text-gray-600 block mb-2">동아리 주도 주제 탐구 부스</label>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-32">동아리명</th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">부스 탐구 내용</th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-32">담당 교사</th>
                <th className="border border-gray-200 px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {step5.clubs.map((club) => (
                <tr key={club.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={club.clubName}
                      onChange={(e) => updateClub(club.id, 'clubName', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="동아리명"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={club.activity}
                      onChange={(e) => updateClub(club.id, 'activity', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="탐구 활동 내용"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={club.teacher}
                      onChange={(e) => updateClub(club.id, 'teacher', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="담당 교사"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeClub(club.id)}
                      className="text-gray-400 hover:text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addClub}
            className="mt-3 text-sm text-blue-600 hover:underline font-medium"
          >
            + 동아리 추가
          </button>
        </div>
      </div>

      <div className="border-t pt-4 space-y-4">
        <label className="text-sm font-semibold text-gray-600 block">교육과정 사전 설명회</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">일시</label>
            <input
              type="date"
              value={step5.briefingDate}
              onChange={(e) => updateStep('step5', { briefingDate: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">장소</label>
            <input
              type="text"
              value={step5.briefingLocation}
              onChange={(e) => updateStep('step5', { briefingLocation: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
              placeholder="예: 본교 대강당"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
