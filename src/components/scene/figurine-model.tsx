'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FIGURINE_LOOK_EVENT } from './scene-events';
import { HAIR, HEAD, placeCurls } from './figurine-geometry';

/*
  Low-poly paper figurine of Rifqi (DesignRules.md §2.6), built from primitives.
  Units match the SVG poster: x 0–200 → X = x − 100, y 0–460 → Y = 460 − y,
  so the 3D view and RifqiFigurine share one framing inside FIGURINE.
  Flat shading on few segments gives folded paper planes. Under 4k triangles.
*/

export type FigurinePalette = {
  skin: string;
  skinShade: string;
  hair: string;
  hairHi: string;
  shirt: string;
  denim: string;
  denimFade: string;
  sneaker: string;
  sole: string;
  page: string;
  shadow: string;
  shadowOpacity: number;
  /** Colour of the single key light: window daylight or the lamp bulb. */
  light: string;
};

const PLACED_CURLS = placeCurls();

function Paper({ color, side }: { color: string; side?: THREE.Side }) {
  return <meshStandardMaterial color={color} roughness={0.9} metalness={0} flatShading side={side} />;
}

/* Fits the 200 × 460 figurine box to whatever pixel size the canvas has. */
function Framing() {
  const get = useThree((state) => state.get);
  const width = useThree((state) => state.size.width);
  useEffect(() => {
    const { camera, invalidate } = get();
    camera.zoom = width / 200;
    camera.position.set(0, 230, 600);
    camera.lookAt(0, 230, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [get, width]);
  return null;
}

const SEG = Math.PI / 8; // rotate 8-sided cylinders so a flat face points at the viewer

export function FigurineModel({ palette, lightX }: { palette: FigurinePalette; lightX: number }) {
  const head = useRef<THREE.Group>(null);
  const lookStart = useRef<number | null>(null);
  const invalidate = useThree((state) => state.invalidate);

  // One head turn toward the laptop, on demand.
  useEffect(() => {
    const onLook = () => {
      if (lookStart.current !== null) return;
      lookStart.current = performance.now();
      invalidate();
    };
    window.addEventListener(FIGURINE_LOOK_EVENT, onLook);
    return () => window.removeEventListener(FIGURINE_LOOK_EVENT, onLook);
  }, [invalidate]);

  useFrame(() => {
    const group = head.current;
    if (!group || lookStart.current === null) return;
    const t = (performance.now() - lookStart.current) / 1400;
    if (t >= 1) {
      group.rotation.y = 0;
      lookStart.current = null;
      return;
    }
    group.rotation.y = Math.sin(Math.PI * t) * 0.42;
    invalidate();
  });

  const warm = lightX < 0;

  return (
    <>
      <Framing />
      {/* Neutral fill from tokens: the dark palette already carries the night. */}
      <hemisphereLight args={[palette.sole, palette.page, 1.7]} />
      <directionalLight
        position={[-lightX * 320, 300, 600]}
        intensity={warm ? 1.2 : 1.6}
        color={palette.light}
      />

      {/* Contact shadow, drawn flat like the poster's */}
      <mesh position={[0, 8, -60]} scale={[64, 6, 1]}>
        <circleGeometry args={[1, 24]} />
        <meshBasicMaterial color={palette.shadow} transparent opacity={palette.shadowOpacity} depthWrite={false} />
      </mesh>

      <group rotation={[0, 0.16, 0]}>
        {/* Sneakers: grey upper, off-white sole, no marks */}
        {[-24, 24].map((x) => (
          <group key={`shoe-${x}`} position={[x, 0, 10]}>
            <mesh position={[0, 16, 0]}>
              <boxGeometry args={[38, 8, 66]} />
              <Paper color={palette.sole} />
            </mesh>
            <mesh position={[0, 30, -2]}>
              <boxGeometry args={[33, 20, 58]} />
              <Paper color={palette.sneaker} />
            </mesh>
          </group>
        ))}

        {/* Jeans: straight legs, faded thigh panels */}
        {[-20, 20].map((x) => (
          <group key={`leg-${x}`} position={[x, 0, 0]}>
            <mesh position={[0, 126, 0]} rotation={[0, SEG, 0]}>
              <cylinderGeometry args={[19, 17, 172, 8]} />
              <Paper color={palette.denim} />
            </mesh>
            <mesh position={[0, 166, 17.8]}>
              <boxGeometry args={[13, 64, 1]} />
              <Paper color={palette.denimFade} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 194, 0]} rotation={[0, SEG, 0]} scale={[1, 1, 0.52]}>
          <cylinderGeometry args={[42, 41, 36, 8]} />
          <Paper color={palette.denim} />
        </mesh>

        {/* Arms */}
        {[-1, 1].map((side) => (
          <group key={`arm-${side}`}>
            <mesh position={[side * 54, 224, 0]} rotation={[0, 0, side * 0.08]}>
              <cylinderGeometry args={[10, 9, 112, 6]} />
              <Paper color={palette.skin} />
            </mesh>
            <mesh position={[side * 58, 166, 0]} scale={[9, 10, 8]}>
              <sphereGeometry args={[1, 6, 4]} />
              <Paper color={palette.skin} />
            </mesh>
          </group>
        ))}

        {/* Tee: tapered torso and short sleeves */}
        <mesh position={[0, 268, 0]} rotation={[0, SEG, 0]} scale={[1, 1, 0.52]}>
          <cylinderGeometry args={[44, 40, 120, 8]} />
          <Paper color={palette.shirt} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={`sleeve-${side}`} position={[side * 50, 298, 0]} rotation={[0, 0, side * 0.5]}>
            <cylinderGeometry args={[15, 13, 42, 6]} />
            <Paper color={palette.shirt} />
          </mesh>
        ))}
        {/* Crew collar */}
        <mesh position={[0, 327, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.6, 1]}>
          <torusGeometry args={[12, 2.2, 4, 10]} />
          <Paper color={palette.hairHi} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 336, 0]}>
          <cylinderGeometry args={[10, 10, 22, 6]} />
          <Paper color={palette.skinShade} />
        </mesh>

        <group ref={head} position={[0, HEAD.y, 0]}>
          {/* Head and ears */}
          <mesh scale={[HEAD.rx, HEAD.ry, HEAD.rz]}>
            <sphereGeometry args={[1, 9, 7]} />
            <Paper color={palette.skin} />
          </mesh>
          {[-31, 31].map((x) => (
            <mesh key={`ear-${x}`} position={[x, -5, 0]} scale={[5, 9, 4]}>
              <sphereGeometry args={[1, 5, 4]} />
              <Paper color={palette.skinShade} />
            </mesh>
          ))}

          {/* Taper fade: a thin hair shell at the sides and back, open at the face */}
          <mesh scale={[HEAD.rx + 0.6, HEAD.ry + 0.6, HEAD.rz + 0.6]}>
            <sphereGeometry args={[1, 12, 10, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9, 0.9, 0.85]} />
            <meshStandardMaterial
              color={palette.hair}
              transparent
              opacity={0.42}
              roughness={0.9}
              metalness={0}
              flatShading
              depthWrite={false}
            />
          </mesh>

          {/* Hair volume and quilled curls */}
          <group position={[0, HAIR.y - HEAD.y, 0]}>
            <mesh scale={[HAIR.rx, HAIR.ry, HAIR.rz]}>
              <sphereGeometry args={[1, 10, 8, 0, Math.PI * 2, 0, 1.42]} />
              <Paper color={palette.hair} side={THREE.DoubleSide} />
            </mesh>
          </group>
          {PLACED_CURLS.map((curl) => (
            <group
              key={curl.key}
              position={[curl.position[0], curl.position[1] - HEAD.y, curl.position[2]]}
              quaternion={curl.quaternion}
            >
              <mesh scale={[curl.r * 0.85, curl.r * 0.85, curl.r * 0.55]}>
                <sphereGeometry args={[1, 6, 4]} />
                <Paper color={palette.hair} />
              </mesh>
              <mesh position={[0, 0, curl.r * 0.5]}>
                <torusGeometry args={[curl.r * 0.5, 1.1, 3, 9]} />
                <Paper color={palette.hairHi} />
              </mesh>
            </group>
          ))}

          {/* Face: straight brows, almond eyes, folded nose, calm smile */}
          {[-1, 1].map((side) => (
            <group key={`face-${side}`}>
              <mesh position={[side * 12.5, 5, 26.8]} rotation={[0, 0, side * -0.07]}>
                <boxGeometry args={[15, 2.6, 1.5]} />
                <Paper color={palette.hair} />
              </mesh>
              <mesh position={[side * 12, -8, 26.4]} scale={[6, 2.7, 1.4]}>
                <sphereGeometry args={[1, 8, 4]} />
                <meshBasicMaterial color={palette.hair} />
              </mesh>
              <mesh position={[side * 12 + 2, -6.6, 27.8]}>
                <sphereGeometry args={[1.1, 5, 3]} />
                <meshBasicMaterial color={palette.page} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, -17, 28.4]} rotation={[-0.3, 0, 0]}>
            <coneGeometry args={[4.4, 13, 3]} />
            <Paper color={palette.skinShade} />
          </mesh>
          <mesh position={[0, -26, 21.6]} rotation={[0.5, 0, -Math.PI / 2 - Math.PI * 0.27]}>
            <torusGeometry args={[7, 1, 3, 8, Math.PI * 0.54]} />
            <meshBasicMaterial color={palette.skinShade} />
          </mesh>
        </group>
      </group>
    </>
  );
}
