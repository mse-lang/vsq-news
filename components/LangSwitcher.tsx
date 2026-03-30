'use client';

import Link from 'next/link';
import { Lang, LANG_LABELS } from '@/lib/types';

const LANGS: Lang[] = ['ko', 'en', 'zh', 'ja', 'fr'];

interface Props {
  currentLang: Lang;
}

export default function LangSwitcher({ currentLang }: Props) {
  return (
    <div className="flex gap-2 font-mono text-sm">
      {LANGS.map((lang) => (
        <Link
          key={lang}
          href={`/${lang}`}
          className={`px-2 py-0.5 border transition-colors ${
            currentLang === lang
              ? 'border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10'
              : 'border-[#333] text-[#666] hover:border-[#00ff41] hover:text-[#00ff41]'
          }`}
        >
          [{LANG_LABELS[lang]}]
        </Link>
      ))}
    </div>
  );
}
