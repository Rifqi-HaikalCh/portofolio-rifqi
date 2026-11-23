import { DeskLamp } from './DeskLamp';
import { RifqiFigurine } from './RifqiFigurine';
import { MOBILE_FIGURINE, MOBILE_LAMP, MOBILE_STAGE, MOBILE_VIEWBOX, stageBox } from './stage-geometry';

/*
  Mobile diorama (< 768 px, docs/art-motion-upgrade.md §3, P6.3).
  A static, server-rendered square stage: window, shelf, desk, laptop, lamp and
  the seated figurine poster. No parallax, no 3D. Decorative (aria-hidden) except
  the lamp, which stays the theme switch (≥ 44 px hit area). The real laptop
  screen (LaptopScreenUI) renders as an HTML card below it.
*/

const cut = { stroke: 'var(--paper-cut)', strokeWidth: 1.5 } as const;
const drop = { filter: 'var(--paper-drop)' } as const;
const dropSm = { filter: 'var(--paper-drop-sm)' } as const;
const fold = (x: number) =>
  ({ transform: 'scaleX(var(--light-x))', transformOrigin: `${x}px 0px`, transformBox: 'view-box' }) as const;

const binders = [
  { x: 500, h: 92, fill: 'var(--color-accent)' },
  { x: 532, h: 84, fill: 'var(--color-blueprint)' },
  { x: 564, h: 96, fill: 'var(--color-sage)' },
  { x: 596, h: 78, fill: 'var(--color-muted)' },
] as const;

