import { create } from 'zustand';
import type { WrapupData, WrapupType, SurveyArea } from '@/lib/types/wrapup';
import { DEFAULT_SURVEY_AREAS } from '@/lib/types/wrapup';

const today = new Date().toISOString().split('T')[0];

const defaultData = {
  wrapupType: 'survey' as WrapupType,
  eventName: '2025학년도 교육과정 탐구 활동의 날',
  schoolName: 'OO고등학교',
  department: '교육과정운영부',
  date: today,
  target: '1학년 전체, 2학년 전체',
  participantCount: 300,
  surveyAreas: DEFAULT_SURVEY_AREAS.map((area) => ({
    ...area,
    questions: [...area.questions],
  })),
  summary: '',
  achievements: ['', ''],
  improvements: ['', ''],
  attachments: '만족도 조사 결과 통계',
  currentStep: 1,
};

type WrapupStore = WrapupData & {
  initType: (type: WrapupType) => void;
  update: (field: string, value: unknown) => void;
  updateSurveyQuestion: (areaId: string, index: number, value: string) => void;
  addAchievement: () => void;
  updateAchievement: (index: number, value: string) => void;
  removeAchievement: (index: number) => void;
  addImprovement: () => void;
  updateImprovement: (index: number, value: string) => void;
  removeImprovement: (index: number) => void;
  setCurrentStep: (step: number) => void;
  resetAll: () => void;
};

export const useWrapupStore = create<WrapupStore>()((set) => ({
  ...defaultData,
  initType: (type) =>
    set({ ...defaultData, wrapupType: type }),
  update: (field, value) => set({ [field]: value }),
  updateSurveyQuestion: (areaId, index, value) =>
    set((state) => ({
      surveyAreas: state.surveyAreas.map((area) =>
        area.id === areaId
          ? {
              ...area,
              questions: area.questions.map((q, i) =>
                i === index ? value : q
              ),
            }
          : area
      ),
    })),
  addAchievement: () =>
    set((state) => ({
      achievements: [...state.achievements, ''],
    })),
  updateAchievement: (index, value) =>
    set((state) => ({
      achievements: state.achievements.map((a, i) =>
        i === index ? value : a
      ),
    })),
  removeAchievement: (index) =>
    set((state) => ({
      achievements: state.achievements.filter((_, i) => i !== index),
    })),
  addImprovement: () =>
    set((state) => ({
      improvements: [...state.improvements, ''],
    })),
  updateImprovement: (index, value) =>
    set((state) => ({
      improvements: state.improvements.map((a, i) =>
        i === index ? value : a
      ),
    })),
  removeImprovement: (index) =>
    set((state) => ({
      improvements: state.improvements.filter((_, i) => i !== index),
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetAll: () => set({ ...defaultData, currentStep: 1 }),
}));
