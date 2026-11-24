import type { BeatSpec, ChapterSpec } from '../chapter/spec';
import { PIN_CARDS, PINBOARD_FRAMES } from './PinboardStation';

/*
  Chapter `02` — The Pinboard (DesignRules.md §4.5 `02`, v3.6). Lane on the left
  over the window wall; the board, the photograph and the figure fill the rest.
  Title drops onto a pin → the photograph comes off the board to stand beside
  the bio while the dossier is open, and goes back when it closes → every
  index card on the board comes forward in turn as its own sheet (lifted off
  the card, which pales while it is away; stop-motion `pin` ↔ `reach`).
  Leaves by tilting down to the filing cabinet below.
*/
const cards: BeatSpec[] = PIN_CARDS.map((card, i) => ({
  id: `card-${i}`,
  hold: 30,
  origin: { emerge: { from: [card.x + card.w / 2, card.y + card.h / 2], via: [card.x + card.w / 2, card.y - 70] } },
  // Nothing on the stage is in front of a card on the board.
  occluder: [],
  acts: [{ target: { obj: `card-${i}` }, moved: '0.2', mode: 'out', property: 'opacity' }],
  poses: { base: 'figure', alt: 'figure-alt', swaps: 1 },
}));

export const PINBOARD_CHAPTER: ChapterSpec = {
  id: 'about',
  lane: 'left',
  frames: PINBOARD_FRAMES,
  theatre: { x: -260, y: -170, w: 1860, h: 1162 },
  theatreMobile: { x: 760, y: 30, w: 760, h: 620 },
  handoffIn: 'pan-right',
  handoffOut: 'tilt-down',
  beats: [
    { id: 'title', hold: 30, origin: 'drop' },
    {
      id: 'dossier',
      hold: 50,
      origin: 'unfold',
      // The print leaves the board for the space beside the bio (percent of its own box, so it
      // follows the cover fit) and is pinned back when the dossier closes.
      acts: [{ target: { layer: 'photo' }, moved: 'translate(-48%, 70%) scale(2.35) rotate(2deg)', mode: 'out' }],
    },
    ...cards,
  ],
};
