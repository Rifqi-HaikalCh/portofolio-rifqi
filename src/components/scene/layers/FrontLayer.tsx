import { STAGE_VIEWBOX } from '../stage-geometry';

/*
  L3 — foreground props (DesignRules.md §2.4): mug and a paper plant. The
  notebook moved to L2 in P6.2: the figurine sits on it, so it must share his
  parallax depth. They carry the largest parallax amplitude (±10 px) in
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
      {/* Mug, between the laptop and the lamp: the figurine's hand rests where it used to stand (P6.2) */}
      <g style={drop}>
        <path d="M1218 616h-20a16 16 0 0 0 0 40h20" fill="none" stroke="var(--ill-mug)" strokeWidth="10" />
        <rect x="1214" y="598" width="88" height="96" rx="3" fill="var(--ill-mug)" {...cut} />
        <rect x="1214" y="598" width="88" height="10" fill="var(--paper-cut)" />
        <rect x="1222" y="602" width="72" height="5" fill="var(--ill-coffee)" />
        <rect x="1214" y="640" width="88" height="14" fill="var(--paper-fold)" />
      </g>

      {/* Desk chair back, pushed in under the desk (P6.3): fills the floor area
          and gives L3 depth below the desk edge. One sheet, a folded half, a seam. */}
      <g style={drop}>
        <path d="M1064 1000V830Q1064 784 1110 784H1314Q1360 784 1360 830V1000Z" fill="var(--ill-lamp)" {...cut} />
        <path
          d="M1212 784H1314Q1360 784 1360 830V1000H1212Z"
          fill="var(--paper-fold)"
          style={{ transform: 'scaleX(var(--light-x))', transformOrigin: '1212px 0px', transformBox: 'view-box' }}
        />
        <path d="M1096 830H1328" stroke="var(--paper-cut)" strokeWidth="2" />
        <path d="M1096 876H1328" stroke="var(--ill-bezel)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.35" />
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
