import Link from 'next/link';
import { ProcessDashboard } from '@/components/ProcessDashboard';

export default function FairPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <Link
            href="https://simsim-five.vercel.app/work.html"
            className="text-gray-400 hover:text-gray-600 transition-colors mr-2"
          >
            ← 뒤로
          </Link>
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-lg shadow-sm select-none">
            🏫
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            학교 행정업무 자동화 가이드
          </h1>
        </div>
        <div className="w-72 md:w-96 relative">
          <input
            type="text"
            value="교육과정 박람회"
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm font-medium focus:outline-none cursor-not-allowed select-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none select-none">
            🔍
          </span>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl w-full mx-auto p-6">
        <ProcessDashboard domainId="fair" />
      </div>
    </main>
  );
}
