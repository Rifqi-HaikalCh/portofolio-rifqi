import { Children, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { T } from '../../ui/T';
import { chapterCss } from './chapter-css';
import { ChapterCue } from './ChapterCue';
import { ChapterFit } from './ChapterFit';
import { validateChapter, type ChapterSpec } from './spec';

/*
  Chapter — one section as a scroll track (DesignRules.md §4.1, §9.7).

    section.chapter        view timeline of the chapter (camera handoffs only)
      a.skip-chapter       to the next chapter
      div.stage            the station, sticky fullscreen (split stage on mobile)
      div.stage-front      occluder copies above the sheets (Emerge beats)
      div.flow
        div.beat-pins      the pinned beats
          div.beat-deck    sticky viewport layer: every pinned sheet, in reading order
          div.beat-track…  one scroll length per pinned beat (no content)
        div.beat[flow]…    long sheets that scroll as normal pages
      style                generated from the station's spec

  Pinned sheets never follow the scroll (§4.4, v3.3): scroll position only picks
  the active beat (ChapterCue), and the sheet then plays its whole entrance in
  time. Server Component. Without scroll-driven support, under reduced motion,
  on short screens or when a sheet is too tall (ChapterFit), the same markup
  lays out as the stacked studio: framed station, then the sheets.
*/

type BeatProps = { id: string; flow?: boolean; children: ReactNode; className?: string };

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

  const beats = Children.toArray(children).filter(
    (c): c is ReactElement<BeatProps> => isValidElement(c) && c.type === Beat,
  );
  const pinned = beats.filter((b) => !b.props.flow);
  const flowing = beats.filter((b) => b.props.flow);
  const holdOf = (id: string) => {
    const hold = spec.beats.find((b) => b.id === id)?.hold;
    if (typeof hold !== 'number') throw new Error(`Chapter "${spec.id}": beat ${id} is pinned in markup but not in its spec`);
    return hold;
  };

  return (
    <section id={spec.id} data-studio={studio} data-lane={spec.lane} aria-labelledby={labelledBy} className="chapter" style={vars} suppressHydrationWarning>
      {/*
        Theatre from the first frame (§9.6, v3.5): this runs while the HTML is parsed, before the
        chapter is laid out, so the page is never laid out and painted as the stacked studio and
        then again as the theatre after hydration (that second pass was ~0.8 s of style and layout
        at 4× CPU). Without JS it never runs and the stacked studio stays. ChapterCue sets the same
        attribute again on mount.
      */}
      <script dangerouslySetInnerHTML={{ __html: "document.currentScript.parentElement.setAttribute('data-cue','')" }} />
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
        {pinned.length > 0 && (
          <div className="beat-pins">
            <div className="beat-deck">{pinned}</div>
            <div className="beat-lead" aria-hidden="true" />
            {pinned.map((b) => (
              <div
                key={b.props.id}
                className="beat-track"
                data-track={b.props.id}
                aria-hidden="true"
                style={{ '--hold': holdOf(b.props.id) } as CSSProperties}
              />
            ))}
            <div className="beat-tail" aria-hidden="true" />
          </div>
        )}
        {flowing}
      </div>
      <style>{chapterCss(spec)}</style>
      <ChapterFit />
      <ChapterCue />
    </section>
  );
}

/** One beat: a small paper sheet (§4.4). `steps` children carry `data-step`. */
export function Beat({ id, flow = false, children, className = '' }: BeatProps) {
  return (
    <div className="beat" data-beat={id} data-flow={flow || undefined}>
      <div className={`beat-sheet paper-sheet paper-leaf border border-line bg-raised ${className}`}>{children}</div>
    </div>
  );
}
