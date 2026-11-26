'use client';

import { useLanguage } from '../../context/LanguageContext';
import { EQBOT_OPEN_EVENT, FIGURINE_LOOK_EVENT, emit } from './scene-events';

/*
  The laptop screen as real HTML (DesignRules.md §4 `01`, §9.1).
  On ≥ 768 px it sits exactly on the drawn glass (positioned by the parent with
  --screen-* variables); below that it is a compact paper laptop card.
  Copy arrives as props from the server (built from portfolio.ts there), so
  this client leaf never ships the content file. The status renders only if set.
*/

export interface ScreenData {
  role: { en: string; id: string };
  company: string;
  location: string;
  status?: { en: string; id: string };
  stack: string[];
}

export function LaptopScreenUI({ className = '', screen }: { className?: string; screen: ScreenData }) {
  const { language, t, say } = useLanguage();
  const status = screen.status;
  const look = () => emit(FIGURINE_LOOK_EVENT);

  return (
    <section
      aria-label={say('Laptop screen: current role', 'Layar laptop: peran saat ini')}
      className={`laptop-screen ${className}`}
      onPointerEnter={look}
      onFocus={look}
    >
      <div className="flex h-full flex-col overflow-hidden border border-line bg-raised text-ink">
        <p className="flex items-center justify-between border-b border-line bg-recess px-3 py-1 font-mono text-[0.6875rem] text-muted">
          <span>rifqi.profile</span>
          <span className="text-accent" aria-hidden="true">01</span>
        </p>

        <div className="flex min-h-0 flex-1 flex-col justify-between gap-2 px-3 py-2">
          <div className="space-y-1">
            {status && (
              <p data-eqbot="home-available" data-eqbot-at="end" className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                <span className="status-dot" aria-hidden="true" />
                {language === 'en' ? status.en : status.id}
                <span className="text-muted"> · {screen.location}</span>
              </p>
            )}
            <p className="font-serif text-[clamp(13px,5.4cqw,19px)] leading-tight text-ink">
              {language === 'en' ? screen.role.en : screen.role.id}
            </p>
            <p className="screen-company font-mono text-[0.6875rem] leading-snug text-muted">{screen.company}</p>
          </div>

          <ul aria-label={say('Core stack', 'Stack inti')} className="flex max-h-[17px] flex-wrap gap-1 overflow-hidden">
            {screen.stack.map((name) => (
              <li key={name} className="border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-muted">
                {name}
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <a
              href="#projects"
              className="inline-flex min-h-7 flex-1 items-center justify-center border border-ink bg-ink px-2 text-[0.8125rem] font-medium text-paper hover:border-accent hover:bg-accent"
            >
              {t('Open projects', 'Buka proyek')}
            </a>
            <button
              type="button"
              onClick={() => emit(EQBOT_OPEN_EVENT)}
              className="min-h-7 flex-1 border border-ink px-2 text-[0.8125rem] font-medium text-ink hover:bg-ink hover:text-paper"
            >
              {t('Ask EQbot', 'Tanya EQbot')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
