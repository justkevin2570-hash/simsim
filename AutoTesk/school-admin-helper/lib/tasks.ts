/**
 * 업무 마스터 데이터
 *
 * 새 업무를 추가하려면 이 배열에 항목을 한 개 추가하면 된다.
 * - 검색(자동완성), 메뉴, 라우팅이 이 데이터를 참조한다.
 * - tags 에는 교사들이 검색할 가능성이 있는 모든 별칭을 넣는다.
 * - group 으로 같은 업무 흐름을 묶는다.
 */

export type Task = {
  /** 고유 식별자. URL·React key 등에 사용 */
  id: string;
  /** 화면에 표시되는 정식 명칭 */
  title: string;
  /** 같은 그룹으로 묶이는 도메인 명 */
  category: string;
  /** 속한 업무 그룹 ID */
  group: string;
  /** 업무 흐름에서의 순서 (1부터 시작) */
  order: number;
  /** 검색용 별칭·관련어 (가장 중요) */
  tags: string[];
  /** 자동완성에 함께 노출되는 한 줄 설명 */
  description: string;
  /** 카테고리 시각화를 위한 이모지 1자 */
  icon: string;
  /** 마법사 페이지로 이동할 Next.js 라우팅 경로 */
  path: string;
};

export type BusinessGroup = {
  /** 그룹 고유 ID */
  id: string;
  /** 그룹 표시명 */
  title: string;
  /** 그룹 아이콘 */
  icon: string;
  /** 그룹 설명 */
  description: string;
  /** 검색용 태그 */
  tags: string[];
  /** 그룹 페이지 경로 */
  path: string;
};

export const businessGroups: BusinessGroup[] = [
  {
    id: "fair",
    title: "교육과정 박람회",
    icon: "🎪",
    description: "박람회 계획부터 품의, 마무리까지 전체 업무 흐름",
    tags: ["박람회", "교육과정", "교육과정박람회", "학점제", "고교학점제"],
    path: "/fair",
  },
];

export const tasks: Task[] = [
  // ─────────────────────────────────────────────
  //  교육과정 박람회
  // ─────────────────────────────────────────────
  {
    id: "fair-plan",
    title: "운영계획서 작성",
    category: "교육과정 박람회",
    group: "fair",
    order: 1,
    tags: [
      "박람회",
      "교육과정",
      "운영계획",
      "계획서",
      "운영계획서",
      "교육과정박람회",
      "학점제",
      "고교학점제",
    ],
    description: "박람회 목적·일정·부스 구성을 단계별로 작성합니다",
    icon: "📋",
    path: "/fair/plan",
  },
  {
    id: "fair-purchase-snack",
    title: "학생 간식 품의",
    category: "교육과정 박람회",
    group: "fair",
    order: 2,
    tags: [
      "간식",
      "다과",
      "음료",
      "품의",
      "품의서",
      "학생간식",
      "박람회간식",
      "먹거리",
    ],
    description: "인원수와 단가로 학생 간식 품의서를 자동 작성합니다",
    icon: "🍪",
    path: "/fair/purchase?type=snack",
  },
  {
    id: "fair-purchase-fee",
    title: "강사 수당 품의",
    category: "교육과정 박람회",
    group: "fair",
    order: 2,
    tags: [
      "강사",
      "수당",
      "강사료",
      "강사수당",
      "품의",
      "품의서",
      "외부강사",
      "특강",
      "강의료",
    ],
    description: "강사 시수·단가 기반 수당 품의서를 작성합니다",
    icon: "💰",
    path: "/fair/purchase?type=fee",
  },
  {
    id: "fair-purchase-goods",
    title: "운영 물품 품의",
    category: "교육과정 박람회",
    group: "fair",
    order: 2,
    tags: [
      "물품",
      "운영물품",
      "문구",
      "문구류",
      "현수막",
      "부스용품",
      "품의",
      "품의서",
      "비품",
      "소모품",
    ],
    description: "부스 운영에 필요한 물품을 일괄 품의합니다",
    icon: "📦",
    path: "/fair/purchase?type=goods",
  },
  {
    id: "fair-survey",
    title: "만족도 조사",
    category: "교육과정 박람회",
    group: "fair",
    order: 3,
    tags: [
      "만족도",
      "만족도조사",
      "설문",
      "설문지",
      "조사",
      "평가",
      "피드백",
      "의견수렴",
    ],
    description: "5점 척도 만족도 조사 문항을 자동 생성합니다",
    icon: "📊",
    path: "/fair/wrapup?type=survey",
  },
  {
    id: "fair-report",
    title: "결과보고서",
    category: "교육과정 박람회",
    group: "fair",
    order: 3,
    tags: [
      "결과",
      "결과보고서",
      "보고서",
      "복명",
      "복명서",
      "마무리",
      "운영결과",
      "실적보고",
    ],
    description: "운영 결과와 만족도 분석을 담은 보고서를 작성합니다",
    icon: "📝",
    path: "/fair/wrapup?type=report",
  },
];

// ─────────────────────────────────────────────
//  헬퍼 함수
// ─────────────────────────────────────────────

/** id 로 단일 업무 조회 */
export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

/** 그룹 ID 로 업무 그룹 조회 */
export function getGroupById(id: string): BusinessGroup | undefined {
  return businessGroups.find((g) => g.id === id);
}

/** 그룹 ID 에 속한 업무 목록 조회 (order 기준 정렬) */
export function getTasksByGroup(groupId: string): Task[] {
  return tasks
    .filter((t) => t.group === groupId)
    .sort((a, b) => a.order - b.order);
}

/** 카테고리별로 묶어서 반환 */
export function getTasksByCategory(): Record<string, Task[]> {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {});
}

/** 등록된 모든 그룹 */
export function getAllGroups(): BusinessGroup[] {
  return businessGroups;
}

/** 등록된 모든 카테고리 명 */
export function getAllCategories(): string[] {
  return Array.from(new Set(tasks.map((t) => t.category)));
}
