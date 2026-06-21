'use client';

import { useState } from 'react';

type ResultViewProps = {
  /** 생성된 공문/계획서의 전체 텍스트 */
  text: string;
  /** 처음부터 다시 작성 버튼을 눌렀을 때 실행할 함수 */
  onReset: () => void;
  /** 이전 단계로 돌아가기 (선택) */
  onBack?: () => void;
  /** 커스텀 제목을 넣고 싶을 때 사용 (선택) */
  title?: string;
};

/**
 * HTML 파일 다운로드 생성기
 * text 내용을 공문서 스타일 HTML로 감싸서 반환
 */
function generateDocumentHtml(text: string, filename: string): string {
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
<title>${filename}</title>
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
  }
  .doc-content {
    font-size: 11pt;
    line-height: 1.8;
  }
  @media print {
    body { padding: 0; }
  }
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

function generateFilename(text: string): string {
  // 첫 줄에서 문서명 추출
  const firstLine = text.split('\n')[0]?.trim() || '문서';
  // 파일명으로 쓸 수 없게 만드는 문자 제거
  return firstLine
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

export function ResultView({
  text,
  onReset,
  onBack,
  title = '양식이 완성되었습니다!',
}: ResultViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      alert('복사에 실패했습니다. 텍스트를 직접 드래그하여 복사해주세요.');
    }
  };

  const handleHtmlDownload = () => {
    const filename = generateFilename(text);
    const html = generateDocumentHtml(text, filename);
    downloadHtmlFile(html, filename);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 상단: 제목 + 다시작성 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-green-600 flex items-center gap-1.5">
          🎉 {title}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-blue-500 hover:underline font-medium transition-all"
        >
          처음부터 다시 작성
        </button>
      </div>

      {/* 문서 미리보기 (어두운 배경 텍스트 뷰어) */}
      <div className="relative group">
        <pre className="whitespace-pre-wrap bg-gray-950 text-gray-100 p-5 rounded-xl font-mono text-xs md:text-sm leading-relaxed max-h-[380px] overflow-y-auto shadow-inner border border-gray-800">
          {text}
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-2.5 py-1 rounded text-xs transition-colors border border-gray-700 font-sans"
        >
          {copied ? '✓ 완료' : '복사'}
        </button>
      </div>

      {/* 액션 버튼 3종 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {copied ? '✓ 복사 완료!' : '📋 클립보드 복사'}
        </button>

        <button
          type="button"
          onClick={handleHtmlDownload}
          className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          🌐 HTML 파일 다운로드
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full py-3.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          🖨️ 인쇄 / PDF 저장
        </button>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-400 font-medium">
          <strong className="text-gray-600">HTML 다운로드</strong>는 브라우저에서 바로 열리는 문서 파일입니다.
          {' '}<strong className="text-gray-600">인쇄 / PDF 저장</strong>을 누르면 인쇄 설정 창에서
          {' '}대상(PDF로 저장)을 선택하여 PDF로 저장할 수 있습니다.
        </p>
      </div>

      {/* 하단: 이전 버튼 */}
      {onBack && (
        <div className="flex justify-between items-center pt-4 border-t mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            이전
          </button>
          <div />
        </div>
      )}
    </div>
  );
}
