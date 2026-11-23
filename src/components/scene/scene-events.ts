/*
  Window events that connect the hero stage to its neighbours without shared state.
  - EQBOT_OPEN_EVENT: the laptop's "Ask EQbot" button opens the EQbot sheet.
  - EQBOT_STATE_EVENT: EQbot reports its sheet opening or closing, so the
    figurine can hold its "thinking" pose meanwhile.
  - FIGURINE_LOOK_EVENT: hovering or focusing the laptop makes the 3D figurine
    turn its head toward it once (DesignRules.md §4 `01`).
*/

export const EQBOT_OPEN_EVENT = 'paperdesk:eqbot-open';
export const EQBOT_STATE_EVENT = 'paperdesk:eqbot-state';
export const FIGURINE_LOOK_EVENT = 'paperdesk:figurine-look';

export type EqbotStateDetail = { open: boolean };

export function emit(name: string) {
  window.dispatchEvent(new Event(name));
}

export function emitEqbotState(open: boolean) {
  window.dispatchEvent(new CustomEvent<EqbotStateDetail>(EQBOT_STATE_EVENT, { detail: { open } }));
}
