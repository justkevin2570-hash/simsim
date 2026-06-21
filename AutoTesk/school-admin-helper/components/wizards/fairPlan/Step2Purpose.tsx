'use client';

import { useEffect, useRef } from 'react';
import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import { purposeTemplatesByProgram, policyTemplatesByProgram, expectationTemplatesByProgram } from '@/lib/options';

export function Step2Purpose() {
  const { step1, step2, step8, updateStep } = useFairPlanStore();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const allPrograms = [...step1.selectedPrograms, ...step1.customPrograms.filter((p) => p.trim() !== '')];

    const autoPurposes = new Set<string>();
    allPrograms.forEach((prog) => {
      const templates = purposeTemplatesByProgram[prog];
      if (templates) {
        templates.forEach((t) => autoPurposes.add(t));
      }
    });

    const autoPolicies = new Set<string>();
    allPrograms.forEach((prog) => {
      const templates = policyTemplatesByProgram[prog];
      if (templates) {
        templates.forEach((t) => autoPolicies.add(t));
      }
    });

    if (autoPurposes.size > 0) {
      updateStep('step2', { purposes: Array.from(autoPurposes).slice(0, 3) });
    }

    if (autoPolicies.size > 0) {
      updateStep('step2', { policies: Array.from(autoPolicies).slice(0, 3) });
    }

    const autoEffects = new Set<string>();
    allPrograms.forEach((prog) => {
      const templates = expectationTemplatesByProgram[prog];
      if (templates) {
        templates.forEach((t) => autoEffects.add(t));
      }
    });

    if (autoEffects.size > 0) {
      updateStep('step8', { effects: Array.from(autoEffects).slice(0, 3) });
    }
  }, []);

  const updatePurpose = (index: number, value: string) => {
    const updated = [...step2.purposes];
    updated[index] = value;
    updateStep('step2', { purposes: updated });
  };

  const addPurpose = () => {
    updateStep('step2', { purposes: [...step2.purposes, ''] });
  };

  const removePurpose = (index: number) => {
    updateStep('step2', { purposes: step2.purposes.filter((_, i) => i !== index) });
  };

  const updatePolicy = (index: number, value: string) => {
    const updated = [...step2.policies];
    updated[index] = value;
    updateStep('step2', { policies: updated });
  };

  const addPolicy = () => {
    updateStep('step2', { policies: [...step2.policies, ''] });
  };

  const removePolicy = (index: number) => {
    updateStep('step2', { policies: step2.policies.filter((_, i) => i !== index) });
  };

  const prefixes = ['가', '나', '다', '라', '마', '바', '사', '아'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">2단계: 목적 및 운영 방침 정의</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">운영 목적</label>
          <div className="space-y-2">
            {step2.purposes.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 w-6">{prefixes[i]}.</span>
                <textarea
                  value={p}
                  onChange={(e) => updatePurpose(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
                />
                {step2.purposes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePurpose(i)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPurpose}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + 항목 추가
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <label className="text-sm font-semibold text-gray-600 block mb-2">운영 방침</label>
          <div className="space-y-2">
            {step2.policies.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 w-6">{prefixes[i]}.</span>
                <textarea
                  value={p}
                  onChange={(e) => updatePolicy(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
                />
                {step2.policies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePolicy(i)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPolicy}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + 항목 추가
            </button>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <label className="text-sm font-semibold text-gray-600 block">운영 옵션</label>

          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">사전 안전 교육 실시</span>
            <input
              type="checkbox"
              checked={step2.safetyEducation}
              onChange={(e) => updateStep('step2', { safetyEducation: e.target.checked })}
              className="w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">학생 운영진 (동아리) 활용</span>
            <input
              type="checkbox"
              checked={step2.studentOperators}
              onChange={(e) => updateStep('step2', { studentOperators: e.target.checked })}
              className="w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">지도교사 위촉</span>
            <input
              type="checkbox"
              checked={step2.teacherAssignment}
              onChange={(e) => updateStep('step2', { teacherAssignment: e.target.checked })}
              className="w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">스탬프 랠리 운영</span>
            <input
              type="checkbox"
              checked={step2.stampRally}
              onChange={(e) => updateStep('step2', { stampRally: e.target.checked })}
              className="w-4 h-4"
            />
          </label>

          {step2.stampRally && (
            <div className="flex items-center gap-3 pl-4">
              <label className="text-sm text-gray-600">확인 도장 개수</label>
              <input
                type="number"
                min={1}
                max={20}
                value={step2.stampCount}
                onChange={(e) => updateStep('step2', { stampCount: Number(e.target.value) })}
                className="w-20 px-3 py-2 border rounded-xl focus:border-blue-500 focus:outline-none text-sm text-center"
              />
              <span className="text-sm text-gray-500">개 이상 시 확인</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
