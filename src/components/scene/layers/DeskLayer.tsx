import { SCREEN, STAGE, STAGE_VIEWBOX } from '../stage-geometry';

/*
  L2 — desk surface and the paper laptop (DesignRules.md §2.4, §9).
  The screen is an empty glass rectangle: LaptopScreenUI renders real HTML
  on top of it at SCREEN (Phase 3). Never bake text into this layer.
*/

const cut = { stroke: 'var(--paper-cut)', strokeWidth: 1.5 } as const;
const drop = { filter: 'var(--paper-drop)' } as const;
const dropSm = { filter: 'var(--paper-drop-sm)' } as const;

export function DeskLayer({ className = '' }: { className?: string }) {
  const s = SCREEN;
  return (
    <svg
      viewBox={STAGE_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Under the desk: the wall falls into shadow. */}
      <rect x="0" y="744" width={STAGE.width} height="256" fill="var(--ill-wall-shade)" />
      <rect x="0" y="744" width={STAGE.width} height="256" fill="var(--paper-fold)" />

      {/* Drawer pedestal (left) and a leg (right). Drawer labels echo the
          stamped section indices used across the site (§2.3). */}
      <g style={drop}>
        <rect x="60" y="744" width="400" height="256" fill="var(--color-wood)" {...cut} />
        <rect x="1460" y="744" width="54" height="256" fill="var(--color-wood)" {...cut} />
      </g>
      {['01', '02', '03'].map((label, i) => (
        <g key={label}>
          <rect x="80" y={760 + i * 78} width="360" height="66" fill="var(--color-wood)" stroke="var(--color-wood-dark)" strokeWidth="2" />
          <rect x="230" y={786 + i * 78} width="60" height="16" fill="var(--ill-page)" />
          <text
            x="260"
            y={798 + i * 78}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fontWeight="600"
            fill="var(--color-accent)"
          >
            {label}
          </text>
        </g>
      ))}
      <rect x="1460" y="744" width="54" height="256" fill="var(--paper-fold)" />

      {/* Desk: top plane, then the front edge (cardstock thickness). */}
      <g style={drop}>
        <polygon points="40,640 1560,640 1600,700 0,700" fill="var(--color-wood)" {...cut} />
        <rect x="0" y="700" width={STAGE.width} height="44" fill="var(--color-wood-dark)" />
      </g>
      {/* Wood grain: three cut lines, nothing more. */}
      <path
        d="M120 656H700M820 668H1480M60 684H560M900 690H1530"
        stroke="var(--color-wood-dark)"
        strokeWidth="2"
        opacity="0.35"
      />

      {/* Desk mat */}
      <polygon points="372,648 1228,648 1262,694 338,694" fill="var(--ill-mat)" {...cut} />

      {/* Laptop lid with bezel and glass */}
      <g style={drop}>
        <rect x="470" y="150" width="660" height="422" rx="8" fill="var(--ill-bezel)" stroke="var(--ill-laptop)" strokeWidth="5" />
      </g>
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="2" fill="var(--ill-screen)" />
      <circle cx="800" cy="161" r="3" fill="var(--ill-laptop-shade)" />

      {/* Hinge and base deck */}
      <rect x="488" y="572" width="624" height="14" fill="var(--ill-laptop-shade)" />
      <g style={dropSm}>
        <polygon points="440,586 1160,586 1206,652 394,652" fill="var(--ill-laptop)" {...cut} />
        <polygon points="394,652 1206,652 1200,664 400,664" fill="var(--ill-laptop-shade)" />
      </g>

      {/* Keyboard rows as dashed paper strips, trackpad as a pressed panel. */}
      <g stroke="var(--ill-laptop-shade)" strokeWidth="7" strokeDasharray="24 5">
        <path d="M512 600H1088" />
        <path d="M504 612H1096" />
        <path d="M496 624H634M966 624H1104" />
      </g>
      <path d="M640 624H960" stroke="var(--ill-laptop-shade)" strokeWidth="7" />
      <polygon points="716,634 884,634 892,648 708,648" fill="var(--ill-laptop-shade)" opacity="0.7" />
    </svg>
  );
}
