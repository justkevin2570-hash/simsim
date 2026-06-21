export type PurchaseType = 'snack' | 'fee' | 'goods';

export type PurchaseItem = {
  id: string;
  name: string;
  spec: string;   // 규격/설명
  unitPrice: number;
  quantity: number;
};

/** 간식 품의 */
export type SnackExtra = {
  targetCount: number;    // 대상 인원
};

/** 강사 수당 품의 */
export type FeeExtra = {
  instructorName: string;
  instructorAffiliation: string;
  lectureName: string;
  hours: number;
  hourlyRate: number;
};

/** 운영 물품 품의 */
export type GoodsExtra = {
  // items 에서 처리
};

export type PurchaseData = {
  purchaseType: PurchaseType;
  eventName: string;
  schoolName: string;
  department: string;
  writerName: string;
  writerPosition: string;
  date: string;
  reason: string;           // 목적/사유
  basis: string;            // 근거 규정
  items: PurchaseItem[];
  budgetLine: string;       // 예산과목
  expectedEffect: string;   // 기대효과
  attachments: string;      // 붙임
  currentStep: number;
};