export function MobileDiorama() {
  return (
    <div className="relative mb-5 aspect-square overflow-hidden border border-line bg-(--ill-wall) md:hidden">
      <svg
        viewBox={MOBILE_VIEWBOX}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <rect width={MOBILE_STAGE.width} height={MOBILE_STAGE.height} fill="var(--ill-wall)" />
        <path d="M400 0V500" stroke="var(--ill-wall-shade)" strokeWidth="2" />

        {/* Daylight beam: three stacked trapezoids. */}
        <g fill="var(--ill-beam)" style={{ opacity: 'var(--beam-opacity)' }}>
          <polygon points="120,282 300,282 600,500 300,500" opacity="0.3" />
          <polygon points="132,282 290,282 580,500 320,500" opacity="0.6" />
          <polygon points="146,282 278,282 550,500 350,500" />
        </g>

        {/* Window, moon, sill */}
        <g style={drop}>
          <rect x="40" y="40" width="260" height="232" fill="var(--ill-frame)" {...cut} />
        </g>
        <rect x="56" y="56" width="110" height="100" fill="var(--ill-window)" />
        <rect x="174" y="56" width="110" height="100" fill="var(--ill-window)" />
        <rect x="56" y="164" width="110" height="92" fill="var(--ill-window)" />
        <rect x="174" y="164" width="110" height="92" fill="var(--ill-window)" />
        <g style={{ opacity: 'var(--night-opacity)' }}>
          <circle cx="240" cy="92" r="18" fill="var(--ill-frame)" />
          <circle cx="232" cy="86" r="16" fill="var(--ill-window)" />
          <path d="M188 128q0-12 12-12q6-10 18-8q10-6 20 2q14 0 14 18z" fill="var(--ill-frame)" opacity="0.6" />
          <path d="M96 90l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="var(--ill-frame)" />
        </g>
        <g style={dropSm}>
          <rect x="30" y="272" width="280" height="14" fill="var(--ill-frame)" {...cut} />
        </g>

        {/* Shelf with binders */}
        <g style={drop}>
          {binders.map((b) => (
            <g key={b.x}>
              <rect x={b.x} y={150 - b.h} width="26" height={b.h} fill={b.fill} {...cut} />
              <rect x={b.x + 6} y={160 - b.h} width="14" height="20" fill="var(--ill-page)" opacity="0.85" />
            </g>
          ))}
          <rect x="640" y="116" width="70" height="12" fill="var(--color-blueprint)" {...cut} />
          <rect x="634" y="128" width="84" height="22" fill="var(--color-accent)" {...cut} />
        </g>
        <g style={dropSm}>
          <rect x="470" y="150" width="300" height="14" fill="var(--color-wood-dark)" {...cut} />
        </g>

        {/* Under the desk: shade, drawers, floor, rug */}
        <rect x="0" y="616" width="800" height="184" fill="var(--ill-wall-shade)" />
        <rect x="0" y="616" width="800" height="184" fill="var(--paper-fold)" />
        <rect x="0" y="740" width="800" height="60" fill="var(--color-wood-dark)" />
        <g style={dropSm}>
          <polygon points="330,770 720,770 744,800 306,800" fill="var(--color-sage)" {...cut} />
        </g>
        <g style={drop}>
          <rect x="24" y="616" width="240" height="126" fill="var(--color-wood)" {...cut} />
        </g>
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x="38" y={626 + i * 56} width="212" height="46" fill="var(--color-wood)" stroke="var(--color-wood-dark)" strokeWidth="2" />
            <rect x="126" y={642 + i * 56} width="36" height="12" fill="var(--ill-page)" />
          </g>
        ))}

        {/* Desk top and front edge */}
        <g style={drop}>
          <polygon points="20,500 780,500 800,580 0,580" fill="var(--color-wood)" {...cut} />
          <rect x="0" y="580" width="800" height="36" fill="var(--color-wood-dark)" />
        </g>
        <path d="M0 581.5H800" stroke="var(--paper-cut)" strokeWidth="3" />

        {/* Notebook: the figurine's seat */}
        <g style={dropSm}>
          <polygon points="44,560 284,560 296,580 34,580" fill="var(--ill-notebook)" {...cut} />
          <polygon points="50,556 280,556 288,566 44,566" fill="var(--ill-page)" />
          <rect x="226" y="548" width="40" height="12" fill="var(--ill-note)" transform="rotate(-6 246 554)" />
        </g>

        {/* Laptop: lid, glass with abstract UI, hinge, base */}
        <g style={drop}>
          <rect x="320" y="236" width="320" height="252" rx="6" fill="var(--ill-bezel)" stroke="var(--ill-laptop)" strokeWidth="4" />
          <polygon points="300,500 660,500 690,540 272,540" fill="var(--ill-laptop)" {...cut} />
        </g>
        <rect x="334" y="250" width="292" height="224" rx="2" fill="var(--ill-screen)" />
        <g fill="var(--ill-page)">
          <rect x="350" y="266" width="64" height="8" fill="var(--color-accent)" />
          <rect x="350" y="290" width="200" height="14" opacity="0.85" />
          <rect x="350" y="312" width="150" height="14" opacity="0.85" />
          <rect x="350" y="340" width="240" height="6" opacity="0.4" />
          <rect x="350" y="354" width="210" height="6" opacity="0.4" />
          <rect x="350" y="368" width="226" height="6" opacity="0.4" />
          <rect x="350" y="430" width="84" height="22" fill="var(--color-accent)" />
          <rect x="444" y="430" width="84" height="22" opacity="0.25" />
        </g>
        <rect x="324" y="488" width="312" height="6" fill="var(--ill-bezel)" />
        <rect x="324" y="494" width="312" height="6" fill="var(--ill-laptop-shade)" />
        <path d="M318 512H644M310 522H652" stroke="var(--ill-laptop-shade)" strokeWidth="5" />
        <path d="M318 509.5H644M310 519.5H652" stroke="var(--paper-cut)" strokeWidth="1.5" />

        {/* Lamp light (dark theme only) */}
        <g className="lamp-glow" style={{ opacity: 'var(--glow-opacity)' }}>
          <polygon points="648,330 716,354 690,540 420,540" fill="var(--ill-lamp-light)" />
          <g fill="var(--ill-bulb)">
            <ellipse cx="560" cy="540" rx="170" ry="22" opacity="0.07" />
            <ellipse cx="560" cy="540" rx="110" ry="14" opacity="0.09" />
            <ellipse cx="560" cy="540" rx="56" ry="8" opacity="0.12" />
          </g>
        </g>

        {/* Lamp */}
        <g style={drop}>
          <polygon points="696,530 790,530 784,514 702,514" fill="var(--ill-lamp)" {...cut} />
          <line x1="744" y1="516" x2="764" y2="400" stroke="var(--ill-lamp)" strokeWidth="11" />
          <line x1="764" y1="400" x2="704" y2="304" stroke="var(--ill-lamp)" strokeWidth="10" />
          <circle cx="764" cy="400" r="10" fill="var(--ill-lamp)" {...cut} />
          <circle cx="704" cy="304" r="8" fill="var(--ill-lamp)" {...cut} />
        </g>
        <g className="lamp-head" style={{ transformOrigin: '704px 304px' }}>
          <polygon points="686,276 728,296 714,358 646,326" fill="var(--ill-lamp)" style={drop} {...cut} />
          <polygon points="728,296 714,358 690,346 708,286" fill="var(--paper-fold)" />
          <polygon points="649,328 712,356 706,364 645,336" fill="var(--ill-bulb)" />
        </g>

        {/* Chair back in the foreground */}
        <g style={drop}>
          <path d="M470 800V700Q470 672 498 672H642Q670 672 670 700V800Z" fill="var(--ill-lamp)" {...cut} />
          <path d="M570 672H642Q670 672 670 700V800H570Z" fill="var(--paper-fold)" style={fold(570)} />
          <path d="M490 700H650" stroke="var(--paper-cut)" strokeWidth="2" />
        </g>
      </svg>

      <div className="absolute" style={stageBox(MOBILE_FIGURINE, MOBILE_STAGE)} aria-hidden="true">
        <div className="h-full w-full" style={{ filter: 'var(--figure-rim)' }}>
          <RifqiFigurine crop="stage" pose="seated" className="h-full w-full" />
        </div>
      </div>
      <div className="stage-fibre" aria-hidden="true" />
      <DeskLamp rect={MOBILE_LAMP} stage={MOBILE_STAGE} />
    </div>
  );
}
