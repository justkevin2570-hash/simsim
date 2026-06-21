'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import { gradeOptions, dayOfWeekMap } from '@/lib/options';

export function Step1BasicInfo() {
  const { step1, updateStep } = useFairPlanStore();

  const handleDateChange = (date: string) => {
    const d = new Date(date);
    const day = dayOfWeekMap[String(d.getDay())] || '';
    updateStep('step1', { date, dayOfWeek: day });
  };

  const toggleGrade = (grade: string) => {
    const exists = step1.targetGrades.includes(grade);
    updateStep('step1', {
      targetGrades: exists
        ? step1.targetGrades.filter((g) => g !== grade)
        : [...step1.targetGrades, grade],
    });
  };

  const toggleProgram = (program: string) => {
    const exists = step1.selectedPrograms.includes(program);
    updateStep('step1', {
      selectedPrograms: exists
        ? step1.selectedPrograms.filter((p) => p !== program)
        : [...step1.selectedPrograms, program],
    });
  };

  const programs = [
    '교과 부스 체험',
    '진로 연계 주제 탐구 부스',
    '고교학점제 이해 교육',
    '외부 강사 특강',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">1단계: 기본 개요 설정</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">행사 공식 명칭</label>
          <input
            type="text"
            value={step1.eventName}
            onChange={(e) => updateStep('step1', { eventName: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">학교명</label>
            <input
              type="text"
              value={step1.schoolName}
              onChange={(e) => updateStep('step1', { schoolName: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">담당 부서</label>
            <input
              type="text"
              value={step1.department}
              onChange={(e) => updateStep('step1', { department: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">일시</label>
            <input
              type="date"
              value={step1.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">요일</label>
            <div className="px-4 py-2.5 border rounded-xl bg-gray-50 text-sm text-gray-700">
              {step1.dayOfWeek}요일
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">참여 대상 (학년별 체크)</label>
          <div className="flex flex-wrap gap-2">
            {gradeOptions.map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => toggleGrade(grade)}
                className={`px-4 py-2 border rounded-xl text-sm font-medium transition-all ${
                  step1.targetGrades.includes(grade)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {grade} 전체
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">주요 프로그램 구성</label>
          <div className="space-y-2">
            {programs.map((p) => (
              <label key={p} className="flex items-center gap-3 p-3 border rounded-xl text-sm cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={step1.selectedPrograms.includes(p)}
                  onChange={() => toggleProgram(p)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{p}</span>
              </label>
            ))}
          </div>

          <div className="mt-3 space-y-2">
            {step1.customPrograms.map((cp, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cp}
                  onChange={(e) => {
                    const updated = [...step1.customPrograms];
                    updated[i] = e.target.value;
                    updateStep('step1', { customPrograms: updated });
                  }}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="직접 프로그램명 입력..."
                />
                <button
                  type="button"
                  onClick={() => {
                    updateStep('step1', { customPrograms: step1.customPrograms.filter((_, idx) => idx !== i) });
                  }}
                  className="text-gray-400 hover:text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                updateStep('step1', { customPrograms: [...step1.customPrograms, ''] });
              }}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + 항목 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
