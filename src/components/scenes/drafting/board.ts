import { poly } from '../../../lib/paper-kit';

/* The drafting board's corners: tilted away, so the top edge is shorter. */
export const TL = [530, 140] as const;
export const TR = [1170, 140] as const;
export const BR = [1224, 468] as const;
export const BL = [476, 468] as const;

/** A point on the board from (u, v) in 0..1 (left→right, top→bottom). */
export function on(u: number, v: number): [number, number] {
  const x0 = TL[0] + (BL[0] - TL[0]) * v;
  const x1 = TR[0] + (BR[0] - TR[0]) * v;
  return [Math.round(x0 + (x1 - x0) * u), Math.round(TL[1] + (BL[1] - TL[1]) * v)];
}

/** A rectangle on the board, in board space. */
export const quad = (u0: number, v0: number, u1: number, v1: number) => poly([on(u0, v0), on(u1, v0), on(u1, v1), on(u0, v1)]);
