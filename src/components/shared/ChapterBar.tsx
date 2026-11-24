'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { pageSections } from '../../data/sections';
import { useStudio } from './StudioProvider';

/*
  Chapter bar under the navbar, below 1024 px (DesignRules.md §4.2, §8): the
  chapter you are in and a one-tap link to the next one, over a reading
  progress hairline (CSS scroll-driven, like the StudioRail track). Shares the
  StudioProvider's one IntersectionObserver; hidden on the hero.
*/
export function ChapterBar() {
  const { language, say } = useLanguage();
  const { activeId } = useStudio();
  const at = pageSections.findIndex((section) => section.id === activeId);
  const current = pageSections[at] ?? pageSections[0];
  const next = pageSections[at + 1];
  const name = (s: (typeof pageSections)[number]) => (language === 'en' ? s.en : s.idn);

  return (
    <nav className="chapter-bar" data-hidden={activeId === 'home' || undefined} aria-label={say('Chapter', 'Bab')}>
      <p className="flex min-w-0 items-center gap-2 text-sm text-ink" aria-current="location">
        <span className="font-mono text-[0.6875rem] text-accent">{current.index}</span>
        <span>{name(current)}</span>
      </p>
      {next && (
        <a href={`#${next.id}`} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm text-muted hover:text-ink">
          <span className="sr-only">{say('Next chapter:', 'Bab berikutnya:')}</span>
          <span className="font-mono text-[0.6875rem] text-accent" aria-hidden="true">
            {next.index}
          </span>
          {name(next)}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      )}
      <span className="chapter-bar-track" aria-hidden="true" />
    </nav>
  );
}
