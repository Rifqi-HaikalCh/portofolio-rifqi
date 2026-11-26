import Image from 'next/image';
import type { CSSProperties } from 'react';
import { circle, paperKit, poly, rect, type Kit } from '../../../lib/paper-kit';
import { DeskLamp } from '../../scene/DeskLamp';
import type { PoseId } from '../../scene/figurine-parts';
import { frameVars, type Frames, type SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { STRIP, figureLayer, floorLayer, wallLayer } from '../office';
import { T } from '../../ui/T';
import { lampGeometry, lampLayers, type LampSpec } from '../lamp';
import { BOARD, BOARD_CENTRE, DIVIDER_X, LIT0, SAG, STEP, ZONE_TAG, lightPath, roleSlots, routeOf } from './board';

/*
  Station `03` — The Filing Cabinet (DesignRules.md §2.2, §4.5 `03`), midday,
  seen from slightly above with the top drawer pulled open. One hanging folder
  per role, oldest at the back, newest in front; each tab carries the role's
  start year. Each role's sheet comes out of its own folder, which lifts while
  that beat is on; reaching the organisation roles swaps the folder set
  (scene.css). The same cabinet, emptied, is the 404.
*/

export const CABINET_FRAMES: Frames = { desktop: STRIP, mobile: { x: 380, y: 60, w: 900, h: 580 } };
/** The Experience stage (v3.19): the cabinet moved right for the career board, so its phone window is wider. */
export const EXPERIENCE_FRAMES: Frames = { desktop: STRIP, mobile: { x: 530, y: 40, w: 1090, h: 600 } };

export type FolderSet = { name: 'work' | 'organization'; years: string[] };

const BASE = { x: 560, y: 150, w: 480, h: 446 };
type Box = typeof BASE;

/** Industrial articulated C-clamp boom lamp aimed into the pulled-out top drawer (§1.11, §2.3 v3.26). */
export const cabinetLamp = (shift = 0): LampSpec => {
  const cx = BASE.x + shift;
  return {
    kind: 'clamp',
    base: [cx + 498, -14],
    elbow: [cx + 454, -52],
    head: [cx + 388, -6],
    aim: [cx + 235, 342],
    spread: 195,
    plane: 'floor',
    surfaceY: 342,
    z: -55,
  };
};

/** One company pinned on the career board. */
export type PinSpec = { logo?: string; mono: string; year: string; /** The role is still going (a NOW badge). */ now?: boolean };

/** Cabinet body with the top slot open and two closed drawers. */
function cabinetBody(k: Kit, C: Box) {
  return (
    <>
      {k.sheet({ d: rect(C.x, C.y, C.w, C.h, 2), fill: 'var(--ill-cabinet)', gap: 60, edge: 5 })}
      {k.sheet({ d: poly([[C.x - 6, C.y - 18], [C.x + C.w + 6, C.y - 18], [C.x + C.w, C.y], [C.x, C.y]]), fill: 'var(--ill-cabinet)', gap: 0, edge: 0 })}
      {/* The open slot: dark interior. */}
      <rect x={C.x + 24} y={C.y + 20} width={C.w - 48} height="128" fill="var(--pk-dark)" opacity="0.55" />
      {[0, 1].map((i) => {
        const y = 340 + i * 124;
        return (
          <g key={i}>
            {k.sheet({ d: rect(C.x + 20, y, C.w - 40, 110, 2), fill: 'var(--ill-cabinet)', gap: 6, edge: 3 })}
            {k.sheet({ d: rect(C.x + C.w / 2 - 34, y + 22, 68, 22, 1), fill: 'var(--ill-cabinet-shade)', gap: 3, edge: 1 })}
            {k.sheet({ d: rect(C.x + C.w / 2 - 50, y + 58, 100, 14, 6), fill: 'var(--ill-cabinet-shade)', gap: 8, edge: 2 })}
          </g>
        );
      })}
    </>
  );
}

/** The pulled-out drawer seen from above: floor, side walls, back wall. */
function drawerInside(k: Kit, C: Box) {
  return (
    <>
      {k.sheet({ d: poly([[C.x + 30, C.y + 24], [C.x + C.w - 30, C.y + 24], [C.x + C.w + 12, 360], [C.x - 12, 360]]), fill: 'var(--ill-cabinet-shade)', gap: 20, edge: 0, rim: false })}
      {k.sheet({ d: poly([[C.x + 30, C.y + 24], [C.x + 44, C.y + 24], [C.x + 6, 360], [C.x - 12, 360]]), fill: 'var(--ill-cabinet)', gap: 0, edge: 2 })}
      {k.sheet({ d: poly([[C.x + C.w - 44, C.y + 24], [C.x + C.w - 30, C.y + 24], [C.x + C.w + 12, 360], [C.x + C.w - 6, 360]]), fill: 'var(--ill-cabinet)', gap: 0, edge: 2 })}
      {/* Hanging rails along the walls. */}
      <path d={`M${C.x + 38} ${C.y + 30}L${C.x + 2} 352M${C.x + C.w - 38} ${C.y + 30}L${C.x + C.w - 2} 352`} stroke="var(--paper-cut)" strokeWidth="2" />
    </>
  );
}

const TAB_W = 92;

/** Where folder `i` of `n` hangs (0 = newest, in front): its top edge, side edges and tab. */
function folderAt(n: number, i: number, dx = 0) {
  const t = n === 1 ? 1 : 1 - i / (n - 1);
  const top = 180 + t * 92;
  const inset = 40 - t * 44;
  const x0 = BASE.x + dx + inset;
  const x1 = BASE.x + dx + BASE.w - inset;
  const tabX = x0 + 24 + ((n - 1 - i) % 4) * ((x1 - x0 - TAB_W - 48) / 3);
  return { top, x0, x1, tabX };
}

/**
 * The mouth of folder `i` of `n`, in world coordinates, for an Emerge origin (§4.1): the sheet
 * starts inside the folder under its tab and comes up past the drawer front.
 */
export function folderMouth(n: number, i: number, dx = 0) {
  const { top, tabX } = folderAt(n, i, dx);
  const x = Math.round(tabX + TAB_W / 2);
  return { from: [x, Math.round(top + 58)] as const, via: [x, Math.round(top - 100)] as const };
}

/** Hanging folders of one set, back (oldest) to front (newest). */
function folders(k: Kit, set: FolderSet, dx: number) {
  const n = set.years.length;
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const { top, x0, x1, tabX } = folderAt(n, i, dx);
    const tabW = TAB_W;
    const fill = i % 2 === 0 ? 'var(--ill-folder)' : 'var(--ill-kraft)';
    out.push(
      <g key={`${set.name}-${i}`} data-obj={`${set.name}-${i}`}>
        {k.sheet({
          d: `M${x0} ${top + 18}H${tabX}V${top + 4}Q${tabX} ${top} ${tabX + 4} ${top}H${tabX + tabW - 4}Q${tabX + tabW} ${top} ${tabX + tabW} ${top + 4}V${top + 18}H${x1}V${top + 150}H${x0}Z`,
          fill,
          gap: 16,
          edge: 2.5,
        })}
        {k.sheet({ d: rect(tabX + 10, top + 3, tabW - 20, 13, 1), fill: 'var(--ill-page)', gap: 2, edge: 0.8, rim: false })}
        <text x={tabX + tabW / 2} y={top + 13.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--ill-page-ink)">
          {set.years[i]}
        </text>
      </g>,
    );
  }
  return (
    <g key={set.name} data-set={set.name}>
      {out}
    </g>
  );
}

