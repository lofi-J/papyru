// Tailwind CSS v4 커스텀 폰트 타입 정의
declare module 'tailwindcss/theme' {
  interface Theme {
    fontFamily: {
      nanum: string[];
      'nanum-sans': string[];
    };
  }
}
