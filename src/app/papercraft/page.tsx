import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RifqiFigurine } from '../../components/scene/RifqiFigurine';
import { FigurineSlot } from '../../components/scene/FigurineSlot';
import { PaperDeskStage } from '../../components/scene/PaperDeskStage';
import { heroScreen } from '../../lib/hero-screen';
import { ThemeSwitch } from './ThemeSwitch';

/*
  Asset review sheet for Phase 2 (DesignRules.md §16). Development only:
  production builds return 404, and the page is never indexed.
*/

export const metadata: Metadata = {
  title: 'Papercraft assets',
  robots: { index: false, follow: false },
};

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{children}</p>;
}

export default function PapercraftPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <Label>Phase 2–3 · asset review</Label>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink">The Architect&apos;s Paper Desk</h1>
          <p className="mt-2 max-w-xl text-muted">
            Every layer shares one 1600×1000 stage. Switch the theme to move the light from the window to the lamp.
          </p>
        </div>
        <ThemeSwitch />
      </header>

      <section aria-label="Assembled stage" className="mb-14">
        <Label>Assembled stage · L1 wall → L2 desk, laptop, figurine, lamp → L3 props · move the pointer for parallax</Label>
        <PaperDeskStage screen={heroScreen()} />
      </section>

      <section aria-label="Individual assets" className="grid gap-8 md:grid-cols-2">
        <div>
          <Label>Figurine poster</Label>
          <div className="grid place-items-center border border-line bg-raised p-6">
            <RifqiFigurine className="h-[600px] w-auto" title="Paper figurine of Rifqi Haikal" />
          </div>
        </div>
        <div>
          <Label>Figurine 3D · same framing, add ?webgl=off for the fallback</Label>
          <div className="grid place-items-center border border-line bg-raised p-6">
            <div className="h-[600px] w-[261px]">
              <FigurineSlot title="3D paper figurine of Rifqi" />
            </div>
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
            <li>Figurine · SVG poster first, procedural R3F mesh after idle (no GLB download)</li>
            <li>Fills: tokens only (§5.2)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
