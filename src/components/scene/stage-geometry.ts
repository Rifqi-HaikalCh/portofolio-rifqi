/*
  One coordinate system for the hero stage (DesignRules.md §9.1).
  Every SVG layer uses viewBox 0 0 1600 1000; the stage keeps aspect-ratio 16 / 10.
  HTML that sits "inside" the artwork (laptop screen, lamp button, figurine)
  is positioned with the percentage helpers below so it never drifts.
*/

export const STAGE = { width: 1600, height: 1000 } as const;
export const STAGE_VIEWBOX = `0 0 ${STAGE.width} ${STAGE.height}`;

export type StageRect = { x: number; y: number; w: number; h: number };

/** Glass area of the laptop. LaptopScreenUI (Phase 3) is placed exactly here. */
export const SCREEN: StageRect = { x: 500, y: 172, w: 600, h: 376 };

/** Box the figurine poster or the R3F canvas occupies. */
export const FIGURINE: StageRect = { x: 132, y: 212, w: 200, h: 460 };

/** Hit area of the desk lamp (theme switch in Phase 3). */
export const LAMP: StageRect = { x: 1120, y: 240, w: 360, h: 420 };

/** Top surface of the desk, used for contact shadows. */
export const DESK_TOP_Y = 640;

export function stageBox(rect: StageRect) {
  return {
    left: `${(rect.x / STAGE.width) * 100}%`,
    top: `${(rect.y / STAGE.height) * 100}%`,
    width: `${(rect.w / STAGE.width) * 100}%`,
    height: `${(rect.h / STAGE.height) * 100}%`,
  } as const;
}
