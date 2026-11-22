'use client';

import { useLanguage } from '../../context/LanguageContext';
import { pageSections } from '../../data/sections';
import { useStudio } from './StudioProvider';

/*
  Vertical paper index 01–06 at ≥ 1440 px (DesignRules.md §4 StudioRail).
  Each index is a link; the hairline progress rule is a CSS scroll-driven
  animation (.studio-rail-track), so scrolling never touches React.
*/
export function StudioRail() {
  const { language, say } = useLanguage();
  const { activeId } = useStudio();
  const current = pageSections.find((section) => section.id === activeId) ?? pageSections[0];

  return (
    <nav className="studio-rail" aria-label={say('On this page', 'Di halaman ini')}>
      <ol className="flex flex-col gap-2">
        {pageSections.map((section) => {
          const here = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={here ? 'location' : undefined}
                aria-label={language === 'en' ? section.en : section.idn}
                className={`font-mono text-[11px] tracking-[0.14em] ${here ? 'text-accent' : 'text-muted hover:text-ink'}`}
              >
                {section.index}
              </a>
            </li>
          );
        })}
      </ol>
      <p className="studio-rail-label" aria-hidden="true">
        {language === 'en' ? current.en : current.idn}
      </p>
      <div className="studio-rail-track" aria-hidden="true">
        <span />
      </div>
    </nav>
  );
}
