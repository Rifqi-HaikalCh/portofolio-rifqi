'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import type { Experience as ExperienceType } from '../../types';
import { ExperienceDetailDialog } from '../shared/ProjectDetailDialog';
import { calculateTotalExperience } from '../../lib/experience-utils';
import { useLedgerRise } from '../shared/useLedgerRise';

export const Experience: React.FC = () => {
  const { language } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'organization'>('work');

  const experiences = activeTab === 'work' ? workExperience : organizationExperience;
  const totalExp = useMemo(() => calculateTotalExperience(workExperience), []);
  const t = (en: string, id: string) => (language === 'en' ? en : id);
  const listRef = useRef<HTMLOListElement>(null);
  useLedgerRise(listRef, activeTab);

  return (
    <section id="experience" data-studio="ledger" className="py-12 md:py-16 border-b border-line bg-paper">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <AnimatedSectionTitle
          badge={t('Professional Journey', 'Perjalanan Profesional')}
          title={t('My Experience', 'Pengalaman Saya')}
          subtitle={t(
            'A chronological journey through my professional milestones and technical impact.',
            'Perjalanan kronologis melalui pencapaian profesional dan dampak teknis saya.'
          )}
        />

        <p data-eqbot="experience-total" data-eqbot-at="above" className="text-center mb-10">
          <span className="font-jetbrains-mono text-[11px] tracking-[0.18em] uppercase text-accent">
            {t('Total Work Experience', 'Total Pengalaman Kerja')}
          </span>
          <span className="mt-2 block font-serif text-3xl text-ink">
            {totalExp.years} {t('Years', 'Tahun')} {totalExp.months} {t('Months', 'Bulan')}
          </span>
        </p>

        <div className="flex justify-center mb-12">
          <div data-eqbot="experience-tabs" data-eqbot-at="above" className="inline-flex border border-line" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'work'}
              onClick={() => setActiveTab('work')}
              className={`px-5 py-3 text-sm ${activeTab === 'work' ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
            >
              {t('Work', 'Kerja')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'organization'}
              onClick={() => setActiveTab('organization')}
              className={`px-5 py-3 text-sm border-l border-line ${activeTab === 'organization' ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
            >
              {t('Organizations', 'Organisasi')}
            </button>
          </div>
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
                className="row-open grid w-full cursor-pointer md:grid-cols-12 gap-4 md:gap-8 py-8"
              >
                <div className="md:col-span-3">
                  <p className="font-jetbrains-mono text-[11px] tracking-[0.14em] uppercase text-accent">{exp.period}</p>
                  {exp.location && <p className="mt-2 text-sm text-muted">{exp.location}</p>}
                  {exp.logo && (
                    <img src={exp.logo} alt="" className="mt-4 h-8 w-auto max-w-full object-contain object-left" />
                  )}
                </div>
                <div className="md:col-span-6">
                  {exp.companyType && (
                    <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-muted mb-2">
                      {t(exp.companyType, exp.companyTypeId || exp.companyType)}
                    </p>
                  )}
                  <h3 className="row-open-title font-serif text-2xl font-medium text-ink leading-snug">{t(exp.title, exp.titleId || exp.title)}</h3>
                  <p className="mt-1 text-ink">{exp.company}</p>
                  {exp.positionDetail && <p className="mt-1 text-sm text-muted">{t(exp.positionDetail, exp.positionDetailId || exp.positionDetail)}</p>}
                  <p className="mt-3 text-muted leading-relaxed">{t(exp.shortDescription, exp.shortDescriptionId || exp.shortDescription)}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="btn-outline-custom row-open-action">
                    {t('Explore details', 'Lihat detail')}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>

      {selectedExp && (
        <ExperienceDetailDialog exp={selectedExp} language={language} onClose={() => setSelectedExp(null)} />
      )}
    </section>
  );
};
