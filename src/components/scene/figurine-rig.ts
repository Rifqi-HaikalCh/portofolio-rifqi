import {
  JOINTS,
  PARTS,
  POSES,
  pathPoints,
  type Angles,
  type Expression,
  type JointId,
  type Part,
  type PoseId,
} from './figurine-parts';

/*
  Poses the paper puppet. Works in poster space (x right, y down, z toward the
  viewer). Each joint rotates about its pivot as M = T(p) · Rx · Ry · Rz · T(−p),
  chained from the parent. A flat part at depth z projects orthographically to
  one 2D affine matrix, so the SVG poster is exactly the 3D puppet seen from
  the front (DesignRules.md §9.4).
*/

/** Row-major 3 × 4 affine matrix. */
export type Affine = readonly [number, number, number, number, number, number, number, number, number, number, number, number];

const IDENTITY: Affine = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];
const RAD = Math.PI / 180;

function multiply(a: Affine, b: Affine): Affine {
  const out: number[] = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      let v = a[r * 4] * b[c] + a[r * 4 + 1] * b[4 + c] + a[r * 4 + 2] * b[8 + c];
      if (c === 3) v += a[r * 4 + 3];
      out.push(v);
    }
  }
  return out as unknown as Affine;
}

function rotation([rx, ry, rz]: Angles): Affine {
  const [cx, sx] = [Math.cos(rx * RAD), Math.sin(rx * RAD)];
  const [cy, sy] = [Math.cos(ry * RAD), Math.sin(ry * RAD)];
  const [cz, sz] = [Math.cos(rz * RAD), Math.sin(rz * RAD)];
  const Rx: Affine = [1, 0, 0, 0, 0, cx, -sx, 0, 0, sx, cx, 0];
  const Ry: Affine = [cy, 0, sy, 0, 0, 1, 0, 0, -sy, 0, cy, 0];
  const Rz: Affine = [cz, -sz, 0, 0, sz, cz, 0, 0, 0, 0, 1, 0];
  return multiply(multiply(Rx, Ry), Rz);
}

const translate = (x: number, y: number, z: number): Affine => [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z];

export type JointAngles = Partial<Record<JointId, Angles>>;

/** World matrix of every joint for a set of angles. */
export function solveJoints(angles: JointAngles): Record<JointId, Affine> {
  const world = {} as Record<JointId, Affine>;
  for (const joint of JOINTS) {
    const parent = joint.parent ? world[joint.parent] : IDENTITY;
    const a = angles[joint.id];
    if (!a || (a[0] === 0 && a[1] === 0 && a[2] === 0)) {
      world[joint.id] = parent;
      continue;
    }
    const [px, py, pz] = joint.pivot;
    const local = multiply(multiply(translate(px, py, pz), rotation(a)), translate(-px, -py, -pz));
    world[joint.id] = multiply(parent, local);
  }
  return world;
}

let jointCy: Record<JointId, number> | null = null;
function jointCentreY() {
  if (!jointCy) {
    const sums = new Map<JointId, [number, number]>();
    for (const part of PARTS) {
      const [, y] = centroid(part);
      const [t, n] = sums.get(part.joint) ?? [0, 0];
      sums.set(part.joint, [t + y, n + 1]);
    }
    jointCy = Object.fromEntries(JOINTS.map((j) => {
      const [t, n] = sums.get(j.id) ?? [j.pivot[1], 1];
      return [j.id, t / n];
    })) as Record<JointId, number>;
  }
  return jointCy;
}

const centroids = new Map<string, [number, number]>();
function centroid(part: Part) {
  let c = centroids.get(part.id);
  if (!c) {
    const pts = pathPoints(part.d);
    const sx = pts.reduce((s, p) => s + p[0], 0);
    const sy = pts.reduce((s, p) => s + p[1], 0);
    c = [sx / pts.length, sy / pts.length];
    centroids.set(part.id, c);
  }
  return c;
}

export type PlacedPart = Part & {
  /** SVG matrix(a b c d e f) for this part's sheet. */
  matrix: string;
};

const r4 = (v: number) => Math.round(v * 10000) / 10000;

/** Parts for one pose and expression, sorted back to front, with SVG matrices. */
export function placeParts(pose: PoseId | JointAngles, expression?: Expression): PlacedPart[] {
  const joints = typeof pose === 'string' ? POSES[pose].joints : pose;
  const face = expression ?? (typeof pose === 'string' ? POSES[pose].expression : 'neutral');
  const world = solveJoints(joints);

  const placed = PARTS.filter((part) => !part.only || part.only.includes(face))
    .map((part, index) => {
      const m = world[part.joint];
      // A joint's sheets keep their z order (they share one matrix, as in 3D);
      // joints sort by the depth of their own centre on the figure's centre line,
      // so a thigh folded forward comes in front of the tee.
      const cy = jointCentreY()[part.joint];
      const depth = m[8] * 100 + m[9] * cy + m[11] + part.z;
      const flat = m === IDENTITY;
      const matrix = flat
        ? ''
        : `matrix(${r4(m[0])} ${r4(m[4])} ${r4(m[1])} ${r4(m[5])} ${r4(m[3] + m[2] * part.z)} ${r4(m[7] + m[6] * part.z)})`;
      return { part: { ...part, matrix }, depth, index };
    });
  // v3.12 (owner: "the neck was in front of the head in Services"): a head pitched down
  // (`draw`) moved its centre back past the neck. The neck always sits behind the head.
  const headFront = Math.min(...placed.filter(({ part }) => part.joint === 'head').map((p) => p.depth));
  placed.forEach((p) => {
    if (p.part.joint === 'neck' && p.depth >= headFront) p.depth = headFront - 0.01;
  });
  return placed.sort((a, b) => a.depth - b.depth || a.index - b.index).map(({ part }) => part);
}
