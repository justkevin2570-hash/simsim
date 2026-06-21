'use client';

import { useRef } from 'react';
import { useFairPlanStore } from '@/lib/store/fairPlanStore';

export function Step8Expectation() {
  const { step8, updateStep } = useFairPlanStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateEffect = (index: number, value: string) => {
    const updated = [...step8.effects];
    updated[index] = value;
    updateStep('step8', { effects: updated });
  };

  const addEffect = () => {
    updateStep('step8', { effects: [...step8.effects, ''] });
  };

  const removeEffect = (index: number) => {
    updateStep('step8', { effects: step8.effects.filter((_, i) => i !== index) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateStep('step8', { gymImage: event.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateStep('step8', { gymImage: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const prefixes = ['가', '나', '다', '라', '마'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">8단계: 기대 효과 및 별첨 1 (체육관 배치도)</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">기대 효과</label>
          <div className="space-y-2">
            {step8.effects.map((effect, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sm font-medium text-gray-500 w-6 mt-2">{prefixes[i]}.</span>
                <textarea
                  value={effect}
                  onChange={(e) => updateEffect(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
                />
                {step8.effects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEffect(i)}
                    className="text-gray-400 hover:text-red-500 text-sm mt-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEffect}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              + 항목 추가
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <label className="text-sm font-semibold text-gray-600 block mb-2">체육관 배치도 이미지</label>
          <div className="space-y-3">
            {!step8.gymImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
              >
                <p className="text-sm text-gray-500 mb-1">클릭하여 이미지 파일을 업로드하세요</p>
                <p className="text-xs text-gray-400">PNG, JPG, JPEG 지원</p>
              </div>
            ) : (
              <div className="relative border rounded-xl overflow-hidden">
                <img
                  src={step8.gymImage}
                  alt="체육관 배치도"
                  className="w-full max-h-64 object-contain bg-gray-50"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
