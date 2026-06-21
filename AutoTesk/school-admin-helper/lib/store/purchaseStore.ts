import { create } from 'zustand';
import type { PurchaseData, PurchaseType, PurchaseItem } from '@/lib/types/purchase';

const today = new Date().toISOString().split('T')[0];

const defaultData = {
  purchaseType: 'snack' as PurchaseType,
  eventName: '2025학년도 교육과정 탐구 활동의 날',
  schoolName: 'OO고등학교',
  department: '교육과정운영부',
  writerName: 'OOO',
  writerPosition: '교사',
  date: today,
  reason: '',
  basis: '2025학년도 학교교육과정 운영 계획',
  items: [] as PurchaseItem[],
  budgetLine: '',
  expectedEffect: '',
  attachments: '견적서',
  currentStep: 1,
};

type PurchaseStore = PurchaseData & {
  initType: (type: PurchaseType) => void;
  update: (field: string, value: unknown) => void;
  updateItem: (id: string, field: string, value: string | number) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  setCurrentStep: (step: number) => void;
  resetAll: () => void;
};

export const usePurchaseStore = create<PurchaseStore>()((set) => ({
  ...defaultData,
  initType: (type) =>
    set((state) => ({
      ...defaultData,
      purchaseType: type,
      items:
        type === 'snack'
          ? [
              { id: 'i1', name: '빵 및 간식', spec: '1인분', unitPrice: 5000, quantity: 300 },
              { id: 'i2', name: '음료수', spec: '500ml', unitPrice: 1000, quantity: 300 },
            ]
          : type === 'fee'
          ? [
              { id: 'i1', name: '강사 수당', spec: '1시간 기준', unitPrice: 100000, quantity: 3 },
            ]
          : [
              { id: 'i1', name: '부스 운영 재료', spec: '', unitPrice: 30000, quantity: 7 },
              { id: 'i2', name: '현수막', spec: '대형', unitPrice: 80000, quantity: 2 },
            ],
      reason:
        type === 'snack'
          ? '교육과정 박람회 운영 중 학생 간식을 제공하여 행사 집중도와 만족도를 높이고자 함.'
          : type === 'fee'
          ? '외부 강사를 초청하여 전공 연계 특강을 운영하고 학생의 진로 탐색 기회를 확대하고자 함.'
          : '교육과정 박람회 부스 운영에 필요한 물품을 구매하여 원활한 행사 진행을 도모하고자 함.',
      budgetLine:
        type === 'snack' ? '간식비' : type === 'fee' ? '강사 수당' : '운영 물품비',
      expectedEffect:
        type === 'snack'
          ? '학생들의 행사 만족도가 향상되고 안정적인 운영이 가능함.'
          : type === 'fee'
          ? '전문가와의 만남을 통해 학생들의 진로 결정력이 강화됨.'
          : '부스 운영이 원활하게 진행되어 교육적 효과가 극대화됨.',
    })),
  update: (field, value) => set({ [field]: value }),
  updateItem: (id, field, value) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })),
  addItem: () =>
    set((state) => ({
      items: [
        ...state.items,
        { id: `i${Date.now()}`, name: '', spec: '', unitPrice: 0, quantity: 1 },
      ],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetAll: () => set({ ...defaultData, currentStep: 1 }),
}));
