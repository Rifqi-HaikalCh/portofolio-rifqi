'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EQBOT_STATE_EVENT, FIGURINE_LOOK_EVENT, type EqbotStateDetail } from './scene-events';
import { PARTS, SEAT, STAGE_FRAME, type Expression, type Ink, type JointId } from './figurine-parts';
import { solveJoints } from './figurine-rig';
import { partGeometry, toMatrix4 } from './figurine-mesh';
import { sample, type ActiveClip, type ClipId } from './figurine-clips';

/*
  The 3D paper puppet (DesignRules.md §2.6, §9.3; docs/art-motion-upgrade.md §2).
  Every part from figurine-parts.ts is a cardstock sheet hung on the rig from
  figurine-rig.ts, so the front view equals the SVG poster. Unlit materials keep
  token colours exact; fold planes cross-fade with --light-x like the poster.

  Motion is on demand only (frameloop="demand"): a frame is drawn while a clip
  runs. Clips: one wave per session on first show, look at the laptop, a startle
  toward the lamp on theme change, "thinking" while EQbot is open, and a 120 ms
  blink every 4–7 s while the stage is on screen and the tab is visible.
*/

export type Swatch = { color: string; alpha: number };
export type FigurinePalette = Record<Ink | 'cut' | 'shadow', Swatch>;

const WAVED_KEY = 'paperdesk:figurine-waved';

