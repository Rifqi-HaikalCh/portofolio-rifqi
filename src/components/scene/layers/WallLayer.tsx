import { STAGE, STAGE_VIEWBOX } from '../stage-geometry';

/*
  L1 — back wall (DesignRules.md §2.4, §9).
  Window with a daylight beam (light theme) or a paper moon (dark theme),
  and one wall shelf whose binders carry Rifqi's core stack.
  Decorative only: aria-hidden, no pointer events.
*/

const cut = { stroke: 'var(--paper-cut)', strokeWidth: 1.5 } as const;
const drop = { filter: 'var(--paper-drop)' } as const;
const dropSm = { filter: 'var(--paper-drop-sm)' } as const;

const binders = [
  { x: 1236, h: 126, fill: 'var(--color-accent)', label: '.NET' },
  { x: 1278, h: 116, fill: 'var(--color-blueprint)', label: 'SQL' },
  { x: 1320, h: 130, fill: 'var(--color-sage)', label: 'C#' },
  { x: 1362, h: 108, fill: 'var(--color-muted)', label: '' },
] as const;

export function WallLayer({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={STAGE_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={STAGE.width} height={STAGE.height} fill="var(--ill-wall)" />

      {/* Wall made of three paper sheets: faint vertical seams. */}
      <path d="M533 0V640M1066 0V640" stroke="var(--ill-wall-shade)" strokeWidth="2" />

      {/* Daylight beam falling from the window onto the desk. */}
      <polygon
        points="240,412 404,412 1010,640 600,640"
        fill="var(--ill-beam)"
        style={{ opacity: 'var(--beam-opacity)' }}
      />

      {/* Window */}
      <g style={drop}>
        <rect x="70" y="70" width="350" height="360" fill="var(--ill-frame)" {...cut} />
      </g>
      <g>
        <rect x="92" y="92" width="149" height="154" fill="var(--ill-window)" />
        <rect x="249" y="92" width="149" height="154" fill="var(--ill-window)" />
        <rect x="92" y="254" width="149" height="154" fill="var(--ill-window)" />
        <rect x="249" y="254" width="149" height="154" fill="var(--ill-window)" />
      </g>

      {/* Night: a cut-paper moon and three small stars. */}
      <g style={{ opacity: 'var(--night-opacity)' }}>
        <circle cx="338" cy="146" r="24" fill="var(--ill-frame)" />
        <circle cx="328" cy="138" r="22" fill="var(--ill-window)" />
        <path d="M150 128l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="var(--ill-frame)" />
        <path d="M206 196l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="var(--ill-frame)" />
        <path d="M318 300l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="var(--ill-frame)" />
      </g>

      {/* Sill */}
      <g style={dropSm}>
        <rect x="56" y="430" width="378" height="18" fill="var(--ill-frame)" {...cut} />
      </g>

      {/* Shelf with binders */}
      <g style={drop}>
        {binders.map((b) => (
          <g key={b.x}>
            <rect x={b.x} y={230 - b.h} width="36" height={b.h} fill={b.fill} {...cut} />
            <rect x={b.x + 8} y={230 - b.h + 14} width="20" height="30" fill="var(--ill-page)" opacity="0.85" />
            {b.label && (
              <text
                x={b.x + 18}
                y={230 - b.h + 34}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="600"
                fill="var(--ill-bezel)"
              >
                {b.label}
              </text>
            )}
          </g>
        ))}
        <rect
          x="1404"
          y="112"
          width="34"
          height="120"
          fill="var(--color-ink)"
          transform="rotate(14 1404 232)"
          {...cut}
        />
        <rect x="1452" y="198" width="80" height="14" fill="var(--color-blueprint)" {...cut} />
        <rect x="1458" y="184" width="70" height="14" fill="var(--ill-frame)" {...cut} />
        <rect x="1448" y="212" width="88" height="18" fill="var(--color-accent)" {...cut} />
      </g>
      <g style={dropSm}>
        <rect x="1200" y="230" width="350" height="16" fill="var(--color-wood-dark)" {...cut} />
        <path d="M1236 246h22l-22 26z M1498 246h22v26z" fill="var(--color-wood-dark)" />
      </g>
    </svg>
  );
}
