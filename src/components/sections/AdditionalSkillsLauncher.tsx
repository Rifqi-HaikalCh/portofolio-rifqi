'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../ui/T';

/* The dialog and its skill catalogue load on first open, never with the page. */
const AdditionalSkillsDialog = dynamic(() => import('../shared/AdditionalSkillsDialog'), { ssr: false });

export function AdditionalSkillsLauncher() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="index-card group flex min-h-11 w-full items-center justify-between gap-4 border border-line p-5 text-left"
      >
        <span>
          <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
            <T en="Language · Framework" id="Bahasa · Framework" />
          </span>
          <span className="mt-1 block font-serif text-xl text-ink">
            <T en="Additional skills, counted from real work" id="Keterampilan tambahan, dihitung dari karya nyata" />
          </span>
        </span>
        <ArrowUpRight size={18} className="shrink-0 text-ink" aria-hidden="true" />
      </button>
      {open && <AdditionalSkillsDialog language={language} onClose={() => setOpen(false)} />}
    </>
  );
}
