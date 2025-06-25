# Papyru

<div align="center">
  <img src="public/images/letter_papyrus.jpg" width="300px" height="150px" />
  
  **크로스 플랫폼 노트 테이킹 어플리케이션**
  
  [![Tech Stack](https://skillicons.dev/icons?i=ts,tailwind,react,rust,sqlite,tauri&perline=3)](https://skillicons.dev)
</div>

## ✨ 소개

Papyru는 Tauri와 React를 기반으로 한 크로스 플랫폼 노트 테이킹 어플리케이션입니다. Rust의 성능과 안정성, React의 유연한 UI를 결합하여 빠르고 직관적인 노트 작성 경험을 제공합니다.

## 🚀 주요 기능 (예정)

- 📝 **리치 텍스트 에디터**: 마크다운 지원으로 구조화된 노트 작성
- 🔍 **빠른 검색**: 전문 검색으로 원하는 노트를 즉시 찾기
- 🏷️ **태그 시스템**: 노트를 체계적으로 분류하고 관리
- 💾 **로컬 저장소**: SQLite 기반의 안전한 데이터 보관
- 🌙 **다크 모드**: 눈에 편한 테마 지원
- 🖥️ **크로스 플랫폼**: Windows, macOS, Linux 지원

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Rust + Tauri 2.0
- **Database**: SQLite (예정)
- **Styling**: TailwindCSS (예정)
- **Package Manager**: pnpm

## 📋 필수 조건

- [Node.js](https://nodejs.org/) (18.0.0 이상)
- [Rust](https://rustup.rs/)
- [pnpm](https://pnpm.io/)

## 🚀 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/papyru.git
cd papyru

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm tauri dev

# 프로덕션 빌드
pnpm tauri build
```

## 📁 프로젝트 구조

```
papyru/
├── src/                    # React 프론트엔드
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── App.css            # 스타일시트
│   └── main.tsx           # 앱 진입점
├── src-tauri/             # Tauri/Rust 백엔드
│   ├── src/
│   │   ├── main.rs        # Rust 진입점
│   │   └── lib.rs         # 앱 로직
│   ├── Cargo.toml         # Rust 의존성
│   └── tauri.conf.json    # Tauri 설정
└── public/                # 정적 자원
    └── images/
```

## 🔧 개발 명령어

```bash
# 개발 모드로 실행
pnpm tauri dev

# 프로덕션 빌드
pnpm tauri build

# 프론트엔드만 개발 서버 실행
pnpm dev

# 프론트엔드 빌드
pnpm build
```

## 📊 개발 현황

> ⚠️ **알림**: 이 프로젝트는 현재 초기 개발 단계입니다.
>
> 현재 기본적인 Tauri + React 템플릿 구조를 가지고 있으며, 노트 테이킹 기능은 아직 구현되지 않았습니다.

**구현 완료:**

- ✅ 기본 Tauri-React 연동
- ✅ Rust-Frontend 통신 시스템
- ✅ 반응형 UI 기반
- ✅ 다크/라이트 모드 지원

**개발 예정:**

- 🔄 노트 CRUD 시스템
- 🔄 SQLite 데이터베이스 연동
- 🔄 TailwindCSS 스타일링
- 🔄 리치 텍스트 에디터
- 🔄 검색 및 태그 기능

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

<div align="center">
  Made with ❤️ using Tauri + React
</div>
