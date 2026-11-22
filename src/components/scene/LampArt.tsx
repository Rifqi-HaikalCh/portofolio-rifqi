import { STAGE_VIEWBOX } from './stage-geometry';

/*
  The articulated paper desk lamp (DesignRules.md §2.2, §4 `01`).
  It is the dark theme's single light source: in dark mode the bulb glows and a
  warm cone falls toward the laptop. Phase 3 wraps it in the DeskLamp <button>.
  The cone is the one radial/translucent light allowed by §5.3.
*/

const cut = { stroke: 'var(--paper-cut)', strokeWidth: 1.5 } as const;
const drop = { filter: 'var(--paper-drop)' } as const;

export function LampArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={STAGE_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="lamp-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--ill-bulb)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lamp light: cone and pool, dark theme only. */}
      <g style={{ opacity: 'var(--glow-opacity)' }}>
        <polygon points="1138,334 1226,374 1080,652 560,652" fill="var(--ill-lamp-light)" />
        <ellipse cx="860" cy="652" rx="380" ry="46" fill="url(#lamp-pool)" />
      </g>

      {/* Base, arms, joints, head */}
      <g style={drop}>
        <polygon points="1304,652 1456,652 1446,628 1314,628" fill="var(--ill-lamp)" {...cut} />
        <line x1="1380" y1="630" x2="1322" y2="420" stroke="var(--ill-lamp)" strokeWidth="16" />
        <line x1="1322" y1="420" x2="1214" y2="300" stroke="var(--ill-lamp)" strokeWidth="14" />
        <circle cx="1322" cy="420" r="15" fill="var(--ill-lamp)" {...cut} />
        <circle cx="1214" cy="300" r="12" fill="var(--ill-lamp)" {...cut} />
        <polygon points="1190,256 1252,288 1232,378 1132,330" fill="var(--ill-lamp)" {...cut} />
      </g>
      {/* Folded side of the shade: the half turned away from the light. */}
      <polygon points="1252,288 1232,378 1196,360 1222,272" fill="var(--paper-fold)" />
      {/* Bulb rim: muted when off, warm when the lamp is on. */}
      <polygon points="1136,332 1230,376 1220,386 1130,344" fill="var(--ill-bulb)" />
      {/* Switch on the base */}
      <rect x="1404" y="634" width="18" height="8" fill="var(--ill-bulb)" />
    </svg>
  );
}
