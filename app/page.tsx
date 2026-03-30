import { Metadata } from 'next';
import { fetchArticles } from '@/lib/rss';
import LangSwitcher from '@/components/LangSwitcher';
import Logo from '@/components/Logo';
import TerminalFeed from '@/components/TerminalFeed';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'VSQ.News — VentureSquare Startup & Tech News',
  description: 'VentureSquare latest startup and tech news in English',
  alternates: {
    languages: {
      'ko': '/ko',
      'zh': '/zh',
      'ja': '/ja',
      'fr': '/fr',
    },
  },
};

export default async function HomePage() {
  const articles = await fetchArticles('en');

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <header className="px-4 py-3 border-b border-[#1a1a1a] flex items-center justify-between">
        <Logo />
        <LangSwitcher currentLang="en" />
      </header>

      <main className="flex-1 flex flex-col px-4 py-4 max-w-5xl mx-auto w-full">
        <div className="text-[#666] text-xs mb-4 font-mono">
          <span className="text-[#00ff41]">//</span> {articles.length} articles · 1h delay filter active · en
        </div>
        <TerminalFeed articles={articles} lang="en" />
      </main>
    </div>
  );
}
