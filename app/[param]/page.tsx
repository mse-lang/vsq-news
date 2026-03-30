import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchArticles, fetchArticleBySlug } from '@/lib/rss';
import { Lang, LANG_LABELS, LANG_NAMES } from '@/lib/types';
import LangSwitcher from '@/components/LangSwitcher';
import Logo from '@/components/Logo';
import TerminalFeed from '@/components/TerminalFeed';
import ArticlePage from '@/components/ArticlePage';

export const revalidate = 300;

const LANG_CODES: Lang[] = ['en', 'zh', 'ja', 'fr'];
const ALL_LANGS: Lang[] = ['ko', 'en', 'zh', 'ja', 'fr'];

interface Props {
  params: Promise<{ param: string }>;
}

export async function generateStaticParams() {
  return ALL_LANGS.map((lang) => ({ param: lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { param } = await params;

  if (LANG_CODES.includes(param as Lang)) {
    const l = param as Lang;
    return {
      title: `VSQ.News — VentureSquare ${LANG_NAMES[l]}`,
      description: `VentureSquare news in ${LANG_NAMES[l]}`,
      alternates: { languages: { ko: '/', en: '/en', zh: '/zh', ja: '/ja', fr: '/fr' } },
    };
  }

  // Treat as Korean article slug
  const article = await fetchArticleBySlug('ko', param);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.isoDate,
      locale: 'ko_KR',
      ...(article.thumbnail ? { images: [{ url: article.thumbnail }] } : {}),
    },
  };
}

export default async function ParamPage({ params }: Props) {
  const { param } = await params;

  if (param === 'ko') {
    // /ko → redirect logic handled here: show ko feed
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

  if (LANG_CODES.includes(param as Lang)) {
    const l = param as Lang;
    const articles = await fetchArticles(l);
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <header className="px-4 py-3 border-b border-[#1a1a1a] flex items-center justify-between">
          <Logo />
          <LangSwitcher currentLang={l} />
        </header>
        <main className="flex-1 flex flex-col px-4 py-4 max-w-5xl mx-auto w-full">
          <div className="text-[#666] text-xs mb-4 font-mono">
            <span className="text-[#00ff41]">//</span> {articles.length} articles · 1h delay filter active · {LANG_LABELS[l]}
          </div>
          <TerminalFeed articles={articles} lang={l} />
        </main>
      </div>
    );
  }

  // Korean article slug
  const article = await fetchArticleBySlug('ko', param);
  if (!article) notFound();
  return <ArticlePage article={article} lang="ko" />;
}
