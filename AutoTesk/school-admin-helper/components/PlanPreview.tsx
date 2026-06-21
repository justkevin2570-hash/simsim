'use client';

import { useState } from 'react';
import { useFairPlanStore } from '@/lib/store/fairPlanStore';
import {
  generateFullPlanText,
  generateFamilyLetter,
  generateRoadmap,
  generateReport,
  generateChecklist,
} from '@/lib/templates/fairPlan';

type PlanPreviewProps = {
  onEdit: (step: number) => void;
};

type SectionDef = {
  id: string;
  label: string;
  render: () => React.ReactNode;
  hasContent: boolean;
};

/**
 * 텍스트를 HTML 파일로 저장 (공문서 스타일)
 */
function generateDocumentHtml(text: string, title: string): string {
  const safeText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  @page { margin: 20mm 25mm 20mm 25mm; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Batang", "Times New Roman", "Noto Serif KR", serif;
    line-height: 1.8;
    color: #1a1a1a;
    padding: 20mm 25mm;
    max-width: 210mm;
    margin: 0 auto;
    font-size: 11pt;
  }
  .doc-content { line-height: 1.8; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
<div class="doc-content">${safeText}</div>
</body>
</html>`;
}

function downloadHtmlFile(html: string, filename: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function PlanPreview({ onEdit }: PlanPreviewProps) {
  const {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    skippedSections,
    toggleSection,
  } = useFairPlanStore();
  const [copied, setCopied] = useState(false);
  const [downloadCopied, setDownloadCopied] = useState(false);

  const familyLetter = step9.includeFamilyLetter
    ? generateFamilyLetter({ step1, step5, step9 })
    : '';
  const roadmap = step9.includeRoadmap ? generateRoadmap() : '';
  const report = step9.includeReport ? generateReport({ step1, step6 }) : '';
  const checklist = step9.includeChecklist ? generateChecklist({ step4 }) : '';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const grandTotal = step7.rows.reduce(
    (sum, r) => sum + r.unitPrice * r.quantity * r.frequency,
    0
  );

  const allPrograms = [
    ...step1.selectedPrograms,
    ...step1.customPrograms.filter((p) => p.trim() !== ''),
  ];

  const sections: SectionDef[] = [
    {
      id: 'overview',
      label: '운영 개요',
      hasContent: true,
      render: () => (
        <>
          <p className="indent-1">가. 일시: {step1.date} ({step1.dayOfWeek})</p>
          <p className="indent-1">나. 대상: {step1.targetGrades.join(', ')}</p>
          <p className="indent-1">다. 장소: 본교 체육관 및 각 학급 교실</p>
        </>
      ),
    },
    {
      id: 'programs',
      label: '주요 프로그램',
      hasContent: allPrograms.length > 0,
      render: () => (
        <>
          {allPrograms.map((p, i) => (
            <p key={i} className="indent-1">
              {['가', '나', '다', '라', '마', '바'][i]}. {p}
            </p>
          ))}
        </>
      ),
    },
    {
      id: 'purposes',
      label: '목적',
      hasContent: step2.purposes.some((p) => p.trim() !== ''),
      render: () => (
        <>
          {step2.purposes
            .filter((p) => p.trim() !== '')
            .map((p, i) => (
              <p key={i} className="indent-1">
                {['가', '나', '다', '라', '마', '바'][i]}. {p}
              </p>
            ))}
        </>
      ),
    },
    {
      id: 'policies',
      label: '운영 방침',
      hasContent:
        step2.policies.some((p) => p.trim() !== '') ||
        step2.safetyEducation ||
        step2.stampRally,
      render: () => (
        <>
          {step2.policies
            .filter((p) => p.trim() !== '')
            .map((p, i) => (
              <p key={i} className="indent-1">
                {['가', '나', '다', '라', '마', '바'][i]}. {p}
              </p>
            ))}
          {step2.safetyEducation && (
            <p className="indent-1">- 행사 전 사전 안전 교육 실시</p>
          )}
          {step2.studentOperators && (
            <p className="indent-1">- 학생 운영진 (동아리) 활용</p>
          )}
          {step2.teacherAssignment && (
            <p className="indent-1">- 각 부스 지도교사 위촉</p>
          )}
          {step2.stampRally && (
            <p className="indent-1">
              - 스탬프 랠리 운영 ({step2.stampCount}개 이상 날인 시 확인)
            </p>
          )}
        </>
      ),
    },
    {
      id: 'timetable',
      label: '세부 시간표',
      hasContent: step3.cells.length > 0,
      render: () => {
        const grades = [...new Set(step3.cells.map((c) => c.grade))];
        return (
          <>
            {grades.map((grade) => {
              const gradeCells = step3.cells
                .filter((c) => c.grade === grade)
                .sort((a, b) => a.period - b.period);
              return (
                <div key={grade} className="mb-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">
                    [{grade}]
                  </h4>
                  <table>
                    <thead>
                      <tr>
                        <th>교시</th>
                        <th>내용</th>
                        <th>장소</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeCells.map((cell, idx) => (
                        <tr key={idx}>
                          <td>{cell.period}</td>
                          <td>{cell.content}</td>
                          <td>{cell.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </>
        );
      },
    },
    {
      id: 'booths',
      label: '교과 부스 운영 현황',
      hasContent: step4.booths.length > 0,
      render: () => (
        <>
          {step4.booths.map((booth) => (
            <p key={booth.id} className="indent-1">
              - {booth.boothNumber}번 ({booth.subjectGroup}): {booth.content} /
              담당: {booth.teacher}
            </p>
          ))}
          {step4.rules.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-gray-700">운영 유의사항:</p>
              {step4.rules.map((rule, i) => (
                <p key={i} className="indent-1">
                  {['가', '나', '다', '라'][i]}. {rule}
                </p>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      id: 'clubs',
      label: '동아리 부스 운영',
      hasContent: step5.clubs.length > 0,
      render: () => (
        <>
          {step5.clubs.map((club) => (
            <p key={club.id} className="indent-1">
              - {club.clubName}: {club.activity} / 담당: {club.teacher}
            </p>
          ))}
          {step5.briefingDate && (
            <p className="indent-1 mt-1">
              사전 설명회: {step5.briefingDate} @ {step5.briefingLocation}
            </p>
          )}
        </>
      ),
    },
    {
      id: 'lectures',
      label: '고교학점제 이해 교육 및 특강',
      hasContent: step6.grade1Sessions.length > 0 || step6.grade2Lectures.length > 0,
      render: () => (
        <>
          {step6.grade1Sessions.length > 0 && (
            <>
              <h4 className="font-medium text-gray-700 mt-2">
                1학년 프로그램
              </h4>
              {step6.grade1Sessions.map((s) => (
                <p key={s.id} className="indent-1">
                  - {s.session}: {s.title} - {s.content}
                </p>
              ))}
            </>
          )}
          {step6.grade2Lectures.length > 0 && (
            <>
              <h4 className="font-medium text-gray-700 mt-2">
                2학년 대학교수 초청 강연
              </h4>
              {step6.grade2Lectures.map((l) => (
                <p key={l.id} className="indent-1">
                  - {l.number}. {l.department} - {l.topic} ({l.instructor}{' '}
                  {l.university})
                </p>
              ))}
            </>
          )}
        </>
      ),
    },
    {
      id: 'budget',
      label: '예산 계획',
      hasContent: step7.rows.length > 0,
      render: () => (
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>항목</th>
              <th>단가</th>
              <th>인원</th>
              <th>횟수</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {step7.rows.map((row) => (
              <tr key={row.id}>
                <td>{row.category}</td>
                <td>{row.item}</td>
                <td>{formatCurrency(row.unitPrice)}원</td>
                <td>{row.quantity}</td>
                <td>{row.frequency}</td>
                <td>
                  {formatCurrency(row.unitPrice * row.quantity * row.frequency)}
                  원
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                총 합계
              </td>
              <td style={{ fontWeight: 'bold' }}>
                {formatCurrency(grandTotal)}원
              </td>
            </tr>
          </tfoot>
        </table>
      ),
    },
    {
      id: 'expectations',
      label: '기대 효과',
      hasContent: step8.effects.some((e) => e.trim() !== ''),
      render: () => (
        <>
          {step8.effects
            .filter((e) => e.trim() !== '')
            .map((e, i) => (
              <p key={i} className="indent-1">
                {['가', '나', '다', '라', '마'][i]}. {e}
              </p>
            ))}
        </>
      ),
    },
  ];

  const visibleSections = sections.filter(
    (s) => s.hasContent && !skippedSections.includes(s.id)
  );

  const handleCopy = async () => {
    const fullPlanText = generateFullPlanText(
      { step1, step2, step3, step4, step5, step6, step7, step8, step9 },
      skippedSections
    );
    try {
      await navigator.clipboard.writeText(fullPlanText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const handleHtmlDownload = () => {
    const fullPlanText = generateFullPlanText(
      { step1, step2, step3, step4, step5, step6, step7, step8, step9 },
      skippedSections
    );
    const docTitle = step1.eventName.replace(/[\\/:*?"<>|]/g, '').trim();
    const filename = `${docTitle}_운영계획서.html`;
    const html = generateDocumentHtml(fullPlanText, docTitle);
    downloadHtmlFile(html, filename);
    setDownloadCopied(true);
    setTimeout(() => setDownloadCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 print:space-y-4">
      {/* 상단 액션 바 */}
      <div className="flex items-center justify-between print:hidden flex-wrap gap-2">
        <h2 className="text-lg font-bold text-green-600">완성된 운영 계획서</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copied ? '✓ 복사 완료' : '📋 복사'}
          </button>
          <button
            type="button"
            onClick={handleHtmlDownload}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700"
          >
            {downloadCopied ? '✓ 다운로드 완료' : '🌐 HTML 저장'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            🖨️ 인쇄
          </button>
        </div>
      </div>

      {/* 섹션 선택 체크박스 */}
      <div className="print:hidden mb-4">
        <p className="text-xs text-gray-500 mb-2 font-medium">
          포함할 섹션 체크 (체크 해제 시 해당 항목 건너뛰기)
        </p>
        <div className="flex flex-wrap gap-3">
          {sections
            .filter((s) => s.hasContent)
            .map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-1.5 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!skippedSections.includes(s.id)}
                  onChange={() => toggleSection(s.id)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{s.label}</span>
              </label>
            ))}
        </div>
      </div>

      {/* 공문서 스타일 미리보기 */}
      <div className="document-preview print-content">
        <div className="text-center mb-8">
          <h1 className="doc-title">{step1.eventName}</h1>
          <p className="doc-meta">
            {step1.schoolName} {step1.department}
          </p>
        </div>

        <div className="doc-body">
          {visibleSections.map((section, idx) => (
            <section key={section.id}>
              <h3 className="doc-section-title">
                {idx + 1}. {section.label}
              </h3>
              {section.render()}
            </section>
          ))}

          {/* 별첨들 */}
          {step8.gymImage && (
            <section>
              <h3 className="doc-section-title">
                별첨 1: 체육관 배치도
              </h3>
              <img
                src={step8.gymImage}
                alt="체육관 배치도"
                className="max-w-full max-h-96 object-contain mx-auto"
              />
            </section>
          )}

          {familyLetter && (
            <section className="border-t pt-4">
              <h3 className="doc-section-title">
                별첨 2: 가정통신문
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-xs font-sans">
                {familyLetter}
              </pre>
            </section>
          )}

          {roadmap && (
            <section className="border-t pt-4">
              <h3 className="doc-section-title">
                별첨 3: 진로 로드맵
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-xs font-sans">
                {roadmap}
              </pre>
            </section>
          )}

          {report && (
            <section className="border-t pt-4">
              <h3 className="doc-section-title">
                별첨 4: 학과 탐색 활동 보고서
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-xs font-sans">
                {report}
              </pre>
            </section>
          )}

          {checklist && (
            <section className="border-t pt-4">
              <h3 className="doc-section-title">
                별첨 5: 선택과목 체크리스트
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-xs font-sans">
                {checklist}
              </pre>
            </section>
          )}
        </div>
      </div>

      {/* 하단: 수정하기 링크 */}
      <div className="border-t pt-4 print:hidden flex justify-between items-center">
        <button
          type="button"
          onClick={() => onEdit(1)}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          ← 처음으로 돌아가 수정하기
        </button>
        <p className="text-xs text-gray-400">
          인쇄(Ctrl+P) → PDF 저장 가능
        </p>
      </div>
    </div>
  );
}
