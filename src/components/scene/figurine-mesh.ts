import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import type { Part } from './figurine-parts';
import type { Affine } from './figurine-rig';

/*
  Geometry for the 3D paper puppet, built from the same paths as the poster
  (DesignRules.md §9.4). Cut parts are extruded into cardstock
  sheets; details stay flat; line parts become flat strokes. Paths are sampled
  in poster space and flipped to Y-up (Y = −y); joint matrices get the same
  flip (S · M · S), so the front view equals the poster.
*/

export const SHEET_DEPTH = 1.6;

type Pt = [number, number];

/** Sample an absolute M/L/H/V/Q/C/A/Z path into polylines (poster space). */
export function samplePath(d: string, segments = 6): { points: Pt[]; closed: boolean }[] {
  const tokens = d.match(/[MLHVQCAZ]|-?\d*\.?\d+/g) ?? [];
  const out: { points: Pt[]; closed: boolean }[] = [];
  let current: Pt[] = [];
  let cmd = '';
  let x = 0;
  let y = 0;
  let i = 0;
  const num = () => Number(tokens[i++]);
  const flush = (closed: boolean) => {
    if (current.length > 1) out.push({ points: current, closed });
    current = [];
  };

  while (i < tokens.length) {
    if (/[A-Z]/.test(tokens[i])) cmd = tokens[i++];
    switch (cmd) {
      case 'M':
        flush(false);
        x = num();
        y = num();
        current.push([x, y]);
        cmd = 'L';
        break;
      case 'L':
        x = num();
        y = num();
        current.push([x, y]);
        break;
      case 'H':
        x = num();
        current.push([x, y]);
        break;
      case 'V':
        y = num();
        current.push([x, y]);
        break;
      case 'Q': {
        const [cx, cy, ex, ey] = [num(), num(), num(), num()];
        for (let s = 1; s <= segments; s += 1) {
          const t = s / segments;
          const a = (1 - t) ** 2;
          const b = 2 * (1 - t) * t;
          const c = t * t;
          current.push([a * x + b * cx + c * ex, a * y + b * cy + c * ey]);
        }
        [x, y] = [ex, ey];
        break;
      }
      case 'C': {
        const [c1x, c1y, c2x, c2y, ex, ey] = [num(), num(), num(), num(), num(), num()];
        for (let s = 1; s <= segments; s += 1) {
          const t = s / segments;
          const a = (1 - t) ** 3;
          const b = 3 * (1 - t) ** 2 * t;
          const c = 3 * (1 - t) * t * t;
          const e = t ** 3;
          current.push([a * x + b * c1x + c * c2x + e * ex, a * y + b * c1y + c * c2y + e * ey]);
        }
        [x, y] = [ex, ey];
        break;
      }
      case 'A': {
        // Only half-circle arcs are used (circle() in figurine-parts.ts).
        const r = num();
        num(); // ry
        num(); // rotation
        num(); // large-arc flag
        const sweep = num();
        const ex = num();
        const ey = num();
        const cx = (x + ex) / 2;
        const cy = (y + ey) / 2;
        const a0 = Math.atan2(y - cy, x - cx);
        const span = sweep ? Math.PI : -Math.PI;
        for (let s = 1; s <= segments + 2; s += 1) {
          const a = a0 + (span * s) / (segments + 2);
          current.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }
        [x, y] = [ex, ey];
        break;
      }
      case 'Z':
        flush(true);
        break;
      default:
        i += 1;
    }
  }
  flush(false);
  return out;
}

const toVec = ([px, py]: Pt) => new THREE.Vector2(px, -py);

function strokeGeometry(d: string, width: number, closed: boolean | null = null) {
  // Miter joins and few samples: round joins on the coils alone cost ~15k triangles.
  const style = SVGLoader.getStrokeStyle(width, '#000', 'miter', 'round', 4);
  const parts = samplePath(d, 3).map(({ points, closed: c }) => {
    const pts = points.map(toVec);
    if (closed ?? c) pts.push(pts[0].clone());
    return SVGLoader.pointsToStroke(pts, style);
  });
  return parts.length === 1 ? parts[0] : mergeFlat(parts);
}

/* Small merge for non-indexed or indexed position-only geometries. */
function mergeFlat(geometries: THREE.BufferGeometry[]) {
  const positions: number[] = [];
  for (const g of geometries) {
    const geo = g.index ? g.toNonIndexed() : g;
    positions.push(...Array.from(geo.getAttribute('position').array as ArrayLike<number>));
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return merged;
}

/* Cut edge seen from the front: closed polylines drawn as GL lines. */
function outlineGeometry(d: string) {
  const positions: number[] = [];
  for (const { points } of samplePath(d)) {
    for (let k = 0; k < points.length; k += 1) {
      const a = points[k];
      const b = points[(k + 1) % points.length];
      positions.push(a[0], -a[1], 0, b[0], -b[1], 0);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

function fillShapes(d: string) {
  return samplePath(d).map(({ points }) => new THREE.Shape(points.map(toVec)));
}

export type PartGeometry = {
  body: THREE.BufferGeometry;
  /** Extruded sheets put their front face at the part's z. */
  offsetZ: number;
  outline?: THREE.BufferGeometry;
  shadeDay?: THREE.BufferGeometry;
  shadeNight?: THREE.BufferGeometry;
};

const cache = new Map<string, PartGeometry>();

export function partGeometry(part: Part): PartGeometry {
  const hit = cache.get(part.id);
  if (hit) return hit;
  let result: PartGeometry;
  if (!part.fill) {
    result = { body: strokeGeometry(part.d, part.strokeWidth ?? 1.5), offsetZ: 0 };
  } else if (part.cut) {
    result = {
      body: new THREE.ExtrudeGeometry(fillShapes(part.d), { depth: SHEET_DEPTH, bevelEnabled: false, curveSegments: 1 }),
      offsetZ: -SHEET_DEPTH,
      outline: outlineGeometry(part.d),
    };
  } else {
    result = { body: new THREE.ShapeGeometry(fillShapes(part.d), 1), offsetZ: 0 };
  }
  if (part.shade) {
    result.shadeDay = new THREE.ShapeGeometry(fillShapes(part.shade.day), 1);
    result.shadeNight = new THREE.ShapeGeometry(fillShapes(part.shade.night), 1);
  }
  cache.set(part.id, result);
  return result;
}

/** Poster-space joint matrix → Y-up Matrix4 (S · M · S with S = diag(1, −1, 1)). */
export function toMatrix4(m: Affine, target: THREE.Matrix4) {
  return target.set(
    m[0], -m[1], m[2], m[3],
    -m[4], m[5], -m[6], -m[7],
    m[8], -m[9], m[10], m[11],
    0, 0, 0, 1,
  );
}
