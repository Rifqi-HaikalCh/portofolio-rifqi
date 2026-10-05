'use client';
import React, { useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import type { Experience as ExperienceType } from '../../types';
import { ExperienceDetailDialog } from '../shared/ProjectDetailDialog';
import { calculateTotalExperience } from '../../lib/experience-utils';
import { useLedgerRise } from '../shared/useLedgerRise';

export const MobileExperience: React.FC = () => {
  const { language } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'organization'>('work');

  const experiences = activeTab === 'work' ? workExperience : organizationExperience;
  const totalExp = useMemo(() => calculateTotalExperience(workExperience), []);
  const t = (en: string, id: string) => (language === 'en' ? en : id);
  const listRef = useRef<HTMLOListElement>(null);
  useLedgerRise(listRef, activeTab);

  return (
    <section id="experience" data-studio="ledger" className="py-16 px-5 border-b border-line bg-paper">
      <header className="mb-12">
        <p className="font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent mb-3">
          {t('Professional Journey', 'Perjalanan Profesional')}
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight text-ink">
          {t('Experience', 'Pengalaman')}
        </h2>
      </header>

      <p data-eqbot="experience-total" data-eqbot-at="above" className="mb-8">
        <span className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent">
          {t('Total Work Experience', 'Total Pengalaman Kerja')}
        </span>
        <span className="mt-1 block font-serif text-2xl text-ink">
          {totalExp.years} {t('Years', 'Tahun')} {totalExp.months} {t('Months', 'Bulan')}
        </span>
      </p>

      <div data-eqbot="experience-tabs" data-eqbot-at="above" className="inline-flex border border-line mb-8" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'work'}
          onClick={() => setActiveTab('work')}
          className={`px-4 py-3 text-sm ${activeTab === 'work' ? 'bg-ink text-paper' : 'text-muted'}`}
        >
          {t('Work', 'Kerja')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'organization'}
          onClick={() => setActiveTab('organization')}
          className={`px-4 py-3 text-sm border-l border-line ${activeTab === 'organization' ? 'bg-ink text-paper' : 'text-muted'}`}
        >
          {t('Organizations', 'Organisasi')}
        </button>
      </div>

      <ol ref={listRef} className="border-t border-line">
        {experiences.map((exp) => (
          <li key={exp.id} className="ledger-item border-b border-line">
            <article
              tabIndex={0}
              onClick={() => setSelectedExp(exp)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedExp(exp);
                }
              }}
              className="row-open w-full cursor-pointer py-6"
            >
              <p className="font-jetbrains-mono text-[11px] tracking-[0.14em] uppercase text-accent">{exp.period}</p>
              {exp.location && <p className="mt-2 text-sm text-muted">{exp.location}</p>}
              {exp.logo && (
                <img src={exp.logo} alt="" className="mt-4 h-8 w-auto max-w-full object-contain object-left" />
              )}
              {exp.companyType && (
                <p className="mt-3 font-jetbrains-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                  {t(exp.companyType, exp.companyTypeId || exp.companyType)}
                </p>
              )}
              <h3 className="row-open-title mt-1 font-serif text-xl font-medium text-ink leading-snug">{t(exp.title, exp.titleId || exp.title)}</h3>
              <p className="mt-1 text-sm text-ink">{exp.company}</p>
              {exp.positionDetail && <p className="mt-1 text-sm text-muted">{t(exp.positionDetail, exp.positionDetailId || exp.positionDetail)}</p>}
              <p className="mt-3 text-sm text-muted leading-relaxed">{t(exp.shortDescription, exp.shortDescriptionId || exp.shortDescription)}</p>
              <span className="btn-outline-custom row-open-action mt-4">
                {t('Explore details', 'Lihat detail')}
              </span>
            </article>
          </li>
        ))}
      </ol>

      {selectedExp && (
        <ExperienceDetailDialog exp={selectedExp} language={language} onClose={() => setSelectedExp(null)} />
      )}
    </section>
  );
};
