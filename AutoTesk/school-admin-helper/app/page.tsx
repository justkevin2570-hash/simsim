import { SearchBox } from '@/components/SearchBox';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* 메인으로 돌아가기 */}
      <a
        href="https://simsim-five.vercel.app/work.html"
        className="fixed top-6 left-6 text-gray-400 hover:text-gray-600 text-sm transition-colors z-10"
      >
        ← 뒤로
      </a>

      {/*
        상단 여백을 조금 끌어올려서 검색창이 시각적인 정중앙보다 약간 위에 위치하도록 조정
        (일반적으로 검색 엔진 메인 화면들이 사용하는 비율입니다)
      */}
      <div className="w-full max-w-3xl -mt-32">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <span className="text-4xl">🏫</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 shrink-0">
            학교 행정업무 도우미
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
            막막한 기안과 계획서, 검색 한 번으로
            <strong className="font-medium text-gray-700"> 작성 절차</strong>부터
            <strong className="font-medium text-gray-700"> 복사용 텍스트 양식</strong>까지 한 번에 해결하세요.
          </p>
        </div>

        <SearchBox />

        <div className="text-center mt-12 text-sm text-gray-400 font-medium">
          <p>모든 데이터는 서버에 저장되지 않고 선생님의 PC(브라우저)에서만 안전하게 처리됩니다.</p>
        </div>

        {/* 새 3탭 시스템 링크 */}
        <div className="text-center mt-6">
          <a
            href="/guide"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            🚀 새 업무 아키텍트 시스템 이용하기
          </a>
        </div>
      </div>
    </main>
  );
}
