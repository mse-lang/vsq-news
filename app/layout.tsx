import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const BASE_URL = 'https://vsq.news';

export const metadata: Metadata = {
  title: {
    default: 'VSQ.News — Korea Startup & Tech News',
    template: '%s | VSQ.News',
  },
  description: 'VSQ.News delivers VentureSquare startup and tech news in Korean, English, Chinese, Japanese, and French. AI-optimized, multilingual coverage of Korea\'s innovation ecosystem.',
  metadataBase: new URL(BASE_URL),
  keywords: [
    'Korea startup news', 'Korean tech news', 'VentureSquare', 'K-startup',
    'startup investment', 'AI news Korea', 'Korean unicorn', 'K-tech',
    '벤처스퀘어', '스타트업 뉴스', '한국 스타트업', '투자 뉴스',
  ],
  authors: [{ name: 'VentureSquare', url: 'https://www.venturesquare.net' }],
  creator: 'VentureSquare',
  publisher: 'VSQ.News',
  category: 'technology',
  openGraph: {
    type: 'website',
    siteName: 'VSQ.News',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'zh_CN', 'ja_JP', 'fr_FR'],
    url: BASE_URL,
    title: 'VSQ.News — Korea Startup & Tech News',
    description: 'Multilingual startup and tech news from VentureSquare, Korea\'s leading startup media.',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'VSQ.News' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@venturesquare',
    title: 'VSQ.News — Korea Startup & Tech News',
    description: 'Multilingual startup and tech news from VentureSquare.',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'ko': `${BASE_URL}/ko`,
      'en': BASE_URL,
      'zh': `${BASE_URL}/zh`,
      'ja': `${BASE_URL}/ja`,
      'fr': `${BASE_URL}/fr`,
      'x-default': BASE_URL,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

// JSON-LD Organization + WebSite schema
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VSQ.News',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  sameAs: [
    'https://www.venturesquare.net',
    'https://twitter.com/venturesquare',
  ],
  description: 'Multilingual startup and technology news platform powered by VentureSquare.',
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VSQ.News',
  url: BASE_URL,
  description: 'Korea startup and tech news in 5 languages',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['ko', 'en', 'zh', 'ja', 'fr'],
  publisher: {
    '@type': 'Organization',
    name: 'VSQ.News',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.svg`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <link rel="alternate" type="application/rss+xml" title="VSQ.News EN" href="https://www.venturesquare.net/en/feed" />
        <link rel="alternate" type="application/rss+xml" title="VSQ.News KO" href="https://www.venturesquare.net/feed" />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
