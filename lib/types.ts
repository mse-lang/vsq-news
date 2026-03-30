export type Lang = 'ko' | 'en' | 'zh' | 'ja' | 'fr';

export interface Article {
  slug: string;
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  category: string;
  excerpt: string;
  thumbnail: string | null;
  lang: Lang;
}

export const LANG_LABELS: Record<Lang, string> = {
  ko: 'KO',
  en: 'EN',
  zh: 'ZH',
  ja: 'JA',
  fr: 'FR',
};

export const LANG_NAMES: Record<Lang, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  fr: 'Français',
};

export const RSS_FEEDS: Record<Lang, string> = {
  ko: 'https://www.venturesquare.net/feed',
  en: 'https://www.venturesquare.net/en/feed',
  zh: 'https://www.venturesquare.net/zh/feed',
  ja: 'https://www.venturesquare.net/ja/feed',
  fr: 'https://www.venturesquare.net/fr/feed',
};