/** The drawer front of the pulled drawer, in front of the folders. */
function drawerFront(k: Kit, C: Box) {
  return (
    <>
      {k.sheet({ d: rect(C.x - 22, 350, C.w + 44, 116, 2), fill: 'var(--ill-cabinet)', gap: 70, edge: 5 })}
      {k.sheet({ d: rect(C.x + C.w / 2 - 40, 372, 80, 26, 1), fill: 'var(--ill-cabinet-shade)', gap: 3, edge: 1 })}
      {k.sheet({ d: rect(C.x + C.w / 2 - 34, 376, 68, 18, 1), fill: 'var(--ill-page)', gap: 2, edge: 0.8, rim: false })}
      <text x={C.x + C.w / 2} y={389.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--ill-page-accent)">
        03
      </text>
      {k.sheet({ d: rect(C.x + C.w / 2 - 60, 420, 120, 16, 7), fill: 'var(--ill-cabinet-shade)', gap: 10, edge: 2 })}
    </>
  );
}

/* ---- The career board (v3.19, two paths v3.20) ----------------------------- */

/** The board, its pre-printed routes, the threads, the pins (company logos), the zone labels and the walkers. */
function boardLayers(k: Kit, pins: PinSpec[], sets: FolderSet[]): SceneLayer[] {
  const B = BOARD;
  const slots = roleSlots(sets[0]?.years.length ?? 0, sets[1]?.years.length ?? 0);
  const pct = (v: number, o: number, size: number) => `${Math.round(((v - o) / size) * 10000) / 100}%`;
  const zones = (['work', 'organization'] as const).filter((z) => slots.some((s) => s.zone === z));
  const roleIds = sets.flatMap((set) => set.years.map((_, i) => `${set.name}-${i}`));
  return [
    {
      id: 'board',
      band: 'back',
      z: -200,
      box: { x: B.x - 20, y: B.y - 20, w: B.w + 40, h: B.h + 40 },
      art: (
        <>
          {k.sheet({ d: rect(B.x - 14, B.y - 14, B.w + 28, B.h + 28, 3), fill: 'var(--color-wood)', gap: 34, edge: 4, material: 'wood' })}
          {k.sheet({ d: rect(B.x, B.y, B.w, B.h, 1), fill: 'var(--ill-page)', gap: 6, edge: 1.5 })}
          <path
            d={Array.from({ length: 7 }, (_, i) => `M${B.x + 8 + i * 46} ${B.y + 6}V${B.y + B.h - 6}`).join('') + Array.from({ length: 6 }, (_, i) => `M${B.x + 6} ${B.y + 12 + i * 49}H${B.x + B.w - 6}`).join('')}
            stroke="var(--ill-page-muted)"
            strokeWidth="0.8"
            opacity="0.26"
          />
          {/* A rule between the two paths. */}
          {zones.length > 1 && <path d={`M${DIVIDER_X} ${B.y + 44}V${B.y + B.h - 14}`} stroke="var(--ill-page-muted)" strokeWidth="1.4" strokeDasharray="1 5" strokeLinecap="round" opacity="0.65" />}
          {/* Each route is printed in advance; the threads draw over it as the pins arrive. */}
          {zones.map((zone) => (
            <path key={zone} d={routeOf(slots, zone)} fill="none" stroke="var(--ill-page-muted)" strokeWidth="2.4" strokeDasharray="2 7" strokeLinecap="round" opacity="0.6" />
          ))}
          {slots.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r="23" fill="none" stroke="var(--ill-page-muted)" strokeWidth="1.6" strokeDasharray="3 5" opacity="0.55" />
          ))}
        </>
      ),
    },
    {
      id: 'threads',
      band: 'mid',
      z: -170,
      box: { x: B.x, y: B.y, w: B.w, h: B.h },
      art: (
        <>
          {slots.map((s, i) => {
            const before = slots[i - 1];
            if (!before || before.zone !== s.zone) return null;
            return (
              <path
                key={i}
                data-obj={`thread-${i}`}
                d={`M${before.x} ${before.y}Q${(before.x + s.x) / 2} ${(before.y + s.y) / 2 + SAG} ${s.x} ${s.y}`}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            );
          })}
          {/* The light that runs each path from START to NOW at the closing beat (hidden until then). */}
          {zones.map((zone) => {
            const { d, length, steps } = lightPath(slots, zone);
            const tail = 46;
            const dur = Math.round(((length + tail) / length) * steps * STEP * 100) / 100;
            const vars = { '--o0': tail, '--o1': -length, '--T': `${dur}s`, '--lit0': `${LIT0}s` } as CSSProperties;
            return (
              <g key={zone}>
                <path className="career-light career-light-tail" d={d} strokeDasharray={`${tail} ${length + tail}`} style={vars} />
                <path className="career-light career-light-head" d={d} strokeDasharray={`14 ${length + 14}`} style={{ ...vars, '--o0': 14, '--T': `${Math.round(((length + 14) / length) * steps * STEP * 100) / 100}s` } as CSSProperties} />
              </g>
            );
          })}
        </>
      ),
    },
    {
      id: 'pins',
      band: 'mid',
      z: -150,
      box: { x: B.x, y: B.y, w: B.w, h: B.h },
      html: (
        <div className="career-pins" aria-hidden="true">
          {zones.map((zone) => (
            <span key={zone} className="career-tag" style={{ left: pct(ZONE_TAG[zone].x, B.x, B.w), top: pct(ZONE_TAG[zone].y, B.y, B.h) }}>
              {zone === 'work' ? <T en="Work path" id="Jalur kerja" /> : <T en="Organization" id="Organisasi" />}
            </span>
          ))}
          {pins.map((pin, i) => (
            <span
              key={i}
              data-obj={`pin-${i}`}
              data-role={roleIds[i]}
              data-j={slots[i].j}
              className="career-pin"
              style={{ left: pct(slots[i].x, B.x, B.w), top: pct(slots[i].y, B.y, B.h), '--lit': `${LIT0 + slots[i].j * STEP}s` } as CSSProperties}
            >
              {pin.logo ? <Image src={pin.logo} alt="" width={96} height={96} quality={90} /> : <b>{pin.mono}</b>}
              <i className="career-pin-head" />
              <small>{pin.year}</small>
              {slots[i].j === 0 && (
                <em className="career-badge career-start">
                  <T en="Start" id="Mulai" />
                </em>
              )}
              {pin.now && (
                <>
                  <em className="career-badge career-now">
                    <i />
                    <T en="Now" id="Kini" />
                  </em>
                  {/* Small fireworks over the current role, once the light has run the path (boardCss). */}
                  <span className="career-fw" style={{ '--t': `${Math.round((LIT0 + slots[i].j * STEP + 0.05) * 100) / 100}s` } as CSSProperties}>
                    <b className="fw-rocket" />
                    {Array.from({ length: 12 }, (_, n) => (
                      <i key={`a${n}`} className="fa" style={{ '--a': `${n * 30}deg` } as CSSProperties} />
                    ))}
                    {Array.from({ length: 12 }, (_, n) => (
                      <i key={`b${n}`} className="fb" style={{ '--a': `${n * 30 + 15}deg` } as CSSProperties} />
                    ))}
                    {Array.from({ length: 8 }, (_, n) => (
                      <i key={`c${n}`} className="fc" style={{ '--ex': `calc(${(n - 3.5) * 9} * var(--s, 0.6px))` } as CSSProperties} />
                    ))}
                  </span>
                </>
              )}
            </span>
          ))}
        </div>
      ),
    },
  ];
}

