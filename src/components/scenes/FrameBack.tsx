import { circle, paperKit, rect } from '../../lib/paper-kit';
import { svgString } from '../../lib/paper-kit/svg-string';

/*
  Footer — the back of the frame (DesignRules.md §2.2, §4.3 Footer): the kraft
  backing board seen from behind, with the hanging wire between two D-rings
  and a colophon label. Decorative; the colophon text is the HTML below it.
*/
export function FrameBack() {
  const k = paperKit('back');
  return (
    <svg
      viewBox="0 0 1600 120"
      preserveAspectRatio="xMidYMax slice"
      className="block h-[clamp(64px,7vw,112px)] w-full"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{
        __html: svgString(
          <>
      {k.sheet({ d: rect(-20, 0, 1640, 140), fill: 'var(--ill-kraft)', edge: 0, rim: false, material: 'kraft' })}
      {/* Staples holding the board into the frame, along the top edge. */}
      <path d={Array.from({ length: 16 }, (_, i) => `M${50 + i * 100} 14h18`).join('')} stroke="var(--ill-kraft-dark)" strokeWidth="4" />
      {[300, 1300].map((x) => (
        <g key={x}>
          {k.sheet({ d: rect(x - 16, 40, 32, 22, 3), fill: 'var(--ill-lamp)', gap: 10, edge: 2 })}
          {k.sheet({ d: circle(x, 51, 4), fill: 'var(--ill-kraft-dark)', gap: 0, edge: 0, rim: false, material: 'none' })}
        </g>
      ))}
      <path d="M300 62Q800 26 1300 62" fill="none" stroke="var(--ill-bezel)" strokeWidth="3" />
      <path d="M300 60Q800 24 1300 60" fill="none" stroke="var(--paper-cut)" strokeWidth="1" />
      <g transform="rotate(-1.5 1460 70)">
        {k.sheet({ d: rect(1400, 44, 130, 64, 1), fill: 'var(--ill-page)', gap: 12, edge: 1.5 })}
        <path d="M1414 62H1514M1414 76H1490M1414 90H1500" stroke="var(--ill-page-muted)" strokeWidth="3" opacity="0.55" />
      </g>
          </>,
        ),
      }}
    />
  );
}
