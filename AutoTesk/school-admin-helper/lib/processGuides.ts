/**
 * 프로세스 대시보드 — 업무 도메인의 단계별 프로세스 가이드 타입 정의
 *
 * 각 도메인(교육과정 박람회, 현장체험학습 등)은
 * 여러 프로세스 단계(Step)로 구성되며,
 * 각 단계는 상세 설명·체크리스트·참고파일·유틸리티 링크를 포함한다.
 */

/** 참고 파일 (예시파일, 양식 다운로드 등) */
export type ReferenceFile = {
  name: string;
  icon: string; // 이모지
  description: string;
};

/** 연동 유틸리티 (기존 Wizard 링크 등) */
export type StepUtility = {
  label: string;
  href: string;
  icon?: string;
  description?: string;
};

/** 단일 프로세스 단계 */
export type ProcessStep = {
  /** 단계 번호 (1부터 시작) */
  order: number;
  /** 단계 표시명 (예: "계획서 내부결재") */
  title: string;
  /** STEP 라벨 (예: "STEP 01") */
  stepLabel: string;
  /** 짧은 설명 (체크리스트 위에 표시) */
  summary: string;
  /** 상세 설명 (렌더링 가능한 HTML 문자열) */
  contentHtml: string;
  /** 체크리스트 항목 */
  checklist?: string[];
  /** 참고 파일 목록 */
  referenceFiles?: ReferenceFile[];
  /** 연동 유틸리티 */
  utilities?: StepUtility[];
};

/** 업무 도메인의 전체 프로세스 가이드 */
export type ProcessGuide = {
  /** BusinessGroup.id와 일치 */
  domainId: string;
  /** 단계 목록 (order 순 정렬) */
  steps: ProcessStep[];
};

/** 등록된 모든 가이드 맵 (domainId → ProcessGuide) */
const guides = new Map<string, ProcessGuide>();

export function registerGuide(guide: ProcessGuide): void {
  guides.set(guide.domainId, guide);
}

export function getProcessGuide(domainId: string): ProcessGuide | undefined {
  return guides.get(domainId);
}

export function getAllGuides(): ProcessGuide[] {
  return Array.from(guides.values());
}