/**
 * Theatre-only state: each pin (and the thread that joins it to its neighbour on the path) arrives as
 * the next file comes forward, the last one with the board beat; the lane is narrower so the board
 * stays clear of it; the last beat zooms in on the board, and a light runs along each path from START
 * (pin glow, thread glow) to the current role, which then sets off a small firework. The composed
 * station (reduced motion, stacked, phone) shows every pin and no light.
 */
function boardCss(sets: FolderSet[]) {
  const ids = sets.flatMap((set) => set.years.map((_, i) => `${set.name}-${i}`));
  const slots = roleSlots(sets[0]?.years.length ?? 0, sets[1]?.years.length ?? 0);
  const sel = '#experience[data-cue]:not([data-stacked])';
  const [cx, cy] = BOARD_CENTRE;
  const lit = `${sel}[data-reached~="board"]`;
  let body = `@media (min-width: 1024px){${sel}{--lane-w:min(24rem,32cqw)}}`;
  ids.forEach((_, i) => {
    const next = ids[i + 1] ?? 'board';
    body +=
      `${sel} [data-obj="pin-${i}"]{opacity:0;pointer-events:none;translate:-50% -230%;scale:1.8;transition:opacity .25s var(--ease-paper) .45s,translate .5s var(--ease-leaf) .45s,scale .5s var(--ease-leaf) .45s}` +
      `${sel}[data-reached~="${next}"] [data-obj="pin-${i}"]{opacity:1;pointer-events:auto;translate:-50% -50%;scale:1}`;
    const before = slots[i - 1];
    if (before && before.zone === slots[i].zone) {
      const len = Math.ceil(Math.hypot(slots[i].x - before.x, slots[i].y - before.y) * 1.03) + 2;
      body +=
        `${sel} [data-obj="thread-${i}"]{stroke-dasharray:${len};stroke-dashoffset:${len};transition:stroke-dashoffset .8s var(--ease-paper) .55s}` +
        `${sel}[data-reached~="${next}"] [data-obj="thread-${i}"]{stroke-dashoffset:0}`;
    }
  });
  // v3.23: at the closing beat a pin brings its role's sheet back as a card (CareerPinClicks), folded out of its
  // pin by the exit flight played backwards, and puts it away by the flight forwards; the path is not replayed.
  ids.forEach((id) => {
    const sheet = `[data-beat="${id}"] > .beat-sheet`;
    body +=
      `${sel}[data-peek="${id}"] ${sheet}{opacity:1!important;pointer-events:auto!important;animation:b-experience-${id}-out-r var(--dur-leaf-out) var(--ease-leaf) reverse both!important}` +
      `${sel}[data-peek-out="${id}"] ${sheet}{pointer-events:none;animation:b-experience-${id}-out var(--dur-leaf-out) var(--ease-leaf) both!important}`;
  });
  body += `${sel}[data-peek] [data-beat="board"] > .beat-sheet{opacity:0!important;pointer-events:none!important}`;
  body +=
    `${sel}{--brd-z:2}@media (max-aspect-ratio: 17/10){${sel}{--brd-z:1.7}}` +
    `${sel} .stage-canvas{transform-origin:calc(${cx} * var(--s)) calc(${cy} * var(--s));transition:scale 1.1s var(--ease-paper),translate 1.1s var(--ease-paper)}` +
    `${sel}[data-beat="board"] .stage-canvas{scale:var(--brd-z);translate:calc(var(--cxs) - ${cx} * var(--s) + 17cqw) calc(var(--cys) + 2rem - ${cy} * var(--s))}` +
    // The light: a comet along each path (tail and head) and each pin's ring and head glowing as it passes.
    `${lit} .career-light-tail{opacity:.8;animation:career-run var(--T) linear var(--lit0) both}` +
    `${lit} .career-light-head{opacity:1;animation:career-run var(--T) linear var(--lit0) both}` +
    `${lit} .career-pin{animation:career-glow 1.1s ease-in-out var(--lit) both}` +
    `${lit} .career-pin .career-pin-head{animation:career-head 1.1s ease-in-out var(--lit) both}` +
    // The firework over the current role: a rocket goes up, then the burst (streaks, a second ring, falling embers).
    `${lit} .fw-rocket{animation:career-rocket .45s ease-in var(--t) forwards}` +
    `${lit} .career-fw .fa,${lit} .career-fw .fb{animation:career-spark 1.35s cubic-bezier(.12,.75,.3,1) calc(var(--t) + .45s) forwards}` +
    `${lit} .career-fw .fb{animation-delay:calc(var(--t) + .6s)}` +
    `${lit} .career-fw .fc{animation:career-ember 1.5s ease-in calc(var(--t) + .5s) forwards}` +
    `${lit} .career-fw::before{animation:career-flash .8s ease-out calc(var(--t) + .45s) forwards}`;
  return `@supports (animation-timeline: view()){@media (prefers-reduced-motion: no-preference) and (min-height: 561px) and (min-width: 768px){${body}}}`;
}

