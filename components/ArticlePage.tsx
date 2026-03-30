'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article, Lang, LANG_NAMES } from '@/lib/types';
import Logo from './Logo';

interface Props {
  article: Article;
  lang: Lang;
}

export default function ArticlePage({ article, lang }: Props) {
  const backHref = `/${lang}`;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-[#0a0a0a] px-4 py-3 flex items-center justify-between">
        <Link href={backHref}>
          <Logo />
        </Link>
        <span className="font-mono text-xs text-[#666]">{LANG_NAMES[lang]}</span>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-10" itemScope itemType="https://schema.org/NewsArticle">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-mono px-2 py-0.5 uppercase tracking-wider">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-gray-900"
          itemProp="headline"
        >
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 font-mono">
          <time dateTime={article.isoDate} itemProp="datePublished">
            {article.pubDate}
          </time>
          <span>·</span>
          <span>VentureSquare</span>
        </div>

        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              itemProp="image"
              unoptimized
            />
          </div>
        )}

        {/* Full article body */}
        {article.fullHtml ? (
          <div
            className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed
              prose-img:rounded-lg prose-img:w-full prose-img:my-6
              prose-a:text-blue-600 prose-a:underline
              prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8
              prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6
              prose-p:my-4 prose-p:leading-8"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: article.fullHtml }}
          />
        ) : article.excerpt ? (
          <div className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed" itemProp="description">
            <p>{article.excerpt}</p>
          </div>
        ) : null}

        {/* Read original */}
        <div className="border-t border-gray-200 pt-6 mb-10">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-[#00ff41] font-mono text-sm px-5 py-3 hover:bg-[#111] transition-colors"
          >
            원문 보기 →
          </a>
          <p className="mt-3 text-xs text-gray-400 font-mono">
            Full article at venturesquare.net
          </p>
        </div>

        {/* Schema.org hidden metadata */}
        <meta itemProp="author" content="VentureSquare" />
        <meta itemProp="publisher" content="VSQ.News" />
        <link itemProp="url" href={article.link} />
      </article>

      {/* Disqus */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <DisqusComments article={article} />
      </div>
    </div>
  );
}

function DisqusComments({ article }: { article: Article }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Comments</h2>
      <div id="disqus_thread" />
      <DisqusScript article={article} />
    </div>
  );
}

function DisqusScript({ article }: { article: Article }) {
  const shortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;
  if (!shortname) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var disqus_config = function () {
            this.page.url = "${article.link}";
            this.page.identifier = "${article.slug}";
          };
          (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://${shortname}.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
          })();
        `,
      }}
    />
  );
}
