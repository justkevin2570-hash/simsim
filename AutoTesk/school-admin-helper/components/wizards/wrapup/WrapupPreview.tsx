'use client';

import { useState } from 'react';
import { useWrapupStore } from '@/lib/store/wrapupStore';
import { generateSurveyText, generateReportText } from '@/lib/templates/wrapup';

type WrapupPreviewProps = {
  onEdit: (step: number) => void;
};

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

export function WrapupPreview({ onEdit }: WrapupPreviewProps) {
  const store = useWrapupStore();
  const [copied, setCopied] = useState(false);

  const text = store.wrapupType === 'survey'
    ? generateSurveyText({
        wrapupType: store.wrapupType,
        eventName: store.eventName,
        schoolName: store.schoolName,
        department: store.department,
        date: store.date,
        target: store.target,
        participantCount: store.participantCount,
        surveyAreas: store.surveyAreas,
        summary: '',
        achievements: [],
        improvements: [],
        attachments: '',
        currentStep: 0,
      })
    : generateReportText({
        wrapupType: store.wrapupType,
        eventName: store.eventName,
        schoolName: store.schoolName,
        department: store.department,
        date: store.date,
        target: store.target,
        participantCount: store.participantCount,
        surveyAreas: [],
        summary: store.summary,
        achievements: store.achievements,
        improvements: store.improvements,
        attachments: store.attachments,
        currentStep: 0,
      });

  const docTitle = `${store.eventName}_${store.wrapupType === 'survey' ? '만족도조사' : '결과보고서'}`.replace(/[\\/:*?"<>|]/g, '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const handleHtmlDownload = () => {
    const html = generateDocumentHtml(text, docTitle);
    downloadHtmlFile(html, `${docTitle}.html`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 print:space-y-4">
      <div className="flex items-center justify-between print:hidden flex-wrap gap-2">
        <h2 className="text-lg font-bold text-green-600">
          {store.wrapupType === 'survey' ? '완성된 만족도 조사' : '완성된 결과보고서'}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              copied ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copied ? '✓ 복사 완료' : '📋 복사'}
          </button>
          <button
            type="button"
            onClick={handleHtmlDownload}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700"
          >
            🌐 HTML 저장
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

      <div className="document-preview print-content">
        <div className="doc-body">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-serif text-gray-900">
            {text}
          </pre>
        </div>
      </div>

      <div className="border-t pt-4 print:hidden flex justify-between items-center">
        <button
          type="button"
          onClick={() => onEdit(1)}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          ← 이전 단계로 돌아가 수정하기
        </button>
        <p className="text-xs text-gray-400">인쇄(Ctrl+P) → PDF 저장 가능</p>
      </div>
    </div>
  );
}
