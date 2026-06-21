/**
 * 한글 유틸리티
 *
 * 검색 자동완성에서 초성 검색을 지원하기 위한 함수들.
 * 예: "ㄱㅇㄱㅈ" 입력 → "교육과정" 매칭
 */

// 한글 완성형 글자의 시작점 (가)
const HANGUL_BASE = 0xac00;
// 한글 완성형 글자의 끝점 (힣)
const HANGUL_END = 0xd7a3;
// 한 초성당 차지하는 코드 수 (중성 21자 × 종성 28자)
const CHO_DIVISOR = 588;

/** 초성 19자 (유니코드 정의 순서) */
const CHOSEONG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

/**
 * 단일 문자가 한글 완성형(가~힣) 범위에 속하는지 확인
 */
function isHangulSyllable(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= HANGUL_BASE && code <= HANGUL_END;
}

/**
 * 문자열에서 한글 초성만 추출한다.
 * 한글이 아닌 문자(영어·숫자·공백·기호)는 원본 그대로 유지.
 *
 * @example
 *   getChoseong("교육과정")        // "ㄱㅇㄱㅈ"
 *   getChoseong("박람회 운영계획")  // "ㅂㄹㅎ ㅇㅇㄱㅎ"
 *   getChoseong("Hello 박람회")    // "Hello ㅂㄹㅎ"
 *   getChoseong("")                // ""
 */
export function getChoseong(str: string): string {
  if (!str) return "";

  let result = "";
  for (const ch of str) {
    if (isHangulSyllable(ch)) {
      const index = Math.floor((ch.charCodeAt(0) - HANGUL_BASE) / CHO_DIVISOR);
      result += CHOSEONG[index];
    } else {
      // 한글이 아니면 원본 유지 (영어·숫자·공백·기호 모두)
      result += ch;
    }
  }
  return result;
}

/**
 * 문자열이 한글 초성(자음)으로만 구성되어 있는지 판별.
 * 공백은 허용하지만, 한글 완성형이나 다른 문자가 섞이면 false.
 *
 * 검색 시 "ㄱㅇㄱㅈ" 같은 초성 검색어를 감지하기 위해 사용.
 *
 * @example
 *   isChoseongOnly("ㄱㅇㄱㅈ")   // true
 *   isChoseongOnly("ㅂㄹㅎ")     // true
 *   isChoseongOnly("ㄱ ㅇ")      // true (공백 허용)
 *   isChoseongOnly("박람회")     // false (완성형 포함)
 *   isChoseongOnly("ㄱabc")      // false (영어 포함)
 *   isChoseongOnly("")           // false (빈 문자열)
 */
export function isChoseongOnly(str: string): boolean {
  if (!str) return false;
  // ㄱ-ㅎ(0x3131~0x314E) 또는 공백만 허용
  return /^[\u3131-\u314e\s]+$/.test(str);
}

/**
 * 검색어가 대상 문자열의 초성과 일치하는지 (부분 일치)
 * Fuse.js가 처리하지 못하는 초성 케이스를 보조하기 위한 직접 매칭 함수.
 *
 * @example
 *   matchesChoseong("ㄱㅇ", "교육과정")     // true ("교육"의 초성)
 *   matchesChoseong("ㅂㄹㅎ", "박람회")     // true
 *   matchesChoseong("ㄱㅁ", "교육과정")     // false
 */
export function matchesChoseong(query: string, target: string): boolean {
  if (!isChoseongOnly(query)) return false;
  const targetChoseong = getChoseong(target);
  // 공백 제거 후 비교 (사용자가 공백 안 칠 수 있음)
  const normalizedQuery = query.replace(/\s/g, "");
  const normalizedTarget = targetChoseong.replace(/\s/g, "");
  return normalizedTarget.includes(normalizedQuery);
}