export function CabinetStation({
  sets,
  pose = 'folder',
  name = 'cabinet',
  wide = false,
  only,
  shift = 0,
  pins,
}: {
  sets: FolderSet[];
  pose?: PoseId;
  name?: string;
  /** Chapter stage (§4.5 `03`): wall and floor bleed for the fullscreen fit. */
  wide?: boolean;
  /** Render only these layers (the drawer-front occluder copy). */
  only?: readonly string[];
  /** Move the cabinet, the figure and the boxes right (v3.19: room for the career board). */
  shift?: number;
  /** The companies pinned on the career board, newest first; a board is drawn only when given. */
  pins?: PinSpec[];
}) {
  const k = paperKit(name);
  const C: Box = { ...BASE, x: BASE.x + shift };

  const layers: SceneLayer[] = [
    wallLayer(k, { beam: 'M-40 90L160 90L720 566L-40 566Z', wide }),
    floorLayer(k, undefined, wide),
    ...(pins?.length ? boardLayers(k, pins, sets) : []),
    {
      id: 'cabinet',
      band: 'back',
      z: -220,
      box: { x: C.x - 10, y: C.y - 22, w: C.w + 20, h: C.h + 26 },
      art: (
        <>
          {cabinetBody(k, C)}
          {/* On the cabinet: a letter tray and a small cactus. */}
          {k.sheet({ d: poly([[C.x + 40, C.y - 40], [C.x + 190, C.y - 40], [C.x + 200, C.y - 14], [C.x + 30, C.y - 14]]), fill: 'var(--ill-lamp)', gap: 10, edge: 3 })}
          {k.sheet({ d: rect(C.x + 56, C.y - 52, 120, 14, 1), fill: 'var(--ill-page)', gap: 4, edge: 1.5 })}
          {k.sheet({ d: `M${C.x + 380} ${C.y - 30}V${C.y - 74}Q${C.x + 380} ${C.y - 88} ${C.x + 392} ${C.y - 88}Q${C.x + 404} ${C.y - 88} ${C.x + 404} ${C.y - 74}V${C.y - 30}Z`, fill: 'var(--ill-leaf)', gap: 10, edge: 2 })}
          {k.sheet({ d: poly([[C.x + 368, C.y - 34], [C.x + 416, C.y - 34], [C.x + 410, C.y - 14], [C.x + 374, C.y - 14]]), fill: 'var(--ill-pot)', gap: 8, edge: 2, material: 'kraft' })}
        </>
      ),
    },
    {
      id: 'drawer',
      band: 'mid',
      z: -120,
      box: { x: C.x - 20, y: C.y + 20, w: C.w + 40, h: 220 },
      art: drawerInside(k, C),
    },
    {
      id: 'folders',
      band: 'mid',
      z: -90,
      box: { x: C.x - 10, y: C.y, w: C.w + 20, h: 330 },
      art: <>{sets.map((set) => folders(k, set, shift))}</>,
    },
    {
      id: 'drawer-front',
      band: 'mid',
      z: -40,
      box: { x: C.x - 30, y: 340, w: C.w + 60, h: 136 },
      art: drawerFront(k, C),
    },
    // v3.20: beside the cabinet, not in front of it, and standing on the floor line (the figure's art has a margin under its feet).
    // v3.25: industrial articulated clamp lamp above the cabinet, its faceted bell hood and 3-tier beam aimed into the open drawer.
    ...lampLayers(k, cabinetLamp(shift)),
    figureLayer(pose, shift ? C.x + 445 : 950, shift ? 126 : 96, 500),
    {
      id: 'boxes',
      band: 'front',
      z: 90,
      box: { x: 250 + shift, y: 380, w: 270, h: 230 },
      desktopOnly: true,
      art: (
        <>
          {[0, 1].map((i) => {
            const y = 492 - i * 102;
            const x = 280 + shift + i * 18;
            return (
              <g key={i}>
                {k.sheet({ d: rect(x, y, 210, 104, 2), fill: 'var(--ill-kraft)', gap: i ? 8 : 40, edge: 4, material: 'kraft' })}
                {k.sheet({ d: rect(x, y, 210, 18, 1), fill: 'var(--ill-kraft-dark)', gap: 0, edge: 0, material: 'kraft' })}
                {k.sheet({ d: rect(x + 70, y + 40, 70, 30, 1), fill: 'var(--ill-page)', gap: 3, edge: 1, rim: false })}
                {k.sheet({ d: circle(x + 186, y + 62, 9), fill: 'var(--ill-kraft-dark)', gap: 0, edge: 1, rim: false, material: 'none' })}
              </g>
            );
          })}
        </>
      ),
    },
  ];

  // The folder a role sheet is coming out of lifts while its beat is on (cue state, §4.4 v3.4).
  const css = sets
    .flatMap((set) => set.years.map((_, i) => `#experience[data-beat="${set.name}-${i}"] [data-obj="${set.name}-${i}"]{transform:translateY(-58px)}`))
    .join('');

  const stationCss = (sets.length ? css : '') + (pins?.length ? boardCss(sets) : '');
  const frames = shift ? EXPERIENCE_FRAMES : CABINET_FRAMES;
  return (
    <Station name={name} layers={layers} frames={frames} light="midday" css={stationCss || undefined} only={only}>
      <DeskLamp pointerOnly className="scene-desktop-only" style={frameVars(lampGeometry(cabinetLamp(shift)).hitRect, frames)} />
    </Station>
  );
}
