/*
  The career board beside the filing cabinet (DesignRules.md §4.5 `03`, v3.19; two paths v3.20).
  World units of the cabinet station. The cabinet is moved right by EXP_SHIFT to make room for a
  board between the reading lane and the drawer: each role's file comes out of its folder, is read
  in the lane, then folded small and pinned to the board as its company's logo. Work and
  organisation roles are two separate paths: each runs from its START (oldest role) to its end
  (newest, NOW when it is still going), climbing from the bottom of the board. The files arrive
  newest first, so each path is drawn backwards; the closing beat then lights it from START to NOW.
*/

/** How far the cabinet and the figure move right on the Experience stage. */
export const EXP_SHIFT = 310;

/** The board on the wall: a wooden frame round a pale map sheet. */
export const BOARD = { x: 555, y: 34, w: 290, h: 326 };

export type Zone = 'work' | 'organization';

/**
 * Each path climbs: START at the bottom, the newest role at the top (v3.21, owner). Work is a
 * serpentine of two columns (right along the bottom row, back along the next, and so on up);
 * the organisation path is one column on the right.
 */
const ZONES: Record<Zone, { cols: number[]; rows: number[]; perRow: number }> = {
  work: { cols: [598, 688], rows: [290, 200, 110], perRow: 2 },
  organization: { cols: [802], rows: [290, 200], perRow: 1 },
};

/** The rule between the two paths. */
export const DIVIDER_X = 746;

/** Where a zone's label sits on the board. */
export const ZONE_TAG: Record<Zone, { x: number; y: number }> = {
  work: { x: BOARD.x + 14, y: 54 },
  organization: { x: DIVIDER_X + 8, y: 54 },
};

/** One role's place on the board. `j` is its place on its own path: 0 is the START (the oldest role). */
export type RoleSlot = { x: number; y: number; zone: Zone; j: number; n: number };

/** Slots for every role in beat order (work newest first, then organisations newest first). */
export function roleSlots(workN: number, orgN: number): RoleSlot[] {
  const out: RoleSlot[] = [];
  (['work', 'organization'] as const).forEach((zone) => {
    const n = zone === 'work' ? workN : orgN;
    const { cols, rows, perRow } = ZONES[zone];
    for (let i = 0; i < n; i += 1) {
      const j = n - 1 - i;
      const row = Math.floor(j / perRow);
      const c0 = j % perRow;
      const c = perRow > 1 && row % 2 ? perRow - 1 - c0 : c0;
      out.push({ x: cols[c], y: rows[row] ?? rows[rows.length - 1], zone, j, n });
    }
  });
  return out;
}

/** The light reaches the pin `j` of a path at LIT0 + j * STEP seconds after the closing beat, on both paths at once. */
export const LIT0 = 0.9;
export const STEP = 0.55;
/** How far a thread sags between two pins. */
export const SAG = 7;

/** One zone's path as drawn threads (the same curves as the threads) and its length, for the light that runs along it. */
export function lightPath(slots: RoleSlot[], zone: Zone) {
  const pts = slots.filter((s) => s.zone === zone).sort((a, b) => a.j - b.j);
  let d = '';
  let length = 0;
  pts.forEach((p, i) => {
    if (!i) {
      d += `M${p.x} ${p.y}`;
      return;
    }
    const q = pts[i - 1];
    d += `Q${(q.x + p.x) / 2} ${(q.y + p.y) / 2 + SAG} ${p.x} ${p.y}`;
    length += Math.hypot(p.x - q.x, p.y - q.y) * 1.006;
  });
  return { d, length: Math.round(length * 10) / 10, steps: Math.max(1, pts.length - 1) };
}

/** The route of one zone as a polyline from START to the newest role. */
export function routeOf(slots: RoleSlot[], zone: Zone) {
  return slots
    .filter((s) => s.zone === zone)
    .sort((a, b) => a.j - b.j)
    .map((s, i) => `${i ? 'L' : 'M'}${s.x} ${s.y}`)
    .join('');
}

/** The board's centre, the point the last beat zooms about. */
export const BOARD_CENTRE = [BOARD.x + BOARD.w / 2, BOARD.y + BOARD.h / 2] as const;
