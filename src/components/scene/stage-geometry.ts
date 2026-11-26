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
  Box the figurine poster or the R3F canvas occupies: STAGE_FRAME (320 × 510
  poster units) at 1.4 : 1. v3.13 (owner: "make him real size"): he stands on
  the floor in front of the drawers, about 606 units tall against a 260-unit
  desk (a 1.72 m person at a 0.75 m desk), feet at y ≈ 975, the near hand on
  the desk top by the laptop (≈ 430, 698). Before v3.13 he sat on the notebook
  at 1 : 1, a doll on the desk.
*/
export const FIGURINE: StageRect = { x: 11, y: 278, w: 448, h: 714 };

/** v3.13: hit area of the desk speaker (sound switch), on the desk right of the laptop. */
export const SPEAKER: StageRect = { x: 1232, y: 502, w: 108, h: 142 };

/** Hit area of the desk lamp (theme switch). */
export const LAMP: StageRect = { x: 1120, y: 240, w: 360, h: 420 };
