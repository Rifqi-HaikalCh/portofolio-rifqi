import type { Cue } from './engine';

/*
  Sound on/off for the whole studio (DesignRules.md §10.4). Off by default;
  the visitor turns it on (the choice is remembered). Browsers only start
  audio inside a user gesture, so a remembered "on" waits for the first click
  or key press. The engine (engine.ts) is imported only when sound turns on.

  What makes a sound, all through listeners installed once:
  - `studio:cue` from ChapterCue: a sheet coming on (forward) or lifted off (back);
    the Experience drawer runs out with its title.
  - a click on a control: `data-sound` names the cue (`lamp`, `none`), else `tap`.
  - a dialog opening or closing (the `toggle` event): unfold / fold.
*/

const KEY = 'studio-sound';
type Engine = ReturnType<typeof import('./engine').createEngine>;

let on = false;
let loaded = false;
let engine: Promise<Engine> | null = null;
let installed = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((fn) => fn());

const read = () => {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
};

const write = (value: boolean) => {
  try {
    localStorage.setItem(KEY, value ? 'on' : 'off');
  } catch {
    /* private mode: the choice lasts for this visit */
  }
};

const getEngine = () => (engine ??= import('./engine').then((m) => m.createEngine()));

export function play(cue: Cue) {
  if (on && engine) void engine.then((e) => e.play(cue));
}

async function start() {
  const e = await getEngine();
  await e.resume();
  if (!on) return;
  e.music(true);
  install();
}

function stop() {
  if (!engine) return;
  void engine.then((e) => {
    e.music(false);
    window.setTimeout(() => {
      if (!on) void e.suspend();
    }, 1400);
  });
}

function install() {
  if (installed) return;
  installed = true;
  window.addEventListener('studio:cue', (event) => {
    const { chapter, beat, dir } = (event as CustomEvent<{ chapter: string; beat: string; dir: 'fwd' | 'back' }>).detail;
    if (chapter === 'experience' && beat === 'title' && dir === 'fwd') play('drawer');
    else play(dir === 'fwd' ? 'leaf-in' : 'leaf-out');
  });
  document.addEventListener(
    'click',
    (event) => {
      const control = (event.target as Element | null)?.closest<HTMLElement>('button, a[href], summary, [role="tab"]');
      if (!control) return;
      const cue = control.dataset.sound;
      if (cue === 'none') return;
      play((cue as Cue | undefined) ?? 'tap');
    },
    true,
  );
  // `toggle` does not bubble; a capture listener on the document still hears every dialog.
  document.addEventListener(
    'toggle',
    (event) => {
      if (!(event.target instanceof HTMLDialogElement)) return;
      play((event as ToggleEvent).newState === 'open' ? 'unfold' : 'fold');
    },
    true,
  );
  document.addEventListener('visibilitychange', () => {
    if (!on || !engine) return;
    void engine.then(async (e) => {
      if (document.hidden) {
        e.music(false);
        await e.suspend();
      } else {
        await e.resume();
        e.music(true);
      }
    });
  });
}

/** A remembered "on" starts at the first gesture of the visit. */
function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  on = read();
  if (!on) return;
  const arm = () => {
    ['click', 'keydown', 'touchend'].forEach((type) => window.removeEventListener(type, arm, true));
    if (on) void start();
  };
  ['click', 'keydown', 'touchend'].forEach((type) => window.addEventListener(type, arm, true));
}

export function setSound(next: boolean) {
  load();
  on = next;
  write(next);
  emit();
  if (next) void start().then(() => play('tap'));
  else stop();
}

export function subscribeSound(fn: () => void) {
  load();
  listeners.add(fn);
  if (on) fn();
  return () => {
    listeners.delete(fn);
  };
}

export const soundSnapshot = () => on;
export const soundServerSnapshot = () => false;
