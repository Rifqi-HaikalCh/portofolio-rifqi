import { STAGE_VIEWBOX } from '../stage-geometry';

/*
  L3 — foreground props (DesignRules.md §2.4): mug, notebook with a sticky note,
  and a paper plant. They carry the largest parallax amplitude (±10 px) in
  Phase 3, so they sit at the stage edges and never cover the laptop screen.
*/

const cut = { stroke: 'var(--paper-cut)', strokeWidth: 1.5 } as const;
const drop = { filter: 'var(--paper-drop)' } as const;

/* Each leaf is two halves: lit half + folded half along the midrib. */
const leaves = [
  { tip: [1440, 462], ctrl: [1452, 540], bend: [1488, 520] },
  { tip: [1500, 430], ctrl: [1490, 520], bend: [1530, 500] },
  { tip: [1580, 470], ctrl: [1540, 530], bend: [1570, 540] },
  { tip: [1418, 548], ctrl: [1460, 580], bend: [1470, 556] },
  { tip: [1596, 560], ctrl: [1552, 586], bend: [1566, 566] },
] as const;
const stem = [1516, 612] as const;

export function FrontLayer({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={STAGE_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Notebook lying on the front edge, with a sticky note */}
      <g style={drop}>
        <polygon points="96,690 334,690 356,734 76,734" fill="var(--ill-notebook)" {...cut} />
        <polygon points="76,734 356,734 356,744 76,744" fill="var(--ill-page)" />
        <path d="M296 690L310 734" stroke="var(--ill-bezel)" strokeWidth="4" opacity="0.6" />
      </g>
      <g style={{ filter: 'var(--paper-drop-sm)' }}>
        <polygon points="150,676 218,668 226,706 158,714" fill="var(--ill-note)" {...cut} />
        <polygon points="214,700 226,706 218,712" fill="var(--paper-fold)" />
        <path d="M164 686l40-5M166 696l30-4" stroke="var(--ill-bezel)" strokeWidth="2" opacity="0.45" />
      </g>

      {/* Mug */}
      <g style={drop}>
        <path d="M454 616h20a16 16 0 0 1 0 40h-20" fill="none" stroke="var(--ill-mug)" strokeWidth="10" />
        <rect x="370" y="598" width="88" height="96" rx="3" fill="var(--ill-mug)" {...cut} />
        <rect x="370" y="598" width="88" height="10" fill="var(--paper-cut)" />
        <rect x="378" y="602" width="72" height="5" fill="var(--ill-coffee)" />
        <rect x="370" y="640" width="88" height="14" fill="var(--paper-fold)" />
      </g>

      {/* Paper plant in a terracotta pot */}
      <g style={drop}>
        {leaves.map(({ tip, ctrl, bend }) => (
          <g key={`${tip[0]}-${tip[1]}`}>
            <path
              d={`M${stem[0]} ${stem[1]}Q${ctrl[0]} ${ctrl[1]} ${tip[0]} ${tip[1]}Q${bend[0]} ${bend[1]} ${stem[0]} ${stem[1]}Z`}
              fill="var(--ill-leaf)"
              {...cut}
            />
            <path
              d={`M${stem[0]} ${stem[1]}Q${(ctrl[0] + bend[0]) / 2} ${(ctrl[1] + bend[1]) / 2} ${tip[0]} ${tip[1]}Q${bend[0]} ${bend[1]} ${stem[0]} ${stem[1]}Z`}
              fill="var(--ill-leaf-fold)"
            />
          </g>
        ))}
        <polygon points="1462,624 1570,624 1554,744 1478,744" fill="var(--ill-pot)" {...cut} />
        <rect x="1452" y="606" width="128" height="22" fill="var(--ill-pot-rim)" {...cut} />
        <polygon
          points="1516,628 1570,624 1554,744 1516,744"
          fill="var(--paper-fold)"
          style={{ transform: 'scaleX(var(--light-x))', transformOrigin: '1516px 0px', transformBox: 'view-box' }}
        />
      </g>
    </svg>
  );
}