/* Fits the stage frame to whatever pixel size the canvas has. */
function Framing() {
  const get = useThree((state) => state.get);
  const width = useThree((state) => state.size.width);
  useEffect(() => {
    const { camera, invalidate } = get();
    const cx = STAGE_FRAME.x + STAGE_FRAME.w / 2;
    const cy = -(STAGE_FRAME.y + STAGE_FRAME.h / 2);
    camera.zoom = width / STAGE_FRAME.w;
    camera.position.set(cx, cy, 600);
    camera.lookAt(cx, cy, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [get, width]);
  return null;
}

function basic(swatch: Swatch, opacity = 1) {
  const alpha = swatch.alpha * opacity;
  return new THREE.MeshBasicMaterial({
    color: swatch.color,
    transparent: alpha < 1,
    opacity: alpha,
    depthWrite: alpha >= 1,
    side: THREE.DoubleSide,
  });
}

type Sheet = {
  group: THREE.Group;
  joint: JointId;
  only?: readonly Expression[];
};

function useMaterials(palette: FigurinePalette, lightX: number) {
  return useMemo(() => {
    const cache = new Map<string, THREE.MeshBasicMaterial>();
    const get = (key: Ink | 'cut' | 'shadow', opacity = 1) => {
      const id = `${key}:${opacity}`;
      let m = cache.get(id);
      if (!m) {
        m = basic(palette[key], opacity);
        cache.set(id, m);
      }
      return m;
    };
    let line: THREE.LineBasicMaterial | undefined;
    return {
      get,
      line: () => {
        line ??= new THREE.LineBasicMaterial({
          color: palette.cut.color,
          transparent: true,
          opacity: palette.cut.alpha,
          depthWrite: false,
        });
        return line;
      },
      day: (1 + lightX) / 2,
      night: (1 - lightX) / 2,
      dispose: () => {
        cache.forEach((m) => m.dispose());
        line?.dispose();
      },
    };
  }, [palette, lightX]);
}

export function FigurineModel({ palette, lightX }: { palette: FigurinePalette; lightX: number }) {
  const root = useRef<THREE.Group>(null);
  const sheets = useRef<Sheet[]>([]);
  const running = useRef<ActiveClip[]>([]);
  const lastExpression = useRef<Expression | null>(null);
  const onScreen = useRef(true);
  const invalidate = useThree((state) => state.invalidate);
  const canvas = useThree((state) => state.gl.domElement);
  const materials = useMaterials(palette, lightX);

  // Build the sheets once per palette (materials change with the theme).
  useEffect(() => {
    const group = root.current;
    if (!group) return undefined;
    const built: Sheet[] = [];
    for (const part of PARTS) {
      const geo = partGeometry(part);
      const sheet = new THREE.Group();
      sheet.matrixAutoUpdate = false;
      const ink = part.fill ?? part.stroke ?? 'hair';
      // Extruded sheets: group 0 is the front and back face, group 1 the cut edge.
      const material: THREE.Material | THREE.Material[] =
        part.cut && part.fill ? [materials.get(ink), materials.get('cut')] : materials.get(ink, part.opacity ?? 1);
      const body = new THREE.Mesh(geo.body, material);
      body.position.z = part.z + geo.offsetZ;
      sheet.add(body);
      if (geo.outline) {
        const outline = new THREE.LineSegments(geo.outline, materials.line());
        outline.position.z = part.z + 0.01;
        sheet.add(outline);
      }
      if (geo.shadeDay && geo.shadeNight) {
        const day = new THREE.Mesh(geo.shadeDay, materials.get('fold', materials.day));
        const night = new THREE.Mesh(geo.shadeNight, materials.get('fold', materials.night));
        day.position.z = part.z + 0.02;
        night.position.z = part.z + 0.02;
        day.visible = materials.day > 0;
        night.visible = materials.night > 0;
        sheet.add(day, night);
      }
      group.add(sheet);
      built.push({ group: sheet, joint: part.joint, only: part.only });
    }
    sheets.current = built;
    lastExpression.current = null;
    pose(performance.now() / 1000);
    invalidate();
    return () => {
      built.forEach((s) => group.remove(s.group));
      materials.dispose();
    };
    // pose is stable (refs only)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials, invalidate]);

  const scratch = useMemo(() => new THREE.Matrix4(), []);

  function pose(now: number) {
    const { joints, expression, finished } = sample(running.current, now);
    if (finished.length) running.current = running.current.filter((c) => !finished.includes(c));
    const world = solveJoints(joints);
    const matrices = new Map<JointId, THREE.Matrix4>();
    for (const sheet of sheets.current) {
      let m = matrices.get(sheet.joint);
      if (!m) {
        m = toMatrix4(world[sheet.joint], scratch).clone();
        matrices.set(sheet.joint, m);
      }
      sheet.group.matrix.copy(m);
      sheet.group.matrixWorldNeedsUpdate = true;
      if (expression !== lastExpression.current) sheet.group.visible = !sheet.only || sheet.only.includes(expression);
    }
    lastExpression.current = expression;
  }

  useFrame(() => {
    if (!running.current.length) return;
    pose(performance.now() / 1000);
    invalidate();
  });

  // Clip triggers.
  useEffect(() => {
    const play = (id: ClipId) => {
      if (running.current.some((c) => c.id === id && c.release === undefined)) return;
      running.current = [...running.current, { id, start: performance.now() / 1000 }];
      invalidate();
    };
    const release = (id: ClipId) => {
      running.current = running.current.map((c) =>
        c.id === id && c.release === undefined ? { ...c, release: performance.now() / 1000 } : c,
      );
      invalidate();
    };

    const onLook = () => play('look');
    const onEqbot = (event: Event) => {
      const { open } = (event as CustomEvent<EqbotStateDetail>).detail;
      if (open) play('think');
      else release('think');
    };
    window.addEventListener(FIGURINE_LOOK_EVENT, onLook);
    window.addEventListener(EQBOT_STATE_EVENT, onEqbot);

    // One greeting per session.
    let waved = true;
    try {
      waved = sessionStorage.getItem(WAVED_KEY) === '1';
      sessionStorage.setItem(WAVED_KEY, '1');
    } catch {
      /* storage blocked: skip the wave */
    }
    const waveTimer = waved ? undefined : window.setTimeout(() => play('wave'), 400);

    // Blink every 4–7 s, only while visible.
    let blinkTimer: number | undefined;
    const scheduleBlink = () => {
      window.clearTimeout(blinkTimer);
      blinkTimer = window.setTimeout(
        () => {
          if (onScreen.current && !document.hidden) play('blink');
          scheduleBlink();
        },
        4000 + Math.random() * 3000,
      );
    };
    scheduleBlink();

    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    return () => {
      window.removeEventListener(FIGURINE_LOOK_EVENT, onLook);
      window.removeEventListener(EQBOT_STATE_EVENT, onEqbot);
      window.clearTimeout(waveTimer);
      window.clearTimeout(blinkTimer);
      observer.disconnect();
    };
  }, [canvas, invalidate]);

  // Theme switched from the lamp: glance at it.
  const firstLight = useRef(lightX);
  useEffect(() => {
    if (lightX === firstLight.current) return;
    firstLight.current = lightX;
    running.current = [...running.current, { id: 'lamp', start: performance.now() / 1000 }];
    invalidate();
  }, [lightX, invalidate]);

  const shadow = useMemo(() => basic(palette.shadow), [palette.shadow]);

  return (
    <>
      <Framing />
      {/* Contact shadow where he sits on the notebook */}
      <mesh position={[SEAT.x, -SEAT.y, -40]} scale={[SEAT.rx, SEAT.ry, 1]} material={shadow}>
        <circleGeometry args={[1, 24]} />
      </mesh>
      <group ref={root} />
    </>
  );
}
