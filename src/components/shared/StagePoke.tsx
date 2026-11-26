'use client';

import { useEffect } from 'react';
import { play } from '../../lib/sound/control';

/*
  Papercraft micro-interactions (v3.10, owner: "richer micro-interactions on
  the 2D/3D paper assets"). The scene layers never take the pointer (§9.2), so
  this one listener does the hit test itself: the paper object under a fine
  pointer lifts a little toward the visitor (`data-hover` on its layer), and a
  click on empty stage gives it a wobble (`data-poke`), the figure a hop. Only
  objects small enough to read as things are touched, never the wall, floor,
  sky or a whole desk. One rAF per move, attributes only; off under reduced
  motion and for coarse pointers (scene.css carries the motion).
*/

const SKIP = /^(wall|floor|sky|city-far|city-near|window|lamp-light|plans|rail|board|desk|cover|tools|stand)$/;
const MAX_AREA = 0.2; // of the viewport

function visible(layer: HTMLElement) {
  return getComputedStyle(layer).opacity !== '0' && getComputedStyle(layer.firstElementChild ?? layer).opacity !== '0';
}

function layerAt(x: number, y: number): HTMLElement | null {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const stages = document.querySelectorAll<HTMLElement>('.stage, .shadowbox');
  for (const stage of stages) {
    const s = stage.getBoundingClientRect();
    if (x < s.left || x > s.right || y < s.top || y > s.bottom || s.bottom < 0 || s.top > vh) continue;
    // Front-most first: later layers paint on top.
    const layers = [...stage.querySelectorAll<HTMLElement>('[data-layer]')].reverse();
    for (const layer of layers) {
      const id = layer.dataset.layer ?? '';
      if (SKIP.test(id)) continue;
      const r = layer.getBoundingClientRect();
      // The figure is always a thing to poke, however close the camera is (v3.11: the services zoom).
      if (!id.startsWith('figure') && r.width * r.height > vw * vh * MAX_AREA) continue;
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && visible(layer)) return layer;
    }
  }
  return null;
}

/*
  Poking the figure (v3.11, refined in v3.12 by the owner: "no background
  behind Ouch, a small splatter, with a sound"): the word pops at the click
  point with a little ink spatter (droplets flying out, a few short dashes),
  no burst card behind it. Decorative (aria-hidden), removed once played.
*/
function splash(x: number, y: number) {
  const el = document.createElement('span');
  el.className = 'ouch';
  el.setAttribute('aria-hidden', 'true');
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty('--tilt', `${Math.round(Math.random() * 14 - 7)}deg`);
  const drops = Array.from({ length: 9 }, (_, i) => {
    const a = i * 40 + Math.round(Math.random() * 24) - 12;
    const d = 1.4 + Math.random() * 1.3;
    const s = 0.18 + Math.random() * 0.2;
    return `<i style="--a:${a}deg;--d:${d.toFixed(2)}rem;--s:${s.toFixed(2)}rem"></i>`;
  }).join('');
  const dashes = Array.from({ length: 4 }, (_, i) => `<em style="--a:${i * 90 + 45 + Math.round(Math.random() * 20 - 10)}deg"></em>`).join('');
  el.innerHTML = `${drops}${dashes}<b>Ouch!</b>`;
  document.body.append(el);
  window.setTimeout(() => el.remove(), 1000);
}

export function StagePoke() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let x = 0;
    let y = 0;
    let hovered: HTMLElement | null = null;

    // Only empty stage counts: not a sheet, a control or text in the flow.
    const onStage = (target: EventTarget | null) =>
      target instanceof Element && !target.closest('a, button, input, textarea, select, summary, label, dialog, .beat-sheet, .eqbot-panel, header, nav');

    const setHover = (layer: HTMLElement | null) => {
      if (layer === hovered) return;
      if (hovered) delete hovered.dataset.hover;
      hovered = layer;
      if (layer) layer.dataset.hover = '';
      document.documentElement.classList.toggle('is-poking', Boolean(layer));
    };

    const aim = () => {
      frame = 0;
      setHover(layerAt(x, y));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || fine.matches === false || still.matches) return;
      x = e.clientX;
      y = e.clientY;
      if (!onStage(e.target)) {
        setHover(null);
        return;
      }
      if (!frame) frame = requestAnimationFrame(aim);
    };
    const click = (e: MouseEvent) => {
      if (still.matches || !onStage(e.target)) return;
      const layer = layerAt(e.clientX, e.clientY);
      if (!layer) return;
      delete layer.dataset.poke;
      void layer.offsetWidth; // restart the animation on a second click
      const figure = (layer.dataset.layer ?? '').startsWith('figure');
      layer.dataset.poke = figure ? 'hop' : 'wobble';
      window.setTimeout(() => delete layer.dataset.poke, 200);
      play(figure ? 'ouch' : 'pop');
      if (figure) splash(e.clientX, e.clientY);
    };
    const leave = () => setHover(null);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('click', click);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', leave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', click);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', leave);
      setHover(null);
    };
  }, []);
  return null;
}
