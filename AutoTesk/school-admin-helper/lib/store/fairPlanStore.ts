import { create } from 'zustand';
import type { FairPlanData } from '@/lib/types/fairPlan';

const defaultData: Omit<FairPlanData, 'currentStep' | 'skippedSections'> = {
  step1: {
    eventName: '2025학년도 교육과정 탐구 활동의 날 운영 계획',
    schoolName: 'OO고등학교',
    department: '교육과정운영부',
    date: '2025-06-05',
    dayOfWeek: '목',
    targetGrades: ['1학년 전체', '2학년 전체'],
    selectedPrograms: ['교과 부스 체험', '진로 연계 주제 탐구 부스', '고교학점제 이해 교육', '대학 교수 초청 특강'],
    customPrograms: [],
  },
  step2: {
    purposes: [
      '학생의 과목 선택 역량을 강화하고 진로 탐색 기회를 제공한다.',
      '고교학점제의 안정적 도입을 위해 학생과 학부모의 이해도를 높인다.',
      '교과별 특성과 연계한 체험 활동을 통해 전공 이해도를 높인다.',
    ],
    policies: [
      '사전 안전 교육을 실시하여 이동 안전 및 대처법을 철저히 교육한다.',
      '각 부스 지도교사를 교육과정 이수 지도팀으로 위촉한다.',
      '스탬프 랠리를 운영하여 학생의 적극적 참여를 유도한다.',
    ],
    safetyEducation: true,
    studentOperators: true,
    teacherAssignment: true,
    stampRally: true,
    stampCount: 4,
  },
  step3: {
    usePreset: false,
    cells: [
      { period: 1, grade: '1학년', content: '교육과정 설명 영상 시청', location: '교실' },
      { period: 2, grade: '1학년', content: '고교학점제 선택 과목 설계 및 탐구주제 탐색', location: '수업' },
      { period: 3, grade: '1학년', content: '고교학점제 선택 과목 설계 및 탐구주제 탐색', location: '수업' },
      { period: 4, grade: '1학년', content: '정상 수업', location: '교실' },
      { period: 5, grade: '1학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
      { period: 6, grade: '1학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
      { period: 7, grade: '1학년', content: '학과 탐색 활동 결과 보고서 작성', location: '교실' },
      { period: 1, grade: '2학년', content: '교육과정 설명 영상 시청', location: '교실' },
      { period: 2, grade: '2학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
      { period: 3, grade: '2학년', content: '선택과목 상담 및 주제탐구 부스 체험', location: '체육관' },
      { period: 4, grade: '2학년', content: '정상 수업', location: '교실' },
      { period: 5, grade: '2학년', content: '대학교수 초청 학과 탐색 활동', location: '각 교실 이동' },
      { period: 6, grade: '2학년', content: '대학교수 초청 학과 탐색 활동', location: '각 교실 이동' },
      { period: 7, grade: '2학년', content: '학과 탐색 활동 결과 보고서 작성', location: '교실' },
    ],
  },
  step4: {
    booths: [
      { id: 'b1', boothNumber: '1', subjectGroup: '국어', content: '문학·독서 진로 연계 안내', teacher: 'OOO 교사' },
      { id: 'b2', boothNumber: '2', subjectGroup: '영어', content: '글로벌 의사소통 역량 체험', teacher: 'OOO 교사' },
      { id: 'b3', boothNumber: '3', subjectGroup: '수학', content: '수학적 사고력 확장 프로그램', teacher: 'OOO 교사' },
      { id: 'b4', boothNumber: '4', subjectGroup: '사회', content: '통합사회 진로 연계 탐색', teacher: 'OOO 교사' },
      { id: 'b5', boothNumber: '5', subjectGroup: '과학', content: '실험·탐구 기반 전공 소개', teacher: 'OOO 교사' },
      { id: 'b6', boothNumber: '6', subjectGroup: '생활·교양', content: '예술·체육·기술가정 체험', teacher: 'OOO 교사' },
      { id: 'b7', boothNumber: '7', subjectGroup: '진로', content: '진로진학 상담 및 권장학과 안내', teacher: '진로교사' },
    ],
    rules: ['한 부스당 최대 10분 이내 참여', '자유 이동 원칙, 질서 유지', '스탬프 투어 필수 참여'],
  },
  step5: {
    clubs: [
      { id: 'c1', clubName: '애교', activity: '미래 교육 가치관 공유 및 키링 제작', teacher: 'OOO 교사' },
      { id: 'c2', clubName: '시냅스', activity: '생분해성 3D 폴리모프 활용 친환경 소재 체험', teacher: 'OOO 교사' },
      { id: 'c3', clubName: '퓨처랩', activity: '마이크로비트/아두이노 기반 융합기술 체험', teacher: 'OOO 교사' },
      { id: 'c4', clubName: '케미셀', activity: '슬라임 화학 원리 탐구 및 친환경 슬라임 제작', teacher: 'OOO 교사' },
      { id: 'c5', clubName: '글로벌 링크', activity: '중국·일본·베트남 전통문화 및 세계시민 의식 체험', teacher: 'OOO 교사' },
    ],
    briefingDate: '2025-05-20',
    briefingLocation: '본교 대강당',
  },
  step6: {
    grade1Sessions: [
      { id: 's1', session: '1차시', title: '고교학점제란 무엇인가?', content: '고교학점제의 개념과 도입 배경 이해' },
      { id: 's2', session: '2차시', title: '선택 중심 교육과정 알아보기', content: '공통과목과 선택과목의 차이, 이수 구조' },
      { id: 's3', session: '3차시', title: '진로에 따른 과목 선택 전략', content: '희망 진로와 연계된 과목 선택 방법' },
      { id: 's4', session: '4차시', title: '수강신청 시스템 실습', content: '온라인 수강신청 시스템 사용법 안내' },
    ],
    grade2Lectures: [
      { id: 'l1', number: 1, department: '컴퓨터공학', topic: 'AI 시대의 소프트웨어 인재 양성', instructor: '홍길동 교수', university: 'OO대학교' },
      { id: 'l2', number: 2, department: '의예과', topic: '의사의 길: 의예과 진학 가이드', instructor: '김철수 교수', university: 'XX대학교' },
      { id: 'l3', number: 3, department: '경영학', topic: '4차 산업혁명과 경영 혁신', instructor: '박영희 교수', university: 'YY대학교' },
    ],
  },
  step7: {
    rows: [
      { id: 'br1', category: '간식비', item: '학생 간식 (빵, 음료)', unitPrice: 5000, quantity: 300, frequency: 1 },
      { id: 'br2', category: '강사 수당', item: '외부 교수 특강비', unitPrice: 500000, quantity: 3, frequency: 1 },
      { id: 'br3', category: '부스 운영 물품', item: '체험 활동 재료비', unitPrice: 30000, quantity: 7, frequency: 1 },
      { id: 'br4', category: '현수막', item: '행사 안내 현수막 제작', unitPrice: 80000, quantity: 2, frequency: 1 },
      { id: 'br5', category: '스탬프 투어', item: '스탬프 카드 및 상품', unitPrice: 2000, quantity: 300, frequency: 1 },
    ],
  },
  step8: {
    effects: [
      '학생들의 진로 선택에 대한 자신감이 향상되고 과목 선택 역량이 강화된다.',
      '고교학점제에 대한 학생·학부모·교원의 이해도가 높아져 안정적 정착 기반이 마련된다.',
      '교과별 체험 활동을 통해 전공에 대한 이해도가 높아진다.',
    ],
    gymImage: null,
  },
  step9: {
    includeFamilyLetter: true,
    includeRoadmap: true,
    includeReport: true,
    includeChecklist: true,
    applicationSchedule: {
      first: '2025-05-12 ~ 05-16',
      second: '2025-05-19 ~ 05-23',
      final: '2025-05-26 ~ 05-30',
    },
    openCloseThreshold: 30,
  },
};

const initialData: FairPlanData = {
  ...defaultData,
  currentStep: 1,
  skippedSections: [],
};

type FairPlanStore = FairPlanData & {
  updateStep: <K extends keyof Omit<FairPlanData, 'currentStep' | 'skippedSections'>>(
    step: K,
    data: Partial<FairPlanData[K]>
  ) => void;
  setCurrentStep: (step: number) => void;
  resetAll: () => void;
  toggleSection: (sectionId: string) => void;
};

export const useFairPlanStore = create<FairPlanStore>()(
  (set) => ({
    ...initialData,
    currentStep: 1 as number,
    updateStep: (step, data) =>
      set((state) => ({
        [step]: { ...state[step], ...data },
      })),
    setCurrentStep: (step) => set({ currentStep: step }),
    resetAll: () => set({ ...initialData }),
    toggleSection: (sectionId) =>
      set((state) => ({
        skippedSections: state.skippedSections.includes(sectionId)
          ? state.skippedSections.filter((s) => s !== sectionId)
          : [...state.skippedSections, sectionId],
      })),
  })
);
