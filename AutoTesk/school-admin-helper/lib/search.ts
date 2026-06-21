/**
 * 검색 및 자동완성 비즈니스 로직
 *
 * Fuse.js를 기반으로 하며, lib/hangul.ts를 활용하여 초성 검색을 통합 보조한다.
 * 업무 그룹(BusinessGroup) 단위로 검색 결과를 반환한다.
 */

import Fuse, { IFuseOptions, FuseResult } from "fuse.js";
import { businessGroups, tasks, BusinessGroup } from "./tasks";
import { getChoseong, isChoseongOnly } from "./hangul";

// Fuse.js가 검색할 확장 데이터 타입 정의
export type IndexedGroup = BusinessGroup & {
  titleChoseong: string;
  tagsChoseong: string;
  /** 그룹에 속한 업무들의 태그를 합친 문자열 */
  allTags: string;
};

// 1. 초기화: 그룹에 속한 업무들의 태그를 합쳐서 인덱싱
const indexedGroups: IndexedGroup[] = businessGroups.map((group) => {
  const groupTasks = tasks.filter((t) => t.group === group.id);
  const allTags = [
    ...group.tags,
    ...groupTasks.flatMap((t) => t.tags),
  ].join(" ");

  return {
    ...group,
    titleChoseong: getChoseong(group.title),
    tagsChoseong: group.tags.map(getChoseong).join(" "),
    allTags,
  };
});

// 2. Fuse.js 옵션 설정
const options: IFuseOptions<IndexedGroup> = {
  keys: [
    { name: "title", weight: 3.0 },
    { name: "tags", weight: 2.0 },
    { name: "allTags", weight: 1.5 },
    { name: "titleChoseong", weight: 1.0 },
    { name: "tagsChoseong", weight: 0.5 },
  ],
  threshold: 0.35,
  includeMatches: true,
  minMatchCharLength: 1,
};

// 인스턴스 생성
const fuse = new Fuse(indexedGroups, options);

/**
 * 전역 검색 함수
 * 입력된 쿼리에 따라 업무 그룹 단위로 검색 결과를 반환한다.
 *
 * @param query 사용자가 검색창에 입력한 문자열
 * @returns Fuse.js 검색 결과 배열 (최대 8개)
 */
export function searchGroups(query: string): FuseResult<IndexedGroup>[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // 사용자가 초성만 입력했는지 확인 (예: "ㄱㅇㄱㅈ")
  if (isChoseongOnly(trimmed)) {
    const normalizedQuery = trimmed.replace(/\s/g, "");
    return fuse.search(normalizedQuery).slice(0, 8);
  }

  return fuse.search(trimmed).slice(0, 8);
}
