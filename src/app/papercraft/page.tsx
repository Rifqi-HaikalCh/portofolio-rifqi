import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WallLayer } from '../../components/scene/layers/WallLayer';
import { DeskLayer } from '../../components/scene/layers/DeskLayer';
import { FrontLayer } from '../../components/scene/layers/FrontLayer';
import { LampArt } from '../../components/scene/LampArt';
import { RifqiFigurine } from '../../components/scene/RifqiFigurine';
import { FIGURINE, SCREEN, stageBox } from '../../components/scene/stage-geometry';
import { ThemeSwitch } from './ThemeSwitch';

/*
  Asset review sheet for Phase 2 (DesignRules.md §16). Development only:
  production builds return 404, and the page is never indexed.
*/

export const metadata: Metadata = {
  title: 'Papercraft assets',
  robots: { index: false, follow: false },
};

const layer = 'absolute inset-0 h-full w-full pointer-events-none';

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{children}</p>;
}

export default function PapercraftPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <Label>Phase 2 · asset review</Label>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink">The Architect&apos;s Paper Desk</h1>
          <p className="mt-2 max-w-xl text-muted">
            Every layer shares one 1600×1000 stage. Switch the theme to move the light from the window to the lamp.
          </p>
        </div>
        <ThemeSwitch />
      </header>

      <section aria-label="Assembled stage" className="mb-14">
        <Label>Assembled stage · L1 wall → L2 desk, laptop, figurine, lamp → L3 props</Label>
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
          <WallLayer className={layer} />
          <DeskLayer className={layer} />
          <div className="absolute" style={stageBox(FIGURINE)}>
            <RifqiFigurine className="h-full w-full" />
          </div>
          <LampArt className={layer} />
          <FrontLayer className={layer} />
          {/* Where LaptopScreenUI will render real HTML in Phase 3. */}
          <div
            className="absolute grid place-items-center border border-dashed border-blueprint/60 font-mono text-[11px] uppercase tracking-[0.14em] text-blueprint"
            style={stageBox(SCREEN)}
          >
            screen · semantic HTML (Phase 3)
          </div>
        </div>
      </section>

      <section aria-label="Individual assets" className="grid gap-8 md:grid-cols-3">
        <div>
          <Label>Figurine poster</Label>
          <div className="grid place-items-center border border-line bg-raised p-6">
            <RifqiFigurine className="h-80 w-auto" title="Paper figurine of Rifqi Haikal" />
          </div>
        </div>
        <div>
          <Label>EQbot avatar · same drawing, head crop</Label>
          <div className="grid place-items-center gap-6 border border-line bg-raised p-6">
            <span className="block h-28 w-28">
              <span className="eqbot-face-clip border border-line bg-paper">
                <RifqiFigurine crop="head" className="h-full w-full" />
              </span>
            </span>
            <span className="block h-10 w-10">
              <span className="eqbot-face-clip border border-line bg-paper">
                <RifqiFigurine crop="head" className="h-full w-full" />
              </span>
            </span>
          </div>
        </div>
        <div>
          <Label>Layer budget</Label>
          <ul className="space-y-2 border border-line bg-raised p-6 font-mono text-xs text-muted">
            <li>L1 WallLayer · inline SVG</li>
            <li>L2 DeskLayer + LampArt · inline SVG</li>
            <li>L3 FrontLayer · inline SVG</li>
            <li>Figurine · inline SVG, GLB in Phase 3</li>
            <li>Fills: tokens only (§5.2)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
