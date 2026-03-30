import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'VSQ.News — VentureSquare',
    template: '%s | VSQ.News',
  },
  description: 'VentureSquare news in Korean, English, Chinese, Japanese, and French.',
  metadataBase: new URL('https://vsq.news'),
  openGraph: {
    type: 'website',
    siteName: 'VSQ.News',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'zh_CN', 'ja_JP', 'fr_FR'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={jetbrainsMono.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
