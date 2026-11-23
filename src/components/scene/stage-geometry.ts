/*
  World coordinates of the Desk station (DesignRules.md §9.1). Every station is
  authored in a 1600 × 1000 world; HTML that sits on paper objects (laptop
  screen, lamp button, figurine) uses these rects so HTML and art never drift.
*/

export const STAGE = { width: 1600, height: 1000 } as const;

export type StageRect = { x: number; y: number; w: number; h: number };

/** Glass area of the laptop (z = 0 plane). LaptopScreenUI is placed exactly here. */
export const SCREEN: StageRect = { x: 500, y: 172, w: 600, h: 376 };

/**
  Box the figurine poster or the R3F canvas occupies: STAGE_FRAME (280 × 400
  poster units) at 1:1, placed so he sits on the notebook (seat at y ≈ 712)
  with his near hand on the laptop deck.
*/
export const FIGURINE: StageRect = { x: 185, y: 434, w: 280, h: 400 };

/** Hit area of the desk lamp (theme switch). */
export const LAMP: StageRect = { x: 1120, y: 240, w: 360, h: 420 };
