import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchArticleBySlug } from '@/lib/rss';
import { Lang } from '@/lib/types';
import ArticlePage from '@/components/ArticlePage';

export const revalidate = 300;

const LANG_CODES: Lang[] = ['en', 'zh', 'ja', 'fr'];

interface Props {
  params: Promise<{ param: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { param, slug } = await params;
  if (!LANG_CODES.includes(param as Lang)) return {};
  const article = await fetchArticleBySlug(param as Lang, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.isoDate,
      ...(article.thumbnail ? { images: [{ url: article.thumbnail }] } : {}),
    },
    alternates: { languages: { ko: '/', en: '/en', zh: '/zh', ja: '/ja', fr: '/fr' } },
  };
}

export default async function LangArticlePage({ params }: Props) {
  const { param, slug } = await params;
  if (!LANG_CODES.includes(param as Lang)) notFound();
  const l = param as Lang;
  const article = await fetchArticleBySlug(l, slug);
  if (!article) notFound();
  return <ArticlePage article={article} lang={l} />;
}
