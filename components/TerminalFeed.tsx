'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Article, Lang } from '@/lib/types';

interface Props {
  articles: Article[];
  lang: Lang;
}

function formatTime(isoDate: string): string {
  if (!isoDate) return '--:--';
  const d = new Date(isoDate);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-CA'); // YYYY-MM-DD
}

export default function TerminalFeed({ articles, lang }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cursor, setCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate articles appearing one by one
  useEffect(() => {
    setVisibleCount(0);
    const total = articles.length;
    if (total === 0) return;

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= total) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, [articles]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const articleSlugBase = lang === 'ko' ? '' : `/${lang}`;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin"
      style={{ scrollbarColor: '#333 #0a0a0a' }}
    >
      <div className="text-[#666] mb-4 text-xs">
        <span className="text-[#00ff41]">vsq@news</span>
        <span className="text-white">:</span>
        <span className="text-[#4a9eff]">~/{lang}</span>
        <span className="text-white">$ </span>
        <span>fetch --feed {lang} --delay 1h</span>
      </div>

      {articles.slice(0, visibleCount).map((article, i) => (
        <div key={article.slug} className="mb-1 group">
          <Link
            href={`${articleSlugBase}/${article.slug}`}
            className="flex gap-3 items-start hover:bg-white/5 px-1 py-0.5 rounded transition-colors"
          >
            <span className="text-[#666] shrink-0 text-xs mt-0.5">
              {formatDate(article.isoDate)}
            </span>
            <span className="text-[#666] shrink-0 text-xs mt-0.5">
              {formatTime(article.isoDate)}
            </span>
            <span
              className="shrink-0 text-xs mt-0.5 px-1 border"
              style={{
                color: getCategoryColor(i),
                borderColor: getCategoryColor(i),
              }}
            >
              {article.category.toUpperCase().slice(0, 12)}
            </span>
            <span className="text-white group-hover:text-[#00ff41] transition-colors line-clamp-1">
              {article.title}
            </span>
          </Link>
        </div>
      ))}

      {visibleCount < articles.length && (
        <div className="text-[#666] text-xs mt-2">
          Loading... {visibleCount}/{articles.length}
        </div>
      )}

      {visibleCount >= articles.length && articles.length > 0 && (
        <div className="mt-2 text-[#666] text-xs">
          <span className="text-[#00ff41]">vsq@news</span>
          <span className="text-white">:</span>
          <span className="text-[#4a9eff]">~/{lang}</span>
          <span className="text-white">$ </span>
          <span className={cursor ? 'opacity-100' : 'opacity-0'}>█</span>
        </div>
      )}

      {articles.length === 0 && (
        <div className="text-[#666] text-sm">
          No articles found. Check back later.
          <span className={`ml-1 ${cursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
        </div>
      )}
    </div>
  );
}

function getCategoryColor(index: number): string {
  const colors = ['#ffff00', '#00bfff', '#ff6b6b', '#b9ff66', '#ff9f43', '#a29bfe'];
  return colors[index % colors.length];
}
