'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import type { TimetableCell } from '@/lib/types/fairPlan';

const grades = ['1학년', '2학년', '3학년'];

const presetGrade1: TimetableCell[] = [
  { period: 1, grade: '1학년', content: '교육과정 설명 영상 시청', location: '교실' },
  { period: 2, grade: '1학년', content: '고교학점제 선택 과목 설계 및 탐구주제 탐색', location: '수업' },
  { period: 3, grade: '1학년', content: '고교학점제 선택 과목 설계 및 탐구주제 탐색', location: '수업' },
  { period: 4, grade: '1학년', content: '정상 수업', location: '교실' },
  { period: 5, grade: '1학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
  { period: 6, grade: '1학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
  { period: 7, grade: '1학년', content: '학과 탐색 활동 결과 보고서 작성', location: '교실' },
];

const presetGrade2: TimetableCell[] = [
  { period: 1, grade: '2학년', content: '교육과정 설명 영상 시청', location: '교실' },
  { period: 2, grade: '2학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
  { period: 3, grade: '2학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
  { period: 4, grade: '2학년', content: '정상 수업', location: '교실' },
  { period: 5, grade: '2학년', content: '대학교수 초청 학과 탐색 활동', location: '각 교실 이동' },
  { period: 6, grade: '2학년', content: '대학교수 초청 학과 탐색 활동', location: '각 교실 이동' },
  { period: 7, grade: '2학년', content: '학과 탐색 활동 결과 보고서 작성', location: '교실' },
];

export function Step3Timetable() {
  const { step3, updateStep } = useFairPlanStore();

  const applyPreset = () => {
    updateStep('step3', { cells: [...presetGrade1, ...presetGrade2], usePreset: true });
  };

  const updateCell = (index: number, field: keyof TimetableCell, value: string) => {
    const updated = [...step3.cells];
    updated[index] = { ...updated[index], [field]: value };
    updateStep('step3', { cells: updated });
  };

  const addRow = (grade: string) => {
    const maxPeriod = step3.cells.filter((c) => c.grade === grade).length + 1;
    const newRow: TimetableCell = {
      period: maxPeriod,
      grade,
      content: '',
      location: '',
    };
    updateStep('step3', { cells: [...step3.cells, newRow] });
  };

  const removeRow = (index: number) => {
    updateStep('step3', { cells: step3.cells.filter((_, i) => i !== index) });
  };

  const renderTable = (grade: string, title: string) => {
    const gradeCells = step3.cells
      .map((cell, idx) => ({ ...cell, originalIndex: idx }))
      .filter((c) => c.grade === grade)
      .sort((a, b) => a.period - b.period);

    return (
      <div key={grade} className="mb-6">
        <h3 className="text-sm font-bold text-gray-700 mb-2">{title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-16">교시</th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">내용</th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">장소</th>
                <th className="border border-gray-200 px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {gradeCells.map((cell) => (
                <tr key={cell.originalIndex} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 text-center font-medium">{cell.period}</td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={cell.content}
                      onChange={(e) => updateCell(cell.originalIndex, 'content', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="수업 내용"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={cell.location}
                      onChange={(e) => updateCell(cell.originalIndex, 'location', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="장소"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(cell.originalIndex)}
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
            onClick={() => addRow(grade)}
            className="mt-2 text-sm text-blue-600 hover:underline font-medium"
          >
            + 행 추가
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">3단계: 학급별/시간별 세부 일정</h2>
        <button
          type="button"
          onClick={applyPreset}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          원클릭 프리셋 적용
        </button>
      </div>

      <p className="text-xs text-gray-400">
        상단 버튼을 클릭하면 1학년(오전 이론/오후 부스), 2학년(오전 부스/오후 특강) 프리셋이 자동 입력됩니다.
      </p>

      {renderTable('1학년', '1학년 시간표')}
      {renderTable('2학년', '2학년 시간표')}
      {renderTable('3학년', '3학년 시간표')}
    </div>
  );
}
