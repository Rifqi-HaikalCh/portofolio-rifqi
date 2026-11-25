import type { CSSProperties, ReactNode } from 'react';
import { air, circle, cut, ellipse, paperKit, poly, rect } from '../../../lib/paper-kit';
import { DeskLamp } from '../../scene/DeskLamp';
import { DeskSpeaker } from '../../scene/DeskSpeaker';
import { FigurineSlot } from '../../scene/FigurineSlot';
import { LaptopScreenUI, type ScreenData } from '../../scene/LaptopScreenUI';
import { FIGURINE, LAMP, SCREEN, SPEAKER, STAGE } from '../../scene/stage-geometry';
import { PaperScene, frameVars, type Frames, type SceneLayer } from '../PaperScene';
import { ShadowBox } from '../ShadowBox';
import { FAR_TOWERS, NEAR_TOWERS, bar, day, keyRow, lineMuted, night, skyline, windows } from '../office';

/*
  Station `01` — The Desk (DesignRules.md §2.2, §4.5 `01`).
  15 layers in depth bands (§2.5), back to front: sky, far skyline, near skyline
  with Monas, wall, window, shelf + pinboard, floor, desk, speaker (v3.13), lamp,
  laptop (z = 0, the HTML screen sits on it), lamp light, figurine (v3.13: life
  size, standing on the floor beside the desk), props, chair back.
  Every sheet is lit by paper-kit; shadows grow with each sheet's gap.
*/

const FRAMES: Frames = {
  desktop: { x: 0, y: 0, w: STAGE.width, h: STAGE.height },
  mobile: { x: 150, y: 60, w: 1350, h: 940 },
};

