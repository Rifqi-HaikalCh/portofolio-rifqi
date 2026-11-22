import * as THREE from 'three';

/*
  Geometry for the 3D figurine's head and hair, in poster units
  (X = x − 100, Y = 460 − y). Kept apart from figurine-model.tsx (§12).
*/

/* Quilled curls, same rows as the poster (x, y, r in poster units). */
export const CURLS: ReadonlyArray<readonly [number, number, number]> = [
  [84, 20, 8], [98, 17, 8], [112, 20, 8], [124, 25, 7],
  [74, 30, 8], [88, 29, 9], [102, 28, 9], [116, 30, 9], [129, 35, 7],
  [69, 42, 7], [81, 40, 8], [95, 39, 8], [109, 40, 8], [122, 42, 8], [132, 47, 6],
  [68, 52, 5], [132, 54, 5],
  // Crown row for the 3D silhouette only (the poster draws it with the hair base).
  [92, 12, 7], [106, 12, 7], [78, 22, 7], [120, 20, 7], [64, 38, 6], [136, 38, 6],
];

/* Hair volume: an ellipsoid a little larger than the head. */
export const HAIR = { y: 392, rx: 35, ry: 56, rz: 33 } as const;
export const HEAD = { y: 383, rx: 31, ry: 47, rz: 29 } as const;

export function placeCurls() {
  const up = new THREE.Vector3(0, 0, 1);
  return CURLS.map(([x, y, r]) => {
    const X = x - 100;
    const Y = 460 - y;
    const inside = 1 - (X / HAIR.rx) ** 2 - ((Y - HAIR.y) / HAIR.ry) ** 2;
    const Z = HAIR.rz * Math.sqrt(Math.max(inside, 0.04)) + 1;
    const normal = new THREE.Vector3(X / HAIR.rx ** 2, (Y - HAIR.y) / HAIR.ry ** 2, Z / HAIR.rz ** 2).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);
    return { key: `${x}-${y}`, position: [X, Y, Z] as const, quaternion, r };
  });
}
