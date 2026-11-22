import { useEffect, type RefObject } from 'react';

/*
  Pointer parallax for the hero stage (DesignRules.md §9.2).
  Writes --px and --py (each -1…1) on the stage element inside one
  requestAnimationFrame per pointer move. No React state, no scroll listeners.
  Layers turn the variables into translate3d() in CSS (.stage-layer-*).
  Off for coarse pointers, widths under 1024 px and reduced motion.
*/

const QUERY = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function useParallaxStage(stageRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const media = window.matchMedia(QUERY);
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const write = () => {
      frame = 0;
      stage.style.setProperty('--px', nextX.toFixed(3));
      stage.style.setProperty('--py', nextY.toFixed(3));
    };

    const schedule = (x: number, y: number) => {
      nextX = x;
      nextY = y;
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      schedule(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
    };

    const onLeave = () => schedule(0, 0);

    const attach = () => {
      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);
    };

    const detach = () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      schedule(0, 0);
    };

    const sync = () => (media.matches ? attach() : detach());
    sync();
    media.addEventListener('change', sync);

    return () => {
      media.removeEventListener('change', sync);
      detach();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stageRef]);
}
