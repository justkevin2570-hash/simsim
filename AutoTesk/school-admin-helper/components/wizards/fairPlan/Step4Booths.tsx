'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import { subjectGroupOptions, boothRulePresets } from '@/lib/options';

export function Step4Booths() {
  const { step4, updateStep } = useFairPlanStore();

  const addBooth = () => {
    const newBooth = {
      id: `b${Date.now()}`,
      boothNumber: String(step4.booths.length + 1),
      subjectGroup: '국어',
      content: '',
      teacher: '',
    };
    updateStep('step4', { booths: [...step4.booths, newBooth] });
  };

  const removeBooth = (id: string) => {
    updateStep('step4', { booths: step4.booths.filter((b) => b.id !== id) });
  };

  const updateBooth = (id: string, field: string, value: string) => {
    updateStep('step4', {
      booths: step4.booths.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    });
  };

  const toggleRule = (rule: string) => {
    const exists = step4.rules.includes(rule);
    updateStep('step4', {
      rules: exists ? step4.rules.filter((r) => r !== rule) : [...step4.rules, rule],
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">4단계: 교과 부스 운영 세부</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-16">번호</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">교과군</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">상담 내용</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-32">담당 교사</th>
              <th className="border border-gray-200 px-3 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {step4.booths.map((booth) => (
              <tr key={booth.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 text-center">{booth.boothNumber}</td>
                <td className="border border-gray-200 px-3 py-2">
                  <select
                    value={booth.subjectGroup}
                    onChange={(e) => updateBooth(booth.id, 'subjectGroup', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {subjectGroupOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-200 px-3 py-2">
                  <input
                    type="text"
                    value={booth.content}
                    onChange={(e) => updateBooth(booth.id, 'content', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2">
                  <input
                    type="text"
                    value={booth.teacher}
                    onChange={(e) => updateBooth(booth.id, 'teacher', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeBooth(booth.id)}
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
          onClick={addBooth}
          className="mt-3 text-sm text-blue-600 hover:underline font-medium"
        >
          + 부스 추가
        </button>
      </div>

      <div className="border-t pt-4">
        <label className="text-sm font-semibold text-gray-600 block mb-2">부스 운영 유의사항</label>
        <div className="space-y-2">
          {boothRulePresets.map((rule) => (
            <label key={rule} className="flex items-center gap-3 p-3 border rounded-xl text-sm cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={step4.rules.includes(rule)}
                onChange={() => toggleRule(rule)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">{rule}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
