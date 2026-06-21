'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import { budgetCategoryOptions } from '@/lib/options';

export function Step7Budget() {
  const { step7, updateStep } = useFairPlanStore();

  const addRow = () => {
    const newRow = {
      id: `br${Date.now()}`,
      category: '기타',
      item: '',
      unitPrice: 0,
      quantity: 1,
      frequency: 1,
    };
    updateStep('step7', { rows: [...step7.rows, newRow] });
  };

  const removeRow = (id: string) => {
    updateStep('step7', { rows: step7.rows.filter((r) => r.id !== id) });
  };

  const updateRow = (id: string, field: string, value: string | number) => {
    updateStep('step7', {
      rows: step7.rows.map((r) => {
        if (r.id !== id) return r;
        return { ...r, [field]: value };
      }),
    });
  };

  const grandTotal = step7.rows.reduce((sum, r) => sum + r.unitPrice * r.quantity * r.frequency, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">7단계: 예산 운영 계획</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-24">구분</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">세부 항목</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-24">단가</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-16">인원</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-16">횟수</th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">합계</th>
              <th className="border border-gray-200 px-3 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {step7.rows.map((row) => {
              const total = row.unitPrice * row.quantity * row.frequency;
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">
                    <select
                      value={row.category}
                      onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                    >
                      {budgetCategoryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={row.item}
                      onChange={(e) => updateRow(row.id, 'item', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="항목명"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      value={row.unitPrice}
                      onChange={(e) => updateRow(row.id, 'unitPrice', Number(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none text-right"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      value={row.quantity}
                      onChange={(e) => updateRow(row.id, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none text-center"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      value={row.frequency}
                      onChange={(e) => updateRow(row.id, 'frequency', Number(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none text-center"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-medium text-gray-900">
                    {formatCurrency(total)}원
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
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
              <td colSpan={5} className="border border-gray-200 px-3 py-3 text-right font-bold text-gray-800">
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
          onClick={addRow}
          className="mt-3 text-sm text-blue-600 hover:underline font-medium"
        >
          + 항목 추가
        </button>
      </div>
    </div>
  );
}
