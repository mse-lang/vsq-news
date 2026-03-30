import { Metadata } from 'next';
import { fetchArticles } from '@/lib/rss';
import LangSwitcher from '@/components/LangSwitcher';
import Logo from '@/components/Logo';
import TerminalFeed from '@/components/TerminalFeed';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'VSQ.News — VentureSquare 한국어 뉴스',
  description: '벤처스퀘어 최신 스타트업 및 테크 뉴스',
  alternates: {
    languages: {
      'en': '/en',
      'zh': '/zh',
      'ja': '/ja',
      'fr': '/fr',
    },
  },
};

export default async function HomePage() {
  const articles = await fetchArticles('ko');

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <header className="px-4 py-3 border-b border-[#1a1a1a] flex items-center justify-between">
        <Logo />
        <LangSwitcher currentLang="ko" />
      </header>

      <main className="flex-1 flex flex-col px-4 py-4 max-w-5xl mx-auto w-full">
        <div className="text-[#666] text-xs mb-4 font-mono">
          <span className="text-[#00ff41]">//</span> {articles.length} articles · 1h delay filter active · ko
        </div>
        <TerminalFeed articles={articles} lang="ko" />
      </main>
    </div>
  );
}
