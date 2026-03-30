# VSQ.News - 프로젝트 브리프

## 개요
벤처스퀘어(venturesquare.net) 다국어 뉴스 사이트
도메인: vsq.news

## 핵심 컨셉
- **터미널 스타일 UI** — 뉴스가 흘러가는 단순한 인터페이스
- **AI 검색 최적화** — 구조화된 마크업, 명확한 메타데이터
- **다국어** — 한국어/영어/중국어/일본어/프랑스어
- **랜딩은 터미널, 기사 본문은 깔끔한 뉴스 스타일**

## 데이터 소스 (RSS)
### 전체 피드
- 한국어: https://www.venturesquare.net/feed
- 영문: https://www.venturesquare.net/en/feed
- 중문: https://www.venturesquare.net/zh/feed
- 일문: https://www.venturesquare.net/ja/feed
- 불어: https://www.venturesquare.net/fr/feed

### 카테고리별
- news-contents / interview-news / startups / special-post / trend(한국어만)

## 발행 정책
- 벤처스퀘어 기사 발행 후 **1시간 뒤** 노출
- 원본 기사 링크 제공 (venturesquare.net으로 연결)
- 썸네일: 벤처스퀘어 원본 썸네일 그대로 사용

## UI/UX 요구사항

### 랜딩 페이지 (터미널 스타일)
- 배경: 검정 또는 매우 어두운 색
- 폰트: 모노스페이스 (JetBrains Mono, Fira Code 등)
- 뉴스가 터미널 출력처럼 위에서 아래로 흘러내려옴
- 언어 버튼: [KO] [EN] [ZH] [JA] [FR] — 클릭 시 해당 언어 피드로 전환
- 각 뉴스 라인: 타임스탬프 + 카테고리 + 제목
- 클릭 시 기사 상세 페이지로 이동

### 기사 상세 페이지 (클린 뉴스 스타일)
- 흰 배경, 읽기 좋은 세리프 또는 산세리프 폰트
- 썸네일 이미지
- 제목, 발행일, 카테고리
- 본문 (RSS에서 가져온 excerpt + 원본 링크)
- "원문 보기" 버튼 → venturesquare.net 원본으로 이동
- 소셜 댓글 (Disqus 또는 utterances)

### 기능
- **소셜 댓글만** (Disqus 추천)
- 다른 부가 기능 없음
- 다크모드 기본, 라이트모드 없음

## 로고 & 브랜딩
- 로고: "VSQ.NEWS" 텍스트 기반, 디지털/터미널 스타일
  - 모노스페이스 폰트
  - 색상: 초록 (#00ff41) on 검정, 또는 화이트 on 검정
  - 심플하고 기술적인 느낌
- 파비콘: VSQ 또는 > 커서 아이콘

## 기술 스택 (제안)
- **Next.js 14** (App Router) — SSG/ISR로 빌드
- **Tailwind CSS** — 스타일링
- RSS 파싱: rss-parser 또는 fast-xml-parser
- 댓글: Disqus
- 배포: Vercel

## 폴더 구조
```
vsq-news/
├── app/
│   ├── page.tsx          # 터미널 랜딩 (한국어 기본)
│   ├── [lang]/
│   │   ├── page.tsx      # 언어별 랜딩
│   │   └── [slug]/
│   │       └── page.tsx  # 기사 상세
│   └── layout.tsx
├── components/
│   ├── TerminalFeed.tsx
│   ├── ArticlePage.tsx
│   ├── LangSwitcher.tsx
│   └── Logo.tsx
├── lib/
│   ├── rss.ts            # RSS 파싱 + 1시간 딜레이 필터
│   └── types.ts
└── public/
    ├── favicon.ico
    └── logo.svg
```

## SEO / AI 검색 최적화
- 각 기사 페이지: `<article>` 태그, Schema.org NewsArticle
- OpenGraph 메타태그
- sitemap.xml 자동 생성
- robots.txt 허용
- hreflang 다국어 태그

## 색상 팔레트
- 배경: #0a0a0a
- 터미널 텍스트: #00ff41 (매트릭스 그린)
- 타임스탬프: #666666
- 카테고리: #ffff00 또는 #00bfff
- 링크 hover: #ffffff
- 커서 깜빡임 애니메이션
