'use client';

import { usePurchaseStore } from '@/lib/store/purchaseStore';

const typeItemLabels: Record<string, { name: string; spec: string; qty: string }> = {
  snack: { name: '품목명', spec: '1인분 기준', qty: '수량(인)' },
  fee: { name: '강의 구분', spec: '소속', qty: '시수' },
  goods: { name: '물품명', spec: '규격', qty: '수량' },
};

export function StepItems() {
  const { purchaseType, items, updateItem, addItem, removeItem } = usePurchaseStore();
  const labels = typeItemLabels[purchaseType];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('ko-KR').format(amount);

  const grandTotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">품의 내역 입력</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">
                {labels.name}
              </th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-44">
                {labels.spec}
              </th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">
                단가
              </th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-20">
                {labels.qty}
              </th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">
                합계
              </th>
              <th className="border border-gray-200 px-3 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => {
              const total = row.unitPrice * row.quantity;
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateItem(row.id, 'name', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder={purchaseType === 'snack' ? '간식명' : purchaseType === 'fee' ? '강의명' : '물품명'}
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={row.spec}
                      onChange={(e) => updateItem(row.id, 'spec', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder={purchaseType === 'snack' ? '1인분' : purchaseType === 'fee' ? '소속' : '규격'}
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      value={row.unitPrice || ''}
                      onChange={(e) => updateItem(row.id, 'unitPrice', Number(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none text-right"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      value={row.quantity || ''}
                      onChange={(e) => updateItem(row.id, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none text-center"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-medium text-gray-900">
                    {formatCurrency(total)}원
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(row.id)}
                      className="text-gray-400 hover:text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50">
              <td colSpan={4} className="border border-gray-200 px-3 py-3 text-right font-bold text-gray-800">
                총 합계
              </td>
              <td className="border border-gray-200 px-3 py-3 text-right font-bold text-blue-700">
                {formatCurrency(grandTotal)}원
              </td>
              <td className="border border-gray-200 px-3 py-2"></td>
            </tr>
          </tfoot>
        </table>
        <button
          type="button"
          onClick={addItem}
          className="mt-3 text-sm text-blue-600 hover:underline font-medium"
        >
          + 항목 추가
        </button>
      </div>
    </div>
  );
}
