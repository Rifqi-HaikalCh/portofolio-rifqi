import type { CSSProperties } from 'react';
import { SEAT, STAGE_FRAME, inkVar, type Expression, type PoseId } from './figurine-parts';
import { placeParts, type PlacedPart } from './figurine-rig';

/*
  Rifqi paper figurine — 2D views of the paper puppet (DesignRules.md §2.6,
  docs/art-motion-upgrade.md §2). Every view (hero poster, About bust, EQbot
  avatar, 404) draws the same parts from figurine-parts.ts, posed by
  figurine-rig.ts. No hooks: renders on the server.

  Each part's fold plane sits on the side away from the light: the window
  (left) by day, the lamp (right) at night, cross-faded by --light-x.
*/

export type FigurineCrop = 'stage' | 'full' | 'bust' | 'head';

const VIEWBOX: Record<FigurineCrop, string> = {
  stage: `${STAGE_FRAME.x} ${STAGE_FRAME.y} ${STAGE_FRAME.w} ${STAGE_FRAME.h}`,
  full: '0 0 200 460',
  bust: '24 8 152 152',
  head: '44 10 112 112',
};

const DAY = { opacity: 'calc((1 + var(--light-x)) / 2)' } as CSSProperties;
const NIGHT = { opacity: 'calc((1 - var(--light-x)) / 2)' } as CSSProperties;

/** Drops the spaces around path commands: same path, about a third fewer bytes. */
const tight = (d: string) => d.replace(/\s*([A-Za-z])\s*/g, '$1');

function Sheet({ part }: { part: PlacedPart }) {
  const transform = part.matrix || undefined;
  const line = !part.fill;
  return (
    <g transform={transform}>
      <path
        d={tight(part.d)}
        fill={part.fill ? inkVar(part.fill) : 'none'}
        stroke={line ? inkVar(part.stroke ?? 'hair') : part.cut ? 'var(--paper-cut)' : undefined}
        strokeWidth={line ? (part.strokeWidth ?? 1.5) : part.cut ? 1.2 : undefined}
        opacity={part.opacity}
      />
      {part.shade && (
        <>
          <path d={tight(part.shade.day)} fill="var(--paper-fold)" style={DAY} />
          <path d={tight(part.shade.night)} fill="var(--paper-fold)" style={NIGHT} />
        </>
      )}
    </g>
  );
}

export function RifqiFigurine({
  crop = 'full',
  pose = 'stand',
  expression,
  className = '',
  style,
  title,
}: {
  crop?: FigurineCrop;
  pose?: PoseId;
  expression?: Expression;
  className?: string;
  style?: CSSProperties;
  /** Provide only where the figurine carries meaning; otherwise it is decorative. */
  title?: string;
}) {
  const decorative = !title;
  const parts = placeParts(pose, expression);
  const grounded = crop === 'full' && pose !== 'seated';
  const seated = (crop === 'full' || crop === 'stage') && pose === 'seated';

  return (
    <svg
      viewBox={VIEWBOX[crop]}
      className={className}
      style={style}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={title}
      focusable="false"
      data-pose={pose}
    >
      {/* Contact shadow on the desk */}
      {grounded && <ellipse cx="100" cy="451" rx="66" ry="6" fill="var(--paper-shadow)" />}
      {seated && <ellipse cx={SEAT.x} cy={SEAT.y} rx={SEAT.rx} ry={SEAT.ry} fill="var(--paper-shadow)" />}
      {/* Round caps and joins inherit to every sheet; cut outlines are closed, so caps only touch line parts. */}
      <g style={{ filter: 'var(--paper-drop-sm)' }} strokeLinecap="round" strokeLinejoin="round">
        {parts.map((part) => (
          <Sheet key={part.id} part={part} />
        ))}
      </g>
    </svg>
  );
}
