'use client';

import { useLanguage } from '../../context/LanguageContext';
import { cvFile, heroHighlights, heroIntro, workExperience } from '../../data/portfolio';
import { displayCase } from '../../lib/display-case';
import { PaperDeskStage } from '../scene/PaperDeskStage';

/*
  `01` #home — front-desk diorama and open laptop (DesignRules.md §4).
  One component for every width: text first, then the stage (or, under 768 px,
  the compact laptop card). Sticky on tall desktops so the About sheet slides over.
*/

const current = workExperience[0];

export default function Hero({ onViewProjects }: { onViewProjects?: () => void }) {
  const { language, t } = useLanguage();

  return (
    <section id="home" data-studio="folio" className="hero-sticky border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-24 pb-12 lg:px-8 xl:min-h-svh xl:grid-cols-12 xl:items-center xl:gap-12 xl:pt-24">
        <div className="xl:col-span-5">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            01 — Software Engineer
          </p>
          <h1 className="font-serif text-6xl font-medium leading-[0.92] tracking-tight text-ink sm:text-7xl">
            Rifqi
            <span className="block">
              Haikal
              <span data-eqbot="home-name" data-eqbot-at="end" className="inline-block h-px w-px" aria-hidden="true" />
            </span>
          </h1>

          <p data-eqbot="home-role" data-eqbot-at="end" className="mt-6 font-serif text-xl italic text-ink">
            {displayCase(language === 'en' ? current.title : current.titleId)}
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="mt-3 max-w-md text-muted">{language === 'en' ? heroIntro.en : heroIntro.id}</p>

          <ul className="mt-7 grid max-w-md grid-cols-2 gap-2">
            {heroHighlights.map((item) => (
              <li key={item.label} className="ticket border border-line bg-raised px-5 py-3">
                <p className="font-serif text-2xl leading-none text-ink">{item.value}</p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {t(item.label, item.labelId)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onViewProjects} className="btn-primary-custom min-h-11">
              {t('View projects', 'Lihat projek')}
            </button>
            {cvFile && (
              <a href={cvFile} download className="btn-outline-custom min-h-11">
                {t('Download CV', 'Unduh CV')}
              </a>
            )}
          </div>
        </div>

        <div className="xl:col-span-7">
          <PaperDeskStage onOpenProjects={onViewProjects} />
        </div>
      </div>
    </section>
  );
}
