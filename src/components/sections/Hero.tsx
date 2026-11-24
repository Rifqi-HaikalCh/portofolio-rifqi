import type { CSSProperties } from 'react';
import { cvFile, heroHighlights, heroIntro, workExperience } from '../../data/portfolio';
import { displayCase } from '../../lib/display-case';
import { heroScreen } from '../../lib/hero-screen';
import { RifqiFigurine } from '../scene/RifqiFigurine';
import { DeskStation } from '../scenes/desk/DeskStation';
import { T } from '../ui/T';

/*
  `01` #home — The Desk station (DesignRules.md §2.2, §4.3).
  Server component: the headline, tickets and buttons are plain HTML on first
  paint. The station's art is server-rendered; only the pointer look, lamp,
  figurine and laptop screen are client leaves. On tall desktops it
  leaves by the push-in and pan right to the pinboard (scene.css `01 → 02`).
*/
export function Hero() {
  const current = workExperience[0];

  return (
    <section id="home" data-studio="folio" aria-labelledby="home-title" className="hero-sticky border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-24 min-[1680px]:max-w-[min(92vw,100rem)] lg:min-h-svh lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:pt-24 xl:gap-12">
        <div className="hero-title lg:col-span-5">
          <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-accent">
            <span className="stamp">01</span> — Software Engineer
          </p>
          <h1 id="home-title" className="font-serif text-6xl font-medium leading-[0.92] tracking-tight text-ink sm:text-7xl">
            Rifqi
            <span className="block">
              Haikal
              <span data-eqbot="home-name" data-eqbot-at="end" className="inline-block h-px w-px" aria-hidden="true" />
            </span>
          </h1>

          <p data-eqbot="home-role" data-eqbot-at="end" className="mt-6 font-serif text-xl italic text-ink">
            <T en={displayCase(current.title)} id={displayCase(current.titleId ?? current.title)} />
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="mt-3 max-w-md text-muted">
            <T en={heroIntro.en} id={heroIntro.id} />
          </p>

          <ul className="mt-7 grid max-w-md grid-cols-2 gap-2">
            {heroHighlights.map((item, i) => (
              <li key={item.label} className="ticket border border-line bg-raised px-5 py-3" style={{ '--i': i } as CSSProperties}>
                <p className="font-serif text-2xl leading-none text-ink">{item.value}</p>
                <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                  <T en={item.label} id={item.labelId} />
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn-primary-custom min-h-11">
              <T en="View projects" id="Lihat proyek" />
            </a>
            {cvFile && (
              <a href={cvFile} download className="btn-outline-custom min-h-11">
                <T en="Download CV" id="Unduh CV" />
              </a>
            )}
          </div>
        </div>

        <div className="hero-desk lg:col-span-7">
          <DeskStation screen={heroScreen()} poster={<RifqiFigurine crop="stage" pose="seated" className="h-full w-full" />} />
        </div>
      </div>
    </section>
  );
}
