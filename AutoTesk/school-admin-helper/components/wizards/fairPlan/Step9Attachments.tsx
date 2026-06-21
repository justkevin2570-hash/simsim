'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';

export function Step9Attachments() {
  const { step9, updateStep } = useFairPlanStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">9단계: 별첨 서식 자동 생성</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">생성할 부록 서식 선택</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border rounded-xl text-sm cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={step9.includeFamilyLetter}
                onChange={(e) => updateStep('step9', { includeFamilyLetter: e.target.checked })}
                className="w-4 h-4"
              />
              <div>
                <span className="text-gray-700 font-medium">별첨 2: 가정통신문 안내장</span>
                <p className="text-xs text-gray-400 mt-0.5">일시, 대상, 수강신청 일정, 개설/폐강 기준 자동 연동</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-xl text-sm cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={step9.includeRoadmap}
                onChange={(e) => updateStep('step9', { includeRoadmap: e.target.checked })}
                className="w-4 h-4"
              />
              <div>
                <span className="text-gray-700 font-medium">별첨 3: 진로 로드맵 양식</span>
                <p className="text-xs text-gray-400 mt-0.5">학생 배포용 빈 표 구성</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-xl text-sm cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={step9.includeReport}
                onChange={(e) => updateStep('step9', { includeReport: e.target.checked })}
                className="w-4 h-4"
              />
              <div>
                <span className="text-gray-700 font-medium">별첨 4: 학과 탐색 활동 보고서</span>
                <p className="text-xs text-gray-400 mt-0.5">2학년 양식 자동 빌드</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-xl text-sm cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={step9.includeChecklist}
                onChange={(e) => updateStep('step9', { includeChecklist: e.target.checked })}
                className="w-4 h-4"
              />
              <div>
                <span className="text-gray-700 font-medium">별첨 5: 선택과목 체크리스트</span>
                <p className="text-xs text-gray-400 mt-0.5">학교 지정과목과 선택과목 리스트 영역 분할</p>
              </div>
            </label>
          </div>
        </div>

        {step9.includeFamilyLetter && (
          <div className="border-t pt-4 space-y-4">
            <h3 className="text-sm font-bold text-blue-700">가정통신문 연동 데이터</h3>

            <div>
              <label className="text-xs text-gray-500 block mb-1">수강신청 1차 일정</label>
              <input
                type="text"
                value={step9.applicationSchedule.first}
                onChange={(e) => updateStep('step9', { applicationSchedule: { ...step9.applicationSchedule, first: e.target.value } })}
                className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                placeholder="예: 2025-05-12 ~ 05-16"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">수강신청 2차 일정</label>
              <input
                type="text"
                value={step9.applicationSchedule.second}
                onChange={(e) => updateStep('step9', { applicationSchedule: { ...step9.applicationSchedule, second: e.target.value } })}
                className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                placeholder="예: 2025-05-19 ~ 05-23"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">최종 확정 일정</label>
              <input
                type="text"
                value={step9.applicationSchedule.final}
                onChange={(e) => updateStep('step9', { applicationSchedule: { ...step9.applicationSchedule, final: e.target.value } })}
                className="w-full px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                placeholder="예: 2025-05-26 ~ 05-30"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">개설/폐강 기준 (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={step9.openCloseThreshold}
                onChange={(e) => updateStep('step9', { openCloseThreshold: Number(e.target.value) })}
                className="w-32 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm text-center"
              />
              <span className="text-xs text-gray-400 ml-2">% 미만 신청 시 폐강</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
