import { circle, paperKit, poly, rect, type Kit } from '../../../lib/paper-kit';
import type { PoseId } from '../../scene/figurine-parts';
import type { Frames, SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { STRIP, figureLayer, floorLayer, stateCss, wallLayer } from '../office';

/*
  Station `03` — The Filing Cabinet (DesignRules.md §2.2, §4.5 `03`), midday,
  seen from slightly above with the top drawer pulled open. One hanging folder
  per role, oldest at the back, newest in front; each tab carries the role's
  start year. Opening a ledger row lifts its folder (CSS :has, no JS), and the
  Organisation tab swaps the folder set. The same cabinet, emptied, is the 404.
*/

export const CABINET_FRAMES: Frames = { desktop: STRIP, mobile: { x: 380, y: 60, w: 900, h: 580 } };

export type FolderSet = { name: 'work' | 'organization'; years: string[] };

const C = { x: 560, y: 150, w: 480, h: 446 };

/** Cabinet body with the top slot open and two closed drawers. */
function cabinetBody(k: Kit) {
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
function drawerInside(k: Kit) {
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

/** Hanging folders of one set, back (oldest) to front (newest). */
function folders(k: Kit, set: FolderSet) {
  const n = set.years.length;
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const t = n === 1 ? 1 : 1 - i / (n - 1);
    const top = 180 + t * 92;
    const inset = 40 - t * 44;
    const x0 = C.x + inset;
    const x1 = C.x + C.w - inset;
    const tabW = 92;
    const tabX = x0 + 24 + ((n - 1 - i) % 4) * ((x1 - x0 - tabW - 48) / 3);
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
        <text x={tabX + tabW / 2} y={top + 13.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--color-ink)">
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
function drawerFront(k: Kit) {
  return (
    <>
      {k.sheet({ d: rect(C.x - 22, 350, C.w + 44, 116, 2), fill: 'var(--ill-cabinet)', gap: 70, edge: 5 })}
      {k.sheet({ d: rect(C.x + C.w / 2 - 40, 372, 80, 26, 1), fill: 'var(--ill-cabinet-shade)', gap: 3, edge: 1 })}
      {k.sheet({ d: rect(C.x + C.w / 2 - 34, 376, 68, 18, 1), fill: 'var(--ill-page)', gap: 2, edge: 0.8, rim: false })}
      <text x={C.x + C.w / 2} y={389.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--color-accent)">
        03
      </text>
      {k.sheet({ d: rect(C.x + C.w / 2 - 60, 420, 120, 16, 7), fill: 'var(--ill-cabinet-shade)', gap: 10, edge: 2 })}
    </>
  );
}

export function CabinetStation({
  sets,
  pose = 'folder',
  name = 'cabinet',
  wide = false,
  only,
}: {
  sets: FolderSet[];
  pose?: PoseId;
  name?: string;
  /** Chapter stage (§4.5 `03`): wall and floor bleed for the fullscreen fit. */
  wide?: boolean;
  /** Render only these layers (the drawer-front occluder copy). */
  only?: readonly string[];
}) {
  const k = paperKit(name);

  const layers: SceneLayer[] = [
    wallLayer(k, { beam: 'M-40 90L160 90L720 566L-40 566Z', wide }),
    floorLayer(k, undefined, wide),
    {
      id: 'cabinet',
      band: 'back',
      z: -220,
      box: { x: C.x - 10, y: C.y - 22, w: C.w + 20, h: C.h + 26 },
      art: (
        <>
          {cabinetBody(k)}
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
      art: drawerInside(k),
    },
    {
      id: 'folders',
      band: 'mid',
      z: -90,
      box: { x: C.x - 10, y: C.y, w: C.w + 20, h: 330 },
      art: <>{sets.map((set) => folders(k, set))}</>,
    },
    {
      id: 'drawer-front',
      band: 'mid',
      z: -40,
      box: { x: C.x - 30, y: 340, w: C.w + 60, h: 136 },
      art: drawerFront(k),
    },
    figureLayer(pose, 950, 96, 500),
    {
      id: 'boxes',
      band: 'front',
      z: 90,
      box: { x: 250, y: 380, w: 270, h: 230 },
      desktopOnly: true,
      art: (
        <>
          {[0, 1].map((i) => {
            const y = 492 - i * 102;
            const x = 280 + i * 18;
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

  const css = stateCss(
    'experience',
    sets.flatMap((set) =>
      set.years.map((_, i) => ({ when: `details[data-row="${set.name}-${i}"][open]`, key: `${set.name}-${i}`, transform: 'translateY(-34px)' })),
    ),
  );

  return <Station name={name} layers={layers} frames={CABINET_FRAMES} light="midday" css={sets.length ? css : undefined} only={only} />;
}
