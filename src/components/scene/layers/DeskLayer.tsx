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
      {/* Under the desk: the wall falls into shadow, down to a skirting strip. */}
      <rect x="0" y="744" width={STAGE.width} height="256" fill="var(--ill-wall-shade)" />
      <rect x="0" y="744" width={STAGE.width} height="256" fill="var(--paper-fold)" />
      <rect x="0" y="914" width={STAGE.width} height="14" fill="var(--ill-frame)" opacity="0.55" />

      {/* Floor: one paper strip, and the edge of a rug under the chair (P6.3). */}
      <rect x="0" y="928" width={STAGE.width} height="72" fill="var(--color-wood-dark)" />
      <path d="M0 952H1600M0 976H1600" stroke="var(--color-wood)" strokeWidth="2" opacity="0.35" />
      <g style={dropSm}>
        <polygon points="560,958 1380,958 1420,1000 520,1000" fill="var(--color-sage)" {...cut} />
        <polygon points="600,970 1340,970 1366,1000 574,1000" fill="none" stroke="var(--ill-page)" strokeWidth="2" opacity="0.5" />
      </g>
      <path d="M566 958V950M590 958V950M614 958V950M638 958V950M1302 958V950M1326 958V950M1350 958V950M1374 958V950" stroke="var(--color-sage)" strokeWidth="3" />

      {/* Drawer pedestal (left) and a leg (right), standing on the floor. Drawer
          labels echo the stamped section indices used across the site (§2.3). */}
      <g style={drop}>
        <rect x="60" y="744" width="400" height="186" fill="var(--color-wood)" {...cut} />
        <rect x="1460" y="744" width="54" height="186" fill="var(--color-wood)" {...cut} />
      </g>
      {['01', '02', '03'].map((label, i) => (
        <g key={label}>
          <rect x="80" y={756 + i * 58} width="360" height="50" fill="var(--color-wood)" stroke="var(--color-wood-dark)" strokeWidth="2" />
          {/* Lit top edge of each drawer front: the cut catches the light (§2.2). */}
          <path d={`M82 ${758 + i * 58}H438`} stroke="var(--paper-cut)" strokeWidth="2" />
          <rect x="230" y={773 + i * 58} width="60" height="16" fill="var(--ill-page)" />
          <text
            x="260"
            y={785 + i * 58}
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
      <rect x="1460" y="744" width="54" height="186" fill="var(--paper-fold)" />

      {/* Desk: top plane, then the front edge (cardstock thickness). */}
      <g style={drop}>
        <polygon points="40,640 1560,640 1600,700 0,700" fill="var(--color-wood)" {...cut} />
        <rect x="0" y="700" width={STAGE.width} height="44" fill="var(--color-wood-dark)" />
      </g>
      <path d="M0 701.5H1600" stroke="var(--paper-cut)" strokeWidth="3" />
      {/* Wood grain: three cut lines, nothing more. */}
      <path
        d="M120 656H700M820 668H1480M60 684H560M900 690H1530"
        stroke="var(--color-wood-dark)"
        strokeWidth="2"
        opacity="0.35"
      />

      {/* Desk mat */}
      <polygon points="372,648 1228,648 1262,694 338,694" fill="var(--ill-mat)" {...cut} />

      {/* Notebook on the front edge: the figurine's seat (P6.2), with a sticky note */}
      <g style={drop}>
        <polygon points="96,690 334,690 356,734 76,734" fill="var(--ill-notebook)" {...cut} />
        <polygon points="76,734 356,734 356,744 76,744" fill="var(--ill-page)" />
        <path d="M296 690L310 734" stroke="var(--ill-bezel)" strokeWidth="4" opacity="0.6" />
      </g>
      <g style={dropSm}>
        <polygon points="92,676 160,668 168,706 100,714" fill="var(--ill-note)" {...cut} />
        <polygon points="156,700 168,706 160,712" fill="var(--paper-fold)" />
        <path d="M106 686l40-5M108 696l30-4" stroke="var(--ill-bezel)" strokeWidth="2" opacity="0.45" />
      </g>

      {/* Laptop lid with bezel and glass */}
      <g style={drop}>
        <rect x="470" y="150" width="660" height="422" rx="8" fill="var(--ill-bezel)" stroke="var(--ill-laptop)" strokeWidth="5" />
      </g>
      {/* Lid thickness on the side away from the viewer's light (P6.3). */}
      <polygon points="1132,160 1142,168 1142,566 1132,572" fill="var(--ill-laptop-shade)" />
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="2" fill="var(--ill-screen)" />
      <circle cx="800" cy="161" r="3" fill="var(--ill-laptop-shade)" />

      {/* Hinge and base deck */}
      <rect x="488" y="572" width="624" height="7" fill="var(--ill-bezel)" />
      <rect x="488" y="579" width="624" height="7" fill="var(--ill-laptop-shade)" />
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
      {/* Embossed rows: a lit lip above each strip. */}
      <g stroke="var(--paper-cut)" strokeWidth="1.5">
        <path d="M512 595.5H1088M504 607.5H1096M496 619.5H1104" />
      </g>
      <polygon points="716,634 884,634 892,648 708,648" fill="var(--ill-laptop-shade)" opacity="0.7" />
    </svg>
  );
}
