import type { PurchaseData } from '@/lib/types/purchase';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('ko-KR').format(amount);

export function generatePurchaseText(data: PurchaseData): string {
  const { purchaseType, eventName, schoolName, department, writerName, writerPosition, date, reason, basis, items, budgetLine, expectedEffect, attachments } = data;

  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const prefixes = ['가', '나', '다', '라', '마', '바', '사', '아'];

  const itemLines = items
    .map((item, i) => {
      const subtotal = item.unitPrice * item.quantity;
      return `    ${prefixes[i] || (i + 1)}. ${item.name}${item.spec ? ` (${item.spec})` : ''}: ${formatCurrency(item.unitPrice)}원 × ${item.quantity}${purchaseType === 'snack' ? '인' : ''} = ${formatCurrency(subtotal)}원`;
    })
    .join('\n');

  const typeLabel: Record<string, string> = {
    snack: '학생 간식 구매',
    fee: '강사 수당 지급',
    goods: '운영 물품 구매',
  };

  const sectionParts: string[] = [];

  // 1. 목적
  sectionParts.push(`1. 목적
    가. ${reason || typeLabel[purchaseType]}`);

  // 2. 근거
  if (basis) {
    sectionParts.push(`2. 근거
    가. ${basis}`);
  }

  // 3. 세부 내역
  sectionParts.push(`3. 세부 내역
${itemLines}
        계: ${formatCurrency(totalAmount)}원`);

  // 4. 예산 과목
  if (budgetLine) {
    sectionParts.push(`4. 예산 과목
    가. ${budgetLine}: ${formatCurrency(totalAmount)}원`);
  }

  // 5. 기대 효과
  if (expectedEffect) {
    sectionParts.push(`5. 기대 효과
    가. ${expectedEffect}`);
  }

  const renumbered = sectionParts.map((part, idx) => {
    const lines = part.split('\n');
    lines[0] = lines[0].replace(/^\d+\./, `${idx + 1}.`);
    return lines.join('\n');
  });

  const attachmentText = attachments || '없음';

  return `품 의 서

${schoolName} ${department}

수신: ${schoolName}장
(경유)

제목: ${eventName} ${typeLabel[purchaseType]} 품의

${renumbered.join('\n\n')}

위와 같이 품의하오니 결재 바랍니다.

붙임  ${attachmentText}  1부.  끝.

${date}
품의자: ${writerPosition} ${writerName}
${schoolName} ${department}`;
}
