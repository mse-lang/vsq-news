import { MetadataRoute } from 'next';
import { fetchArticles } from '@/lib/rss';
import { Lang } from '@/lib/types';

const BASE_URL = 'https://vsq.news';
const LANGS: Lang[] = ['ko', 'en', 'zh', 'ja', 'fr'];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...(['en', 'zh', 'ja', 'fr'] as Lang[]).map((lang) => ({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    })),
  ];

  // Add article URLs
  for (const lang of LANGS) {
    try {
      const articles = await fetchArticles(lang);
      for (const article of articles) {
        const path = lang === 'ko' ? `/${article.slug}` : `/${lang}/${article.slug}`;
        routes.push({
          url: `${BASE_URL}${path}`,
          lastModified: article.isoDate ? new Date(article.isoDate) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    } catch {
      // Skip if feed is unavailable
    }
  }

  return routes;
}
