import { pageSections } from '../../data/sections';
import { BrandLockup } from '../shared/BrandLockup';
import { T } from '../ui/T';
import { FooterControls } from './FooterControls';

/*
  Colophon in ink (DesignRules.md §4 Footer). Server component: the year is
  rendered at build/revalidate time, and the stack line names what this page
  is actually built with.
*/
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-studio="colophon" className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 lg:px-8">
        <p className="mb-12">
          <BrandLockup variant="horizontal" surface="ink" className="h-auto w-full max-w-md" label="Rifqi Haikal" />
        </p>

        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-paper/75">
              <T
                en="Software engineer in Jakarta, building enterprise .NET and SQL Server systems and the web interfaces on top of them."
                id="Software engineer di Jakarta, membangun sistem enterprise .NET dan SQL Server beserta antarmuka web di atasnya."
              />
            </p>
            <div className="mt-6">
              <FooterControls />
            </div>
          </div>

          <nav aria-labelledby="footer-index">
            <h2 id="footer-index" className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/75">
              <T en="Index" id="Indeks" />
            </h2>
            <ol className="grid gap-1">
              {pageSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="inline-flex min-h-11 items-center gap-3 text-sm text-paper/85 hover:text-paper">
                    <span className="font-mono text-[11px] text-paper/75">{section.index}</span>
                    <T en={section.en} id={section.idn} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/75">
              <T en="Colophon" id="Kolofon" />
            </h2>
            <p className="text-sm leading-relaxed text-paper/80">
              <T
                en="Built with Next.js, React and Tailwind CSS. The figurine is drawn in SVG and turned in three.js. Set in Fraunces, Source Sans 3 and JetBrains Mono."
                id="Dibangun dengan Next.js, React, dan Tailwind CSS. Figurin digambar dalam SVG dan diputar dengan three.js. Memakai huruf Fraunces, Source Sans 3, dan JetBrains Mono."
              />
            </p>
          </div>
        </div>

        <p className="mt-14 border-t border-paper/15 pt-6 text-xs text-paper/75">
          © {year} Rifqi Haikal Chairiansyah
        </p>
      </div>
    </footer>
  );
}
