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

/**
  Box the figurine poster or the R3F canvas occupies: STAGE_FRAME (280 × 400
  poster units) at 1:1, placed so he sits on the notebook (seat at y ≈ 712)
  with his near hand on the laptop deck.
*/
export const FIGURINE: StageRect = { x: 185, y: 434, w: 280, h: 400 };

/** Hit area of the desk lamp (theme switch in Phase 3). */
export const LAMP: StageRect = { x: 1120, y: 240, w: 360, h: 420 };

/** Top surface of the desk, used for contact shadows. */
export const DESK_TOP_Y = 640;

/*
  Mobile diorama (< 768 px, P6.3): a square 800 × 800 stage, static and
  server-rendered. Same figurine poster at 1:1, seated on the notebook with
  his near hand on the laptop base; the lamp stays the theme switch.
*/
export const MOBILE_STAGE = { width: 800, height: 800 } as const;
export const MOBILE_VIEWBOX = `0 0 ${MOBILE_STAGE.width} ${MOBILE_STAGE.height}`;
export const MOBILE_FIGURINE: StageRect = { x: 64, y: 296, w: 280, h: 400 };
export const MOBILE_LAMP: StageRect = { x: 620, y: 260, w: 180, h: 280 };

export function stageBox(rect: StageRect, stage: { width: number; height: number } = STAGE) {
  return {
    left: `${(rect.x / stage.width) * 100}%`,
    top: `${(rect.y / stage.height) * 100}%`,
    width: `${(rect.w / stage.width) * 100}%`,
    height: `${(rect.h / stage.height) * 100}%`,
  } as const;
}
