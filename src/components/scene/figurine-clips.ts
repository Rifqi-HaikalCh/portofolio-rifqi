import { POSES, type Angles, type Expression, type JointId } from './figurine-parts';
import type { JointAngles } from './figurine-rig';

/*
  On-demand animation clips for the 3D puppet (DesignRules.md §2.7, §10.2).
  A clip eases joints from the base pose toward its target, holds, and eases
  back. Joint rotations only, max 25° away from a rest pose except the wave.
  Nothing loops: the blink is a single 120 ms clip that the model schedules.
*/

export type ClipId = 'wave' | 'look' | 'lamp' | 'think' | 'blink';

export type Clip = {
  joints: JointAngles;
  expression?: Expression;
  /** Seconds. */
  in: number;
  hold: number;
  out: number;
  /** Holds until released (EQbot open). */
  sustain?: boolean;
};

/** v3.13: standing beside the desk (was `seated` on the notebook). */
export const BASE_POSE = POSES.lean;

export const CLIPS: Record<ClipId, Clip> = {
  // Greeting on the first 3D frame: the far (left) arm waves twice.
  wave: {
    joints: { shoulderL: [0, 0, 138], elbowL: [0, 0, -24], wristL: [0, 0, -6], head: [0, 10, 4] },
    expression: 'smile',
    in: 0.35,
    hold: 0.75,
    out: 0.35,
  },
  // Hover or focus on the laptop: head and eyes toward the screen.
  look: { joints: { head: [0, 28, -4] }, in: 0.4, hold: 0.9, out: 0.45 },
  // Theme switch from the lamp: a small startle toward the lamp.
  lamp: {
    joints: { head: [0, 34, -8], shoulderL: [0, 0, 1], chest: [0, 6, 0] },
    expression: 'smile',
    in: 0.25,
    hold: 0.6,
    out: 0.5,
  },
  // EQbot open: left hand to the chin, brows up, held while the sheet is open.
  think: {
    joints: { shoulderL: [35, 0, -40], elbowL: [-30, 0, -156], wristL: [0, 0, 10], head: [0, 8, -7] },
    expression: 'thinking',
    in: 0.6,
    hold: 0,
    out: 0.5,
    sustain: true,
  },
  blink: { joints: {}, expression: 'blink', in: 0, hold: 0.12, out: 0 },
};

/** Extra joint swing layered on the wave hold: two forearm swings. */
function waveSwing(t: number, clip: Clip): JointAngles {
  const start = clip.in;
  const end = clip.in + clip.hold;
  if (t < start || t > end) return {};
  const phase = (t - start) / (end - start);
  return { elbowL: [0, 0, Math.sin(phase * Math.PI * 4) * 22] };
}

/* --ease-paper, approximated: a calm ease-out. */
const ease = (x: number) => 1 - (1 - x) ** 3;

export type ActiveClip = { id: ClipId; start: number; release?: number };

/** Weight 0–1 of a running clip at time `now` (seconds); null once finished. */
export function clipWeight(active: ActiveClip, now: number): number | null {
  const clip = CLIPS[active.id];
  const t = now - active.start;
  if (t < 0) return 0;
  if (clip.in > 0 && t < clip.in) return ease(t / clip.in);
  if (clip.sustain && active.release === undefined) return 1;
  const holdEnd = clip.sustain ? (active.release as number) - active.start : clip.in + clip.hold;
  const outStart = Math.max(holdEnd, clip.in);
  if (t < outStart) return 1;
  if (clip.out === 0) return t < outStart + 1e-3 ? 1 : null;
  const o = (t - outStart) / clip.out;
  return o >= 1 ? null : 1 - ease(o);
}

const lerp = (a: number, b: number, w: number) => a + (b - a) * w;

/** Blend running clips over the base pose. Later clips win where they overlap. */
export function sample(running: ActiveClip[], now: number) {
  const joints: Partial<Record<JointId, Angles>> = { ...BASE_POSE.joints };
  let expression: Expression = BASE_POSE.expression;
  let expressionWeight = 0;
  const finished: ActiveClip[] = [];

  for (const active of running) {
    const w = clipWeight(active, now);
    if (w === null) {
      finished.push(active);
      continue;
    }
    const clip = CLIPS[active.id];
    const extra = active.id === 'wave' ? waveSwing(now - active.start, clip) : {};
    for (const [id, target] of Object.entries(clip.joints) as Array<[JointId, Angles]>) {
      const from = joints[id] ?? [0, 0, 0];
      const swing = extra[id] ?? [0, 0, 0];
      joints[id] = [
        lerp(from[0], target[0] + swing[0], w),
        lerp(from[1], target[1] + swing[1], w),
        lerp(from[2], target[2] + swing[2], w),
      ];
    }
    // The face swaps parts, so it changes at the midpoint of the ease.
    if (clip.expression && w >= 0.5 && w >= expressionWeight) {
      expression = clip.expression;
      expressionWeight = w;
    }
  }

  return { joints, expression, finished };
}
