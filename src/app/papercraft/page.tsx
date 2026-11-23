import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RifqiFigurine } from '../../components/scene/RifqiFigurine';
import { FigurineSlot } from '../../components/scene/FigurineSlot';
import { PaperDeskStage } from '../../components/scene/PaperDeskStage';
import { EXPRESSIONS, POSES, type PoseId } from '../../components/scene/figurine-parts';
import { heroScreen } from '../../lib/hero-screen';
import { ThemeSwitch } from './ThemeSwitch';

/*
  Asset review sheet (DesignRules.md §16, docs/art-motion-upgrade.md §6).
  Development only: production builds return 404, and the page is never indexed.
*/

export const metadata: Metadata = {
  title: 'Papercraft assets',
  robots: { index: false, follow: false },
};

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{children}</p>;
}

const poses = Object.keys(POSES) as PoseId[];

export default function PapercraftPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <Label>P6.1 · paper puppet review</Label>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink">The Architect&apos;s Paper Desk</h1>
          <p className="mt-2 max-w-xl text-muted">
            One set of parts (figurine-parts.ts) draws every view. Switch the theme to move the light from the window to
            the lamp; the fold planes follow it.
          </p>
        </div>
        <ThemeSwitch />
      </header>

      <section aria-label="Figurine poses" className="mb-14">
        <Label>Poses · same parts, different joint angles</Label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {poses.map((pose) => (
            <figure key={pose} className="border border-line bg-raised p-4" data-review-pose={pose}>
              <RifqiFigurine pose={pose} className="mx-auto h-80 w-auto" title={`Figurine, ${pose} pose`} />
              <figcaption className="mt-3 text-center font-mono text-xs text-muted">{pose}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-label="Expressions" className="mb-14 grid gap-8 lg:grid-cols-2">
        <div>
          <Label>Expressions · head crop (EQbot avatar)</Label>
          <div className="flex flex-wrap gap-4 border border-line bg-raised p-6">
            {EXPRESSIONS.map((expression) => (
              <figure key={expression} className="text-center" data-review-expression={expression}>
                <span className="block h-28 w-28">
                  <span className="eqbot-face-clip border border-line bg-paper">
                    <RifqiFigurine crop="head" expression={expression} className="h-full w-full" />
                  </span>
                </span>
                <figcaption className="mt-2 font-mono text-xs text-muted">{expression}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div>
          <Label>Avatar at real sizes · 56 / 40 px</Label>
          <div className="flex items-center gap-6 border border-line bg-raised p-6">
            {[56, 40].map((size) => (
              <span key={size} className="block" style={{ width: size, height: size }}>
                <span className="eqbot-face-clip border border-line bg-paper">
                  <RifqiFigurine crop="head" className="h-full w-full" />
                </span>
              </span>
            ))}
            <div className="ml-6 w-40 border border-line bg-(--ill-wall)">
              <RifqiFigurine crop="bust" className="h-full w-full" title="About bust portrait" />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Assembled stage" className="mb-14">
        <Label>Assembled stage · L1 wall → L2 desk, laptop, figurine, lamp → L3 props · move the pointer for parallax</Label>
        <PaperDeskStage screen={heroScreen()} poster={<RifqiFigurine crop="stage" pose="seated" className="h-full w-full" />} />
      </section>

      <section aria-label="Poster and 3D" className="grid gap-8 md:grid-cols-2">
        <div>
          <Label>Figurine poster · seated hero frame</Label>
          <div className="grid place-items-center border border-line bg-raised p-6">
            <RifqiFigurine crop="stage" pose="seated" className="h-[600px] w-auto" title="Paper figurine of Rifqi Haikal" />
          </div>
        </div>
        <div>
          <Label>Figurine 3D · seated hero frame · hover the laptop on the stage for the look clip · ?webgl=off for the fallback</Label>
          <div className="grid place-items-center border border-line bg-raised p-6">
            <div className="h-[600px] w-[420px]">
              <FigurineSlot
                title="3D paper figurine of Rifqi"
                poster={<RifqiFigurine crop="stage" pose="seated" className="h-full w-full" />}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
