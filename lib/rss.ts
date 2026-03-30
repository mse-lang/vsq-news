import Parser from 'rss-parser';
import { Article, Lang, RSS_FEEDS } from './types';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
    ],
  },
});

const ONE_HOUR_MS = 60 * 60 * 1000;

function slugify(title: string, isoDate: string): string {
  const datePart = isoDate ? isoDate.slice(0, 10).replace(/-/g, '') : Date.now().toString();
  const titlePart = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\u3040-\u30ff\u4e00-\u9fff]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/^-|-$/g, '');
  return `${datePart}-${titlePart}`;
}

function extractThumbnail(item: Record<string, unknown>): string | null {
  const mc = item.mediaContent as { $?: { url?: string } } | undefined;
  if (mc?.$?.url) return mc.$.url;
  const mt = item.mediaThumbnail as { $?: { url?: string } } | undefined;
  if (mt?.$?.url) return mt.$.url;
  // Try enclosure
  const enc = item.enclosure as { url?: string } | undefined;
  if (enc?.url) return enc.url;
  // Try extracting first img from content
  const content = (item['content:encoded'] as string) || (item.content as string) || '';
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  return null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export async function fetchArticles(lang: Lang): Promise<Article[]> {
  const url = RSS_FEEDS[lang];
  const feed = await parser.parseURL(url);
  const now = Date.now();

  const articles: Article[] = [];

  for (const item of feed.items) {
    const isoDate = item.isoDate || item.pubDate || '';
    const pubTime = isoDate ? new Date(isoDate).getTime() : 0;

    // 1-hour delay filter
    if (now - pubTime < ONE_HOUR_MS) continue;

    const title = item.title || '';
    const link = item.link || '';
    const category =
      (item.categories && item.categories[0]) || 'news';
    const itemAny = item as unknown as Record<string, unknown>;
    const rawExcerpt =
      (itemAny['content:encoded'] as string) ||
      item.content ||
      item.contentSnippet ||
      '';
    // Keep full HTML for article page; strip for excerpt/listing
    const fullHtml = rawExcerpt;
    const excerpt = stripHtml(rawExcerpt).slice(0, 300);
    const thumbnail = extractThumbnail(itemAny);
    const pubDate = isoDate
      ? new Date(isoDate).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '';

    articles.push({
      slug: slugify(title, isoDate),
      title,
      link,
      pubDate,
      isoDate,
      category: String(category),
      excerpt,
      fullHtml,
      thumbnail,
      lang,
    });
  }

  return articles;
}

export async function fetchArticleBySlug(
  lang: Lang,
  slug: string
): Promise<Article | null> {
  const articles = await fetchArticles(lang);
  return articles.find((a) => a.slug === slug) ?? null;
}
