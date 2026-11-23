import type { CSSProperties, ReactNode } from 'react';
import { T } from '../../ui/T';
import { chapterCss } from './chapter-css';
import { ChapterFit } from './ChapterFit';
import { validateChapter, type ChapterSpec } from './spec';

/*
  Chapter — one section as a scroll track (DesignRules.md §4.1, §9.7).

    section.chapter        view timeline of the chapter; beat timelines in scope
      a.skip-chapter       to the next chapter
      div.stage            the station, sticky fullscreen (split stage on mobile)
      div.stage-front      occluder copies above the sheets (Emerge beats)
      div.flow             arrival spacer + beats in document flow
      style                generated from the station's spec

  Server Component. Without scroll-driven support, under reduced motion, on
  short screens or when a sheet is too tall (ChapterFit), the same markup lays
  out as the stacked studio: framed station, then the sheets.
*/

export function Chapter({
  spec,
  labelledBy,
  studio,
  stage,
  front,
  next,
  eqbot,
  children,
}: {
  spec: ChapterSpec;
  labelledBy: string;
  studio: string;
  stage: ReactNode;
  front?: ReactNode;
  next?: { id: string; en: string; idn: string };
  eqbot?: string;
  children: ReactNode;
}) {
  validateChapter(spec);
  const { frames: f, theatre: t, theatreMobile: m } = spec;
  const vars = {
    '--tw': t.w,
    '--th': t.h,
    '--tx': t.x - f.desktop.x,
    '--ty': t.y - f.desktop.y,
    '--fw': f.desktop.w,
    '--twm': m.w,
    '--thm': m.h,
    '--txm': m.x - f.mobile.x,
    '--tym': m.y - f.mobile.y,
    '--fwm': f.mobile.w,
  } as CSSProperties;

  return (
    <section id={spec.id} data-studio={studio} data-lane={spec.lane} aria-labelledby={labelledBy} className="chapter" style={vars}>
      {next && (
        <a href={`#${next.id}`} className="skip-chapter sr-only focus:not-sr-only">
          <T en={`Skip to ${next.en}`} id={`Lewati ke ${next.idn}`} />
        </a>
      )}
      <div className="stage" aria-hidden="true" data-eqbot={eqbot} data-eqbot-at={eqbot ? 'above' : undefined}>
        <div className="stage-canvas">{stage}</div>
      </div>
      {front && (
        <div className="stage-front" aria-hidden="true">
          <div className="stage-canvas">{front}</div>
        </div>
      )}
      <div className="flow">
        <div className="beat-arrive" aria-hidden="true" />
        {children}
      </div>
      <style>{chapterCss(spec)}</style>
      <ChapterFit />
    </section>
  );
}

/** One beat: a small paper sheet in document flow (§4.4). `steps` children carry `data-step`. */
export function Beat({ id, flow = false, children, className = '' }: { id: string; flow?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className="beat" data-beat={id} data-flow={flow || undefined}>
      <div className={`beat-sheet paper-sheet border border-line bg-raised ${className}`}>{children}</div>
    </div>
  );
}
