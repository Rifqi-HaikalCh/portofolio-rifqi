import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RifqiFigurine } from '../../components/scene/RifqiFigurine';
import { FigurineSlot } from '../../components/scene/FigurineSlot';
import { DeskStation } from '../../components/scenes/desk/DeskStation';
import { PinboardStation } from '../../components/scenes/pinboard/PinboardStation';
import { CabinetStation } from '../../components/scenes/cabinet/CabinetStation';
import { DraftingStation } from '../../components/scenes/drafting/DraftingStation';
import { GalleryStation } from '../../components/scenes/gallery/GalleryStation';
import { ArchiveStation } from '../../components/scenes/archive/ArchiveStation';
import { MailStation } from '../../components/scenes/mail/MailStation';
import { FrameBack } from '../../components/scenes/FrameBack';
import { aboutHighlights, certificateCategories, organizationExperience, workExperience } from '../../data/portfolio';
import { PaperDefs, paperKit, rect, type Material } from '../../lib/paper-kit';
import { EXPRESSIONS, POSES, type PoseId } from '../../components/scene/figurine-parts';
import { heroScreen } from '../../lib/hero-screen';
import { ThemeSwitch } from './ThemeSwitch';

/*
  Asset review sheet (DesignRules.md §9.5, §16.2, §17.3).
  Development only: production builds return 404, and the page is never indexed.
*/

export const metadata: Metadata = {
  title: 'Papercraft assets',
  robots: { index: false, follow: false },
};

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">{children}</p>;
}

const poses = Object.keys(POSES) as PoseId[];

export default function PapercraftPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <Label>R2 · Paper Studio review</Label>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink">The Paper Studio</h1>
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

      <PaperDefs />
      <section aria-label="Paper material" className="mb-14">
        <Label>paper-kit material · five parts per sheet (shadow, cut wall, falloff, rim, grain) · gap 0 → 240 left to right</Label>
        <MaterialSheet />
      </section>

      <section aria-label="Desk station" className="mb-14">
        <Label>Station 01 · The Desk · 14 layers in depth bands · move the pointer for the camera look · scroll for the push</Label>
        <DeskStation screen={heroScreen()} poster={<RifqiFigurine crop="stage" pose="seated" className="h-full w-full" />} />
      </section>

      <section aria-label="Stations" className="mb-14 grid gap-10">
        <Label>R2 stations · 1600 × 640 strips · workday light: midday → afternoon → golden hour (light theme)</Label>
        <PinboardStation icons={aboutHighlights.map((item) => item.icon)} />
        <CabinetStation
          sets={[
            { name: 'work', years: workExperience.map((entry) => entry.period.match(/\d{4}/)?.[0] ?? '') },
            { name: 'organization', years: organizationExperience.map((entry) => entry.period.match(/\d{4}/)?.[0] ?? '') },
          ]}
        />
        <DraftingStation />
        <GalleryStation />
        <ArchiveStation binders={certificateCategories.map((c) => ({ label: c.id.toUpperCase(), count: c.certificates.length }))} />
        <MailStation />
        <CabinetStation sets={[]} pose="peer" name="drawer404" />
        <FrameBack />
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

function MaterialSheet() {
  const k = paperKit('review');
  const materials: { m: Material; fill: string }[] = [
    { m: 'cardstock', fill: 'var(--ill-page)' },
    { m: 'kraft', fill: 'var(--ill-pot)' },
    { m: 'cork', fill: 'var(--ill-cork)' },
    { m: 'wood', fill: 'var(--color-wood)' },
  ];
  const gaps = [0, 20, 60, 120, 240];
  return (
    <svg viewBox="0 0 1000 520" className="w-full border border-line bg-(--ill-wall)" aria-hidden="true">
      {materials.map(({ m, fill }, row) =>
        gaps.map((gap, col) => (
          <g key={`${m}-${gap}`}>{k.sheet({ d: rect(40 + col * 190, 30 + row * 122, 150, 86, 3), fill, gap, edge: 3, material: m })}</g>
        )),
      )}
    </svg>
  );
}
