'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { scrollToStudioSection, studioSections, useStudio } from './StudioProvider';

export function StudioRail() {
  const { language } = useLanguage();
  const { activeId, progress } = useStudio();
  const index = studioSections.filter((section) => section.id !== 'projects');
  const current = studioSections.find((section) => section.id === activeId) ?? studioSections[0];
  const label = language === 'en' ? current.en : current.idn;

  return (
    <nav className="studio-rail" aria-label={language === 'en' ? 'On this page' : 'Di halaman ini'}>
      <ol className="flex flex-col gap-2">
        {index.map((section) => {
          const currentSection = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToStudioSection(section.id)}
                aria-current={currentSection ? 'true' : undefined}
                className={`font-jetbrains-mono text-[11px] tracking-[0.14em] ${
                  currentSection ? 'text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {section.index}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="studio-rail-label">{label}</p>
      <div className="studio-rail-track" aria-hidden="true">
        <span style={{ height: `${Math.round(progress * 100)}%` }} />
      </div>
    </nav>
  );
}
