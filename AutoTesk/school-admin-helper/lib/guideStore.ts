/**
 * 전역 가이드 스토어 — Zustand + localStorage persist
 *
 * 모든 업무 가이드(빌트인 + 유저 생성 + 관리자 추가)를 중앙 관리.
 * localStorage에 자동 저장되며 새로고침 후에도 유지된다.
 */
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────

export type GuideFile = {
  name: string;
  url: string;
};

export type GuideStep = {
  stepOrder: number;
  stepName: string;
  guideText: string;
  files: GuideFile[];
};

export type GuideSource = 'builtin' | 'custom' | 'admin-added';

export type Guide = {
  taskId: number;
  taskName: string;
  category: string;
  keywords: string;
  steps: GuideStep[];
  source: GuideSource;
  createdAt: string;
};

// ─────────────────────────────────────────────
// 초기 시드 데이터 (3개)
// ─────────────────────────────────────────────

const SEED_GUIDES: Guide[] = [
  {
    taskId: 1,
    taskName: '교육과정 박람회',
    category: '학생지도/행사',
    keywords: '박람회, 교육과정, 학점제, 고교학점제, 부스',
    source: 'builtin',
    createdAt: '2026-06-01',
    steps: [
      {
        stepOrder: 1,
        stepName: '계획서 내부결재',
        guideText:
          '교육과정 박람회 운영계획서를 작성하여 학교장 결재를 득합니다. 행사 목적, 일시·장소, 대상 학년, 프로그램 구성, 예산 규모, 안전관리 계획이 포함되어야 합니다. 결재 완료 후 품의 단계로 진행할 수 있습니다.',
        files: [{ name: '교육과정 박람회 운영계획서 표준안.hwp', url: '#' }],
      },
      {
        stepOrder: 2,
        stepName: '에듀파인 품의',
        guideText:
          'K-에듀파인 시스템에서 품의서를 작성합니다. 산출내역은 [단가 × 수량 × 횟수] 형식을 준수해야 반려를 피할 수 있습니다. 예산 과목(목)이 정확한지 사전에 확인하고, 수의계약 가능 여부를 행정실과 협의하세요.',
        files: [{ name: '표준 품의서 서식 및 적요 템플릿.xlsx', url: '#' }],
      },
      {
        stepOrder: 3,
        stepName: '계약 및 물품구입',
        guideText:
          '품의 승인 완료 후 행정실에서 계약 절차를 진행합니다. 500만 원 이상은 조달청 나라장터 입찰, 미만은 수의계약이 가능합니다. 교사는 물품 규격·수량·납품일정을 상세히 전달해야 합니다.',
        files: [{ name: '물품 규격서 및 과업지시서 양식.hwp', url: '#' }],
      },
      {
        stepOrder: 4,
        stepName: '행사 실시 및 안전관리',
        guideText:
          '행사 당일 아침 학생 대상 안전교육을 실시하고 증빙 사진을 남깁니다. 비상연락망과 대처 매뉴얼을 준비하고 학부모 안내 문자 발송을 병행합니다. 부스 운영 교사 배치를 최종 확인합니다.',
        files: [],
      },
      {
        stepOrder: 5,
        stepName: '정산 및 결과보고',
        guideText:
          '행사 종료 후 7일 이내 지출결의서를 작성하고 모든 증빙(영수증·계산서·카드전표)을 첨부합니다. 만족도 조사 결과와 운영 성과를 포함한 결과보고서로 내부결재를 득하여 업무를 최종 완료합니다.',
        files: [{ name: '교육과정 박람회 결과보고서 표준안.hwp', url: '#' }],
      },
    ],
  },
  {
    taskId: 2,
    taskName: '현장체험학습',
    category: '학생지도/행사',
    keywords: '소풍, 수학여행, 야외활동, 체험, 답사, 현장학습',
    source: 'builtin',
    createdAt: '2026-06-01',
    steps: [
      {
        stepOrder: 1,
        stepName: '계획서 내부결재',
        guideText:
          '행사 최소 2주 전 장소, 안전 대책, 시수를 포함한 계획서를 기안하고 결재를 받아야 합니다. 예상 경비 산출 내역과 인솔 교사 배정 계획을 함께 포함하세요.',
        files: [{ name: '현장체험학습 계획서 표준안.hwp', url: '#' }],
      },
      {
        stepOrder: 2,
        stepName: '에듀파인 품의',
        guideText:
          '차량 임차, 숙박 등 예산 잔액을 조회한 후 [사업관리 - 품의등록]에서 단가×인원 내역을 기재해 품의합니다. 에듀파인 시스템에서 예산 과목을 정확히 매칭하세요.',
        files: [{ name: '에듀파인 엑셀 품의 양식.xlsx', url: '#' }],
      },
      {
        stepOrder: 3,
        stepName: '계약 및 물품구입',
        guideText:
          '계약 상대방의 자격 요건(종합보험, 사업자 등)을 행정실에 제출하고 원인행위 처리를 마칩니다. 버스 임차의 경우 운송사업 면허 확인이 필수입니다.',
        files: [{ name: '용역 계약 특수조건 양식.hwp', url: '#' }],
      },
      {
        stepOrder: 4,
        stepName: '행사 실시 및 안전관리',
        guideText:
          '실시 전 아침 학생 안전교육 사진을 촬영하여 보관하고 비상 연락 체계를 계속 유지합니다. 인솔 교사별 비상연락망을 배부하고 응급 상황 대비 구급함을 준비합니다.',
        files: [],
      },
      {
        stepOrder: 5,
        stepName: '정산 및 결과보고',
        guideText:
          '증빙 영수증을 지출 결의하고 만족도 결과를 첨부해 결과 보고 내부 결재를 마칩니다. 모든 지출 증빙이 누락 없이 취합되었는지 확인하세요.',
        files: [{ name: '결과 보고서 양식.hwp', url: '#' }],
      },
    ],
  },
  {
    taskId: 3,
    taskName: '방과후학교 외부강사 채용',
    category: '교무/인사',
    keywords: '강사, 방과후, 수당, 채용, 외부강사, 강사계약, 방과후학교',
    source: 'builtin',
    createdAt: '2026-06-01',
    steps: [
      {
        stepOrder: 1,
        stepName: '운영 계획 수립',
        guideText:
          '학운위 심의 통과 결과를 근거로 당해연도 방과후학교 전체 연간 운영계획을 기안해 둡니다. 운영 시간, 수강료, 강사 자격 기준을 명시하세요.',
        files: [{ name: '방과후 연간 운영계획(초등).hwp', url: '#' }],
      },
      {
        stepOrder: 2,
        stepName: '모집 공고 및 접수',
        guideText:
          '계획에 따라 채용 인원, 분야, 자격 요건 등을 명시해 교육지원청 및 학교 홈페이지에 공고합니다. 접수 기간은 최소 7일 이상 확보하는 것이 일반적입니다.',
        files: [{ name: '강사 공고문 한글 양식.hwp', url: '#' }],
      },
      {
        stepOrder: 3,
        stepName: '서류 및 면접 심사',
        guideText:
          '1차 서류를 통과한 자들을 대상으로 수업 실연 및 면접 정성 평가 심사위원 점수를 합산합니다. 평가 기준표를 사전에 준비하여 공정성을 확보하세요.',
        files: [{ name: '심사평가 기준표 및 채점표.xlsx', url: '#' }],
      },
      {
        stepOrder: 4,
        stepName: '신원조회 및 계약체결',
        guideText:
          '최종 합격자 결재 직후 성범죄/아동학대 전력 조회를 마친 뒤 정식 근로 또는 표준 계약을 체결합니다. 계약서에는 강사료, 계약 기간, 의무 사항을 명시하세요.',
        files: [{ name: '방과후 강사 표준 계약서.hwp', url: '#' }],
      },
      {
        stepOrder: 5,
        stepName: '수당 지급 품의',
        guideText:
          '매월 강의가 종결되면 시간별 일지를 증빙으로 첨부하여 수당을 품의 및 지출결의합니다. 출강 확인서와 강의 계획서를 함께 제출하세요.',
        files: [],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// 스토어
// ─────────────────────────────────────────────

type GuideStore = {
  guides: Guide[];
  activeTaskId: number | null;
  setActiveTaskId: (id: number | null) => void;
  addGuide: (guide: Guide) => void;
  updateGuide: (taskId: number, updates: Partial<Guide>) => void;
  removeGuide: (taskId: number) => void;
  getNextId: () => number;
  searchGuides: (query: string) => Guide[];
  addSubmittedGuide: (data: {
    taskName: string;
    category: string;
    keywords: string;
    steps: { stepName: string; guideText: string; files?: GuideFile[] }[];
  }) => number;
  // builder <-> admin 연동
  builderPreset: Guide | null;
  setBuilderPreset: (guide: Guide | null) => void;
  adminPendingJson: string | null;
  setAdminPendingJson: (json: string | null) => void;
};

export const useGuideStore = create<GuideStore>()(
  persist(
    (set, get) => ({
      guides: SEED_GUIDES,
      activeTaskId: null,

      setActiveTaskId: (id) => set({ activeTaskId: id }),

      addGuide: (guide) => set((s) => ({ guides: [...s.guides, guide] })),

      updateGuide: (taskId, updates) =>
        set((s) => ({
          guides: s.guides.map((g) =>
            g.taskId === taskId ? { ...g, ...updates } : g,
          ),
        })),

      removeGuide: (taskId) =>
        set((s) => ({
          guides: s.guides.filter((g) => g.taskId !== taskId),
        })),

      getNextId: () => {
        const { guides } = get();
        return guides.length > 0
          ? Math.max(...guides.map((g) => g.taskId)) + 1
          : 1;
      },

      searchGuides: (query) => {
        const { guides } = get();
        const q = query.toLowerCase().trim();
        if (!q) return guides;
        return guides.filter(
          (g) =>
            g.taskName.toLowerCase().includes(q) ||
            g.keywords.toLowerCase().includes(q) ||
            g.category.toLowerCase().includes(q),
        );
      },

      addSubmittedGuide: (data) => {
        const { guides, getNextId } = get();
        const nextId = getNextId();
        const newGuide: Guide = {
          taskId: nextId,
          taskName: data.taskName,
          category: data.category,
          keywords: data.keywords,
          source: 'admin-added',
          createdAt: new Date().toISOString().split('T')[0],
          steps: data.steps.map((s, i) => ({
            stepOrder: i + 1,
            stepName: s.stepName,
            guideText: s.guideText,
            files: s.files || [],
          })),
        };
        set({ guides: [...guides, newGuide] });
        return nextId;
      },
      builderPreset: null,
      setBuilderPreset: (guide) => set({ builderPreset: guide }),
      adminPendingJson: null,
      setAdminPendingJson: (json) => set({ adminPendingJson: json }),
    }),
    {
      name: 'autotesk_guides',
      partialize: (state) => ({ guides: state.guides }),
      version: 1,
      migrate: (persisted) => {
        // version 0→1: guides만 유지, activeTaskId 등 제거
        const old = persisted as { guides?: unknown };
        return { guides: old?.guides ?? [] };
      },
    },
  ),
);