export function DeskStation({
  screen,
  poster,
  className = '',
}: {
  screen: ScreenData;
  poster: ReactNode;
  className?: string;
}) {
  const k = paperKit('desk');

  const layers: SceneLayer[] = [
    {
      id: 'sky',
      band: 'far',
      z: -900,
      box: { x: 40, y: 40, w: 420, h: 420 },
      art: (
        <>
          {k.sheet({ d: rect(40, 40, 420, 420), fill: 'var(--ill-sky)', edge: 0, rim: false, material: 'none' })}
          <g style={day}>
            {k.sheet({ d: 'M118 168q0-20 22-20q8-18 30-14q14-14 32 0q22-2 24 20q16 4 14 16H118Z', fill: 'var(--ill-cloud)', gap: 60, edge: 2, material: 'cardstock' })}
            {k.sheet({ d: 'M268 226q0-14 16-14q6-12 22-10q10-10 24 0q16-2 18 14q12 2 10 12H268Z', fill: air('var(--ill-cloud)', 'far', 10), gap: 40, edge: 2 })}
          </g>
          <g style={night}>
            {k.sheet({ d: `${circle(338, 146, 26)}${circle(326, 138, 23)}`, fill: 'var(--ill-sun)', gap: 30, edge: 0, fillRule: 'evenodd', material: 'cardstock' })}
            <path d="M150 128l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM206 196l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM112 236l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="var(--ill-sun)" opacity="0.8" />
          </g>
        </>
      ),
    },
    {
      id: 'city-far',
      band: 'far',
      z: -760,
      box: { x: 30, y: 200, w: 440, h: 270 },
      art: (
        <>
          {k.sheet({ d: skyline(470, FAR_TOWERS), fill: air('var(--ill-city-far)', 'far'), gap: 70, edge: 2 })}
          <path
            d={FAR_TOWERS.map(([x, w, h], i) => windows(x, w, 470 - h, 470, i * 37 + 5)).join('')}
            fill="var(--ill-city-lit)"
            style={night}
          />
        </>
      ),
    },
    {
      id: 'city-near',
      band: 'far',
      z: -560,
      box: { x: 30, y: 240, w: 440, h: 230 },
      art: (
        <>
          {k.sheet({ d: skyline(470, NEAR_TOWERS), fill: air('var(--ill-city-near)', 'far', -14), gap: 120, edge: 3 })}
          {/* Monas: the obelisk and its flame, Jakarta's skyline landmark. */}
          {k.sheet({ d: poly([[214, 470], [290, 470], [280, 446], [224, 446]]), fill: air('var(--ill-city-near)', 'far', -14), gap: 120, edge: 3 })}
          {k.sheet({ d: poly([[232, 446], [272, 446], [262, 432], [242, 432]]), fill: air('var(--ill-city-near)', 'far', -14), gap: 20, edge: 2 })}
          {k.sheet({ d: poly([[246, 432], [258, 432], [255, 306], [249, 306]]), fill: air('var(--ill-city-near)', 'far', -14), gap: 120, edge: 2 })}
          {k.sheet({ d: 'M247 306h10l-2-6q4-6-1-14q-1 6-4 6q-2-4 0-8q-6 6-5 14z', fill: 'var(--ill-note)', gap: 10, edge: 1 })}
          <path
            d={NEAR_TOWERS.map(([x, w, h], i) => windows(x, w, 470 - h, 470, i * 53 + 11)).join('')}
            fill="var(--ill-city-lit)"
            style={night}
          />
        </>
      ),
    },
    {
      id: 'wall',
      band: 'back',
      z: -300,
      box: { x: -40, y: -40, w: 1680, h: 1140 },
      art: (
        <>
          {k.sheet({
            d: `${rect(-40, -40, 1680, 1140)}${rect(92, 92, 306, 316)}`,
            fillRule: 'evenodd',
            fill: 'var(--ill-wall)',
            gap: 260,
            edge: 6,
            material: 'cardstock',
          })}
          {/* Wall built from three sheets: seams with their own lit lip. */}
          <path d="M533 -40V1100M1066 -40V1100" stroke="var(--ill-wall-shade)" strokeWidth="3" />
          <path d="M535 -40V1100M1068 -40V1100" stroke="var(--paper-cut)" strokeWidth="1" />
          {/* Daylight beam: three stacked translucent sheets, brightest at the core. */}
          <g fill="var(--ill-beam)" style={day}>
            <polygon points="220,412 420,412 1060,640 560,640" opacity="0.3" />
            <polygon points="232,412 412,412 1036,640 580,640" opacity="0.6" />
            <polygon points="248,412 396,412 990,640 620,640" />
          </g>
          {/* Under the desk the wall falls into shadow. */}
          <rect x="-40" y="744" width="1680" height="200" fill="var(--ill-wall-shade)" />
          <rect x="-40" y="744" width="1680" height="200" fill="var(--paper-fold)" />
          {k.sheet({ d: rect(-40, 902, 1680, 26), fill: 'var(--ill-frame)', gap: 14, edge: 3 })}
        </>
      ),
    },
    {
      id: 'window',
      band: 'back',
      z: -270,
      box: { x: 40, y: 50, w: 420, h: 420 },
      art: (
        <>
          {k.sheet({
            d: `${rect(70, 70, 350, 360, 2)}${rect(92, 92, 149, 154)}${rect(249, 92, 149, 154)}${rect(92, 254, 149, 154)}${rect(249, 254, 149, 154)}`,
            fillRule: 'evenodd',
            fill: 'var(--ill-frame)',
            gap: 34,
            edge: 5,
          })}
          {k.sheet({ d: rect(56, 428, 378, 20, 2), fill: 'var(--ill-frame)', gap: 30, edge: 6 })}
        </>
      ),
    },
    {
      id: 'shelf',
      band: 'back',
      z: -230,
      box: { x: 1180, y: 80, w: 410, h: 360 },
      art: (
        <>
          {/* Pinboard: cork in two stacked sheets, three pinned cards (ruled lines, no text). */}
          {k.stack({ d: rect(1392, 290, 174, 128, 3), fill: 'var(--ill-cork)', layers: 2, step: 5, gap: 24, edge: 3, material: 'cork' })}
          {[
            { x: 1404, y: 304, w: 52, h: 72, r: -4, pin: 'var(--color-accent)' },
            { x: 1464, y: 312, w: 44, h: 60, r: 3, pin: 'var(--color-blueprint)' },
            { x: 1516, y: 302, w: 40, h: 96, r: -2, pin: 'var(--color-sage)' },
          ].map((c) => (
            <g key={c.x} transform={`rotate(${c.r} ${c.x + c.w / 2} ${c.y})`}>
              {k.sheet({ d: rect(c.x, c.y, c.w, c.h), fill: 'var(--ill-page)', gap: 10, edge: 1.5 })}
              <path d={[0, 1, 2, 3].map((i) => `M${c.x + 7} ${c.y + 20 + i * 12}H${c.x + c.w - 7 - (i % 2) * 10}`).join('')} {...lineMuted} />
              {k.sheet({ d: circle(c.x + c.w / 2, c.y + 7, 4.5), fill: c.pin, gap: 8, edge: 1.5, material: 'none' })}
            </g>
          ))}
          {/* Binders carry the core stack. */}
          {[
            { x: 1236, h: 126, fill: 'var(--color-accent)', label: '.NET' },
            { x: 1278, h: 116, fill: 'var(--color-blueprint)', label: 'SQL' },
            { x: 1320, h: 130, fill: 'var(--color-sage)', label: 'C#' },
            { x: 1362, h: 108, fill: 'var(--color-muted)', label: '' },
          ].map((b) => (
            <g key={b.x}>
              {k.sheet({ d: rect(b.x, 230 - b.h, 36, b.h, 2), fill: b.fill, gap: 18, edge: 4 })}
              {k.sheet({ d: rect(b.x + 8, 244 - b.h, 20, 30, 1), fill: 'var(--ill-page)', gap: 3, edge: 1, rim: false })}
              <circle cx={b.x + 18} cy={230 - b.h + 54} r="4" fill="none" stroke="var(--pk-dark)" strokeWidth="2" opacity="0.4" />
              {b.label && (
                <text x={b.x + 18} y={264 - b.h} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--ill-bezel)">
                  {b.label}
                </text>
              )}
            </g>
          ))}
          <g transform="rotate(14 1404 232)">{k.sheet({ d: rect(1404, 112, 34, 120, 2), fill: 'var(--color-ink)', gap: 18, edge: 4 })}</g>
          {k.sheet({ d: rect(1452, 198, 80, 14, 1), fill: 'var(--color-blueprint)', gap: 8, edge: 3 })}
          {k.sheet({ d: rect(1458, 184, 70, 14, 1), fill: 'var(--ill-frame)', gap: 8, edge: 3 })}
          {k.sheet({ d: rect(1448, 212, 88, 18, 1), fill: 'var(--color-accent)', gap: 8, edge: 3 })}
          {k.sheet({ d: rect(1200, 230, 350, 16, 1), fill: 'var(--color-wood-dark)', gap: 34, edge: 6, material: 'wood' })}
          {k.sheet({ d: 'M1236 246h22l-22 26zM1498 246h22v26z', fill: 'var(--color-wood-dark)', gap: 20, edge: 3, material: 'wood' })}
        </>
      ),
    },
    {
      id: 'floor',
      band: 'back',
      z: -180,
      box: { x: -40, y: 880, w: 1680, h: 220 },
      art: (
        <>
          {k.sheet({ d: rect(-40, 928, 1680, 172), fill: 'var(--color-wood-dark)', edge: 0, material: 'wood', rim: false })}
          <path d="M-40 954H1640M-40 982H1640" stroke="var(--pk-dark)" strokeWidth="2" opacity="0.25" />
          {k.stack({ d: cut([[560, 960], [1380, 960], [1420, 1010], [520, 1010]], { seed: 4, jitter: 1.2 }), fill: 'var(--color-sage)', layers: 2, step: 4, gap: 10, edge: 3, material: 'kraft' })}
          <polygon points="600,972 1340,972 1366,1010 574,1010" fill="none" stroke="var(--ill-page)" strokeWidth="2" opacity="0.5" />
          <path d="M566 960V951M590 960V951M614 960V951M638 960V951M1302 960V951M1326 960V951M1350 960V951M1374 960V951" stroke="var(--color-sage)" strokeWidth="3" />
        </>
      ),
    },
    {
      id: 'desk',
      band: 'mid',
      z: -30,
      box: { x: -20, y: 600, w: 1640, h: 360 },
      art: (
        <>
          {/* Modesty panel: the desk's back board, set in from the front edge. */}
          {k.sheet({ d: rect(440, 744, 1040, 132), fill: 'var(--color-wood-dark)', gap: 90, edge: 0, material: 'wood' })}
          <path d="M440 790H1480M440 834H1480" stroke="var(--pk-dark)" strokeWidth="1.5" opacity="0.25" />
          {k.sheet({ d: rect(60, 744, 400, 186), fill: 'var(--color-wood)', gap: 120, edge: 5, material: 'wood' })}
          {['01', '02', '03'].map((label, i) => (
            <g key={label}>
              {k.sheet({ d: rect(80, 756 + i * 58, 360, 50, 2), fill: 'var(--color-wood)', gap: 8, edge: 3, material: 'wood' })}
              {k.sheet({ d: rect(230, 773 + i * 58, 60, 16, 1), fill: 'var(--ill-page)', gap: 4, edge: 1 })}
              <text x="260" y={785 + i * 58} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600" fill="var(--color-accent)">
                {label}
              </text>
            </g>
          ))}
          {k.sheet({ d: rect(1460, 744, 54, 186), fill: 'var(--color-wood)', gap: 120, edge: 5, material: 'wood' })}
          {k.sheet({ d: poly([[40, 640], [1560, 640], [1600, 700], [0, 700]]), fill: 'var(--color-wood)', gap: 200, edge: 0, material: 'wood' })}
          {k.sheet({ d: rect(0, 700, 1600, 44), fill: 'var(--color-wood-dark)', gap: 180, edge: 0, material: 'wood' })}
          <path d="M0 701.5H1600" stroke="var(--paper-cut)" strokeWidth="3" />
          {k.sheet({ d: poly([[372, 648], [1228, 648], [1262, 694], [338, 694]]), fill: 'var(--ill-mat)', gap: 4, edge: 2 })}
          {/* Notebook: the figurine's seat, with a page block and a sticky note. */}
          {k.sheet({ d: poly([[96, 690], [334, 690], [356, 734], [76, 734]]), fill: 'var(--ill-notebook)', gap: 8, edge: 4 })}
          {k.sheet({ d: rect(76, 734, 280, 10), fill: 'var(--ill-page)', edge: 0, rim: false })}
          <path d="M80 737H352M80 740.5H352" stroke="var(--pk-dark)" strokeWidth="0.8" opacity="0.3" />
          <path d="M296 690L310 734" stroke="var(--ill-bezel)" strokeWidth="4" opacity="0.6" />
          <g transform="rotate(-6 130 692)">
            {k.sheet({ d: rect(96, 668, 66, 40, 1), fill: 'var(--ill-note)', gap: 4, edge: 1 })}
            <path d="M104 680h44M104 690h30" stroke="var(--ill-bezel)" strokeWidth="2" opacity="0.45" />
          </g>
        </>
      ),
    },
    {
      // v3.13: a paper speaker between the laptop and the lamp, the sound switch (DeskSpeaker).
      id: 'speaker',
      band: 'mid',
      z: -20,
      box: { x: 1226, y: 496, w: 120, h: 156 },
      art: (
        <>
          {k.sheet({ d: rect(1246, 632, 16, 10, 1), fill: 'var(--ill-bezel)', edge: 0, rim: false })}
          {k.sheet({ d: rect(1310, 632, 16, 10, 1), fill: 'var(--ill-bezel)', edge: 0, rim: false })}
          {k.sheet({ d: rect(1238, 508, 96, 128, 9), fill: 'var(--ill-laptop)', gap: 40, edge: 5 })}
          {k.sheet({ d: rect(1246, 516, 80, 112, 6), fill: 'var(--ill-bezel)', gap: 6, edge: 2, material: 'kraft' })}
          {k.sheet({ d: circle(1286, 542, 11), fill: 'var(--ill-laptop-shade)', gap: 8, edge: 2 })}
          {k.sheet({ d: circle(1286, 542, 4), fill: 'var(--ill-bezel)', edge: 0, rim: false })}
          {k.sheet({ d: circle(1286, 590, 29), fill: 'var(--ill-laptop-shade)', gap: 10, edge: 2 })}
          <rect x="1252" y="620" width="10" height="3" fill="var(--color-accent)" />
        </>
      ),
    },
    {
      id: 'lamp',
      band: 'mid',
      z: -10,
      box: { x: 1100, y: 230, w: 380, h: 440 },
      art: (
        <>
          {k.sheet({ d: poly([[1304, 652], [1456, 652], [1446, 628], [1314, 628]]), fill: 'var(--ill-lamp)', gap: 10, edge: 5 })}
          {k.sheet({ d: bar([1380, 632], [1322, 420], 16), fill: 'var(--ill-lamp)', gap: 60, edge: 3 })}
          {k.sheet({ d: bar([1322, 420], [1214, 300], 14), fill: 'var(--ill-lamp)', gap: 60, edge: 3 })}
          {k.sheet({ d: circle(1322, 420, 15), fill: 'var(--ill-lamp)', gap: 50, edge: 3 })}
          {k.sheet({ d: circle(1214, 300, 12), fill: 'var(--ill-lamp)', gap: 50, edge: 3 })}
          <g className="lamp-head">
            {k.sheet({ d: poly([[1190, 256], [1252, 288], [1232, 378], [1132, 330]]), fill: 'var(--ill-lamp)', gap: 60, edge: 5 })}
            <polygon points="1252,288 1232,378 1196,360 1222,272" fill="var(--paper-fold)" />
            <polygon points="1136,332 1230,376 1220,386 1130,344" fill="var(--ill-bulb)" />
          </g>
          <rect x="1404" y="634" width="18" height="8" rx="1" fill="var(--ill-bulb)" />
        </>
      ),
    },
    {
      id: 'laptop',
      band: 'mid',
      z: 0,
      box: { x: 370, y: 130, w: 860, h: 560 },
      art: (
        <>
          {k.sheet({ d: rect(464, 144, 672, 434, 10), fill: 'var(--ill-laptop)', gap: 70, edge: 5 })}
          {k.sheet({ d: rect(474, 154, 652, 414, 6), fill: 'var(--ill-bezel)', edge: 0, rim: false, material: 'none' })}
          <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx="2" fill="var(--ill-screen)" />
          {/* Mobile only: the glass shows an abstract UI (the real screen is the card below). */}
          <g className="scene-mobile-only" fill="var(--ill-page)">
            <rect x="530" y="200" width="120" height="14" fill="var(--color-accent)" />
            <rect x="530" y="236" width="380" height="26" opacity="0.85" />
            <rect x="530" y="272" width="280" height="26" opacity="0.85" />
            <rect x="530" y="320" width="460" height="10" opacity="0.4" />
            <rect x="530" y="342" width="400" height="10" opacity="0.4" />
            <rect x="530" y="364" width="430" height="10" opacity="0.4" />
            <rect x="530" y="470" width="160" height="40" fill="var(--color-accent)" />
            <rect x="706" y="470" width="160" height="40" opacity="0.25" />
          </g>
          <circle cx="800" cy="163" r="3" fill="var(--ill-laptop-shade)" />
          <rect x="488" y="572" width="624" height="7" fill="var(--ill-bezel)" />
          <rect x="488" y="579" width="624" height="7" fill="var(--ill-laptop-shade)" />
          {k.sheet({ d: poly([[440, 586], [1160, 586], [1206, 652], [394, 652]]), fill: 'var(--ill-laptop)', gap: 16, edge: 0 })}
          {k.sheet({ d: poly([[394, 652], [1206, 652], [1200, 664], [400, 664]]), fill: 'var(--ill-laptop-shade)', edge: 0, rim: false })}
          {/* Keys: real rows of small pressed keys, each with a lit lip. */}
          <path
            d={[keyRow(492, 1108, 592, 9, 16), keyRow(484, 1116, 604, 9, 15), keyRow(476, 1124, 616, 9, 14)].join('') + rect(640, 628, 320, 7, 1.5)}
            fill="var(--ill-laptop-shade)"
          />
          <path d="M492 592.6H1108M484 604.6H1116M476 616.6H1124" stroke="var(--paper-cut)" strokeWidth="1" />
          {k.sheet({ d: poly([[716, 636], [884, 636], [892, 648], [708, 648]]), fill: 'var(--ill-laptop-shade)', edge: 0, gap: 0, rim: true, material: 'none' })}
        </>
      ),
    },
    {
      id: 'lamp-light',
      band: 'mid',
      z: 10,
      box: { x: 460, y: 320, w: 780, h: 380 },
      className: 'lamp-glow',
      art: (
        <g style={{ opacity: 'var(--glow-opacity)' }}>
          <polygon points="1138,334 1226,374 1080,652 560,652" fill="var(--ill-lamp-light)" />
          <g fill="var(--ill-bulb)">
            <ellipse cx="860" cy="652" rx="380" ry="46" opacity="0.07" />
            <ellipse cx="860" cy="652" rx="260" ry="32" opacity="0.09" />
            <ellipse cx="860" cy="652" rx="140" ry="18" opacity="0.12" />
          </g>
        </g>
      ),
    },
    {
      id: 'figurine',
      band: 'mid',
      z: 20,
      box: FIGURINE,
      className: 'stage-fig',
      html: <FigurineSlot poster={poster} />,
    },
    {
      id: 'props',
      band: 'front',
      z: 60,
      box: { x: 1160, y: 410, w: 450, h: 350 },
      art: (
        <>
          {/* Mug beside the lamp. */}
          {k.sheet({ d: `${rect(1150, 614, 42, 42, 18)}${rect(1162, 626, 22, 18, 8)}`, fillRule: 'evenodd', fill: 'var(--ill-mug)', gap: 14, edge: 3 })}
          {k.sheet({ d: rect(1178, 598, 88, 96, 4), fill: 'var(--ill-mug)', gap: 16, edge: 4 })}
          {k.sheet({ d: ellipse(1222, 604, 38, 5), fill: 'var(--ill-coffee)', edge: 0, rim: false, material: 'none' })}
          {/* Paper plant: each leaf two halves along the midrib, stacked over the pot. */}
          {[
            { tip: [1440, 462], ctrl: [1452, 540], bend: [1488, 520] },
            { tip: [1500, 430], ctrl: [1490, 520], bend: [1530, 500] },
            { tip: [1580, 470], ctrl: [1540, 530], bend: [1570, 540] },
            { tip: [1418, 548], ctrl: [1460, 580], bend: [1470, 556] },
            { tip: [1596, 560], ctrl: [1552, 586], bend: [1566, 566] },
          ].map(({ tip, ctrl, bend }) => (
            <g key={`${tip[0]}`}>
              {k.sheet({
                d: `M1516 612Q${ctrl[0]} ${ctrl[1]} ${tip[0]} ${tip[1]}Q${bend[0]} ${bend[1]} 1516 612Z`,
                fill: 'var(--ill-leaf)',
                gap: 22,
                edge: 2,
              })}
              <path
                d={`M1516 612Q${(ctrl[0] + bend[0]) / 2} ${(ctrl[1] + bend[1]) / 2} ${tip[0]} ${tip[1]}Q${bend[0]} ${bend[1]} 1516 612Z`}
                fill="var(--ill-leaf-fold)"
              />
            </g>
          ))}
          {k.sheet({ d: poly([[1462, 624], [1570, 624], [1554, 744], [1478, 744]]), fill: 'var(--ill-pot)', gap: 18, edge: 4, material: 'kraft' })}
          <polygon
            points="1516,628 1570,624 1554,744 1516,744"
            fill="var(--paper-fold)"
            style={{ transform: 'scaleX(var(--light-x))', transformOrigin: '1516px 0px', transformBox: 'view-box' }}
          />
          {k.sheet({ d: rect(1452, 606, 128, 22, 2), fill: 'var(--ill-pot-rim)', gap: 8, edge: 4, material: 'kraft' })}
        </>
      ),
    },
    {
      id: 'chair',
      band: 'front',
      z: 170,
      box: { x: 1030, y: 750, w: 360, h: 300 },
      art: (
        <>
          {k.stack({
            d: 'M1064 1040V830Q1064 784 1110 784H1314Q1360 784 1360 830V1040Z',
            fill: 'var(--ill-chair)',
            layers: 3,
            step: 6,
            gap: 90,
            edge: 4,
            material: 'kraft',
          })}
          <path d="M1096 876H1328" stroke="var(--pk-dark)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.35" />
        </>
      ),
    },
  ];

  const screenVars = {
    '--screen-x': `${(SCREEN.x / STAGE.width) * 100}%`,
    '--screen-y': `${(SCREEN.y / STAGE.height) * 100}%`,
    '--screen-w': `${(SCREEN.w / STAGE.width) * 100}%`,
    '--screen-h': `${(SCREEN.h / STAGE.height) * 100}%`,
  } as CSSProperties;

  return (
    <ShadowBox
      className={className}
      style={screenVars}
      after={
        <LaptopScreenUI
          screen={screen}
          className="relative z-scene-mid mt-4 md:absolute md:top-(--screen-y) md:left-(--screen-x) md:mt-0 md:h-(--screen-h) md:w-(--screen-w)"
        />
      }
    >
      <PaperScene layers={layers} frames={FRAMES} label="desk">
        <DeskLamp style={frameVars(LAMP, FRAMES)} />
        <DeskSpeaker style={frameVars(SPEAKER, FRAMES)} />
      </PaperScene>
    </ShadowBox>
  );
}
