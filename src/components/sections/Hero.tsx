import { cvFile, heroHighlights, heroIntro, workExperience } from '../../data/portfolio';
import { displayCase } from '../../lib/display-case';
import { heroScreen } from '../../lib/hero-screen';
import { MobileDiorama } from '../scene/MobileDiorama';
import { PaperDeskStage } from '../scene/PaperDeskStage';
import { RifqiFigurine } from '../scene/RifqiFigurine';
import { T } from '../ui/T';

/*
  `01` #home — front-desk diorama and open laptop (DesignRules.md §4).
  Server component: the headline, tickets and buttons are plain HTML on first
  paint. Only the stage (parallax, lamp, figurine) is a client leaf. Sticky on
  tall desktops so the About sheet slides over.
*/
export function Hero() {
  const current = workExperience[0];

  return (
    <section id="home" data-studio="folio" aria-labelledby="home-title" className="hero-sticky border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-24 lg:px-8 xl:min-h-svh xl:grid-cols-12 xl:items-center xl:gap-12 xl:pt-24">
        <div className="xl:col-span-5">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
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
            {heroHighlights.map((item) => (
              <li key={item.label} className="ticket border border-line bg-raised px-5 py-3">
                <p className="font-serif text-2xl leading-none text-ink">{item.value}</p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
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

        <div className="xl:col-span-7">
          <PaperDeskStage screen={heroScreen()} poster={<RifqiFigurine crop="stage" pose="seated" className="h-full w-full" />}
            mobile={<MobileDiorama />}
          />
        </div>
      </div>
    </section>
  );
}
