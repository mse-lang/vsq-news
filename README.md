# VSQ.News

VentureSquare 다국어 뉴스 사이트 — [vsq.news](https://vsq.news)

터미널 스타일 UI로 한국어/영어/중국어/일본어/프랑스어 스타트업 뉴스를 제공합니다.

## 기술 스택

- **Next.js 15** (App Router, ISR)
- **Tailwind CSS**
- **rss-parser** — RSS 피드 파싱
- **Disqus** — 소셜 댓글
- **Vercel** — 배포

## 시작하기

```bash
npm install
cp .env.local.example .env.local
# .env.local에 Disqus shortname 설정 (선택)
npm run dev
```

## 환경변수

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | Disqus 사이트 shortname (선택) |

## 구조

```
app/
├── page.tsx              # 한국어 터미널 랜딩
├── [slug]/page.tsx       # 한국어 기사 상세
├── [lang]/
│   ├── page.tsx          # 다국어 랜딩 (en/zh/ja/fr)
│   └── [slug]/page.tsx   # 다국어 기사 상세
├── sitemap.ts            # 자동 sitemap
├── robots.ts             # robots.txt
└── icon.tsx              # 파비콘 (> 커서)
components/
├── TerminalFeed.tsx      # 터미널 애니메이션 피드
├── ArticlePage.tsx       # 기사 상세 (클린 뉴스 스타일)
├── LangSwitcher.tsx      # 언어 전환 버튼
└── Logo.tsx              # VSQ.NEWS 로고
lib/
├── rss.ts                # RSS 파싱 + 1시간 딜레이 필터
└── types.ts              # 타입 정의
```

## 발행 정책

- 벤처스퀘어 원본 발행 후 **1시간 뒤** 노출
- ISR revalidate: 5분 간격
- 원본 기사 링크 제공

## 배포 (Vercel)

```bash
vercel --prod
```
