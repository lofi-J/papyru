export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-8 max-w-4xl mx-auto">
      {/* 페이지 제목 */}
      <div className="mb-8 text-center">
        <h1 className="text-display-b text-gray-900 mb-2">
          Typography Showcase
        </h1>
        <p className="text-body test-mixed text-gray-600">
          파스타오 폰트와 하멀 폰트 확인
        </p>
      </div>

      {/* Display Typography */}
      <section className="w-full space-y-4">
        <h2 className="text-title-b text-gray-800 border-b-2 border-gray-200 pb-2 text-center">
          Display Typography
        </h2>
        <div className="space-y-3 text-center">
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-display
            </span>
            <p className="text-display text-gray-900">가장 큰 제목</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-display-b
            </span>
            <p className="text-display-b text-gray-900">가장 큰 제목 볼드</p>
          </div>
        </div>
      </section>

      {/* Title Typography */}
      <section className="w-full space-y-4">
        <h2 className="text-title-b text-gray-800 border-b-2 border-gray-200 pb-2 text-center">
          Title Typography
        </h2>
        <div className="space-y-3 text-center">
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-title
            </span>
            <p className="text-title text-gray-900">주요 제목</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-title-b
            </span>
            <p className="text-title-b text-gray-900">주요 제목 볼드</p>
          </div>
        </div>
      </section>

      {/* Subtitle Typography */}
      <section className="w-full space-y-4">
        <h2 className="text-title-b text-gray-800 border-b-2 border-gray-200 pb-2 text-center">
          Subtitle Typography
        </h2>
        <div className="space-y-3 text-center">
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-subtitle
            </span>
            <p className="text-subtitle text-gray-900">부제목</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-subtitle-b
            </span>
            <p className="text-subtitle-b text-gray-900">부제목 볼드</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-subtitle-2
            </span>
            <p className="text-subtitle-2 text-gray-900">작은 부제목</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-subtitle-2-b
            </span>
            <p className="text-subtitle-2-b text-gray-900">작은 부제목 볼드</p>
          </div>
        </div>
      </section>

      {/* Body Typography */}
      <section className="w-full space-y-4">
        <h2 className="text-title-b text-gray-800 border-b-2 border-gray-200 pb-2 text-center">
          Body Typography
        </h2>
        <div className="space-y-3 text-center">
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-body
            </span>
            <p className="text-body text-gray-900">
              일반 본문 텍스트. 문서의 주요 내용을 담는 기본 텍스트.
            </p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-body-b
            </span>
            <p className="text-body-b text-gray-900">
              강조 본문 텍스트. 중요한 정보 전달용.
            </p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-body-2
            </span>
            <p className="text-body-2 text-gray-900">
              작은 본문 텍스트. 부가 설명이나 상세 정보용.
            </p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-body-2-b
            </span>
            <p className="text-body-2-b text-gray-900">
              작은 강조 본문 텍스트.
            </p>
          </div>
        </div>
      </section>

      {/* Caption Typography */}
      <section className="w-full space-y-4">
        <h2 className="text-title-b text-gray-800 border-b-2 border-gray-200 pb-2 text-center">
          Caption Typography
        </h2>
        <div className="space-y-3 text-center">
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-caption
            </span>
            <p className="text-caption text-gray-900">작은 설명 텍스트</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-caption-b
            </span>
            <p className="text-caption-b text-gray-900">작은 강조 텍스트</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-caption-2
            </span>
            <p className="text-caption-2 text-gray-900">
              더 좁은 줄간격 텍스트
            </p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-caption-2-b
            </span>
            <p className="text-caption-2-b text-gray-900">
              더 좁은 줄간격 강조 텍스트
            </p>
          </div>
        </div>
      </section>

      {/* 추가 유틸리티 클래스 */}
      <section className="w-full space-y-4">
        <h2 className="text-title-b text-gray-800 border-b-2 border-gray-200 pb-2 text-center">
          추가 유틸리티
        </h2>
        <div className="space-y-3 text-center">
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-overline
            </span>
            <p className="text-overline text-gray-900">대문자 변환 텍스트</p>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-button
            </span>
            <button className="text-button text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              버튼 텍스트
            </button>
          </div>
          <div>
            <span className="text-caption text-gray-500 block mb-1">
              .text-link
            </span>
            <a href="#" className="text-link text-blue-600 hover:text-blue-800">
              링크 텍스트 (호버 확인)
            </a>
          </div>
        </div>
      </section>

      {/* 폰트 정보 */}
      <section className="w-full mt-12 p-6 bg-gray-50 rounded-lg text-center">
        <h2 className="text-title-b text-gray-800 mb-4">폰트 정보</h2>
        <div className="space-y-2">
          <p className="text-body text-gray-700">
            <span className="text-body-b">주 폰트:</span> NanumGothic (나눔고딕)
          </p>
          <p className="text-body text-gray-700">
            <span className="text-body-b">폰트 스택:</span> NanumGothic → Malgun
            Gothic → 맑은 고딕 → Apple SD Gothic Neo → sans-serif
          </p>
          <p className="text-body text-gray-700">
            <span className="text-body-b">지원 굵기:</span> Regular (400), Bold
            (700)
          </p>
        </div>
      </section>
    </div>
  );
}
