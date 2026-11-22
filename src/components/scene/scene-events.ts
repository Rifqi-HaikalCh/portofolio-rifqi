/*
  Window events that connect the hero stage to its neighbours without shared state.
  - EQBOT_OPEN_EVENT: the laptop's "Ask EQbot" button opens the EQbot sheet.
  - FIGURINE_LOOK_EVENT: hovering or focusing the laptop makes the 3D figurine
    turn its head toward it once (DesignRules.md §4 `01`).
*/

export const EQBOT_OPEN_EVENT = 'paperdesk:eqbot-open';
export const FIGURINE_LOOK_EVENT = 'paperdesk:figurine-look';

export function emit(name: string) {
  window.dispatchEvent(new Event(name));
}
