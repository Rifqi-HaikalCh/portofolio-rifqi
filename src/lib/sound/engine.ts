/*
  The studio's sound (DesignRules.md §10.4): every sound is synthesised here
  with the Web Audio API. There are no audio files: paper is filtered noise,
  the drawer is a low rumble, a tap is a click; the backsound is a slow
  generative pad with a kalimba-like pluck. Loaded with import() only after the
  visitor turns sound on, so it costs nothing on first load.
*/

export type Cue = 'leaf-in' | 'leaf-out' | 'drawer' | 'tap' | 'unfold' | 'fold' | 'lamp';

type Engine = {
  play: (cue: Cue) => void;
  music: (on: boolean) => void;
  resume: () => Promise<void>;
  suspend: () => Promise<void>;
};

// D major, warm and unhurried: Dmaj9 → Bm7 → Gmaj7 → A6sus, eight seconds each.
const CHORDS = [
  [146.83, 220.0, 277.18, 329.63],
  [123.47, 185.0, 220.0, 293.66],
  [98.0, 196.0, 246.94, 293.66],
  [110.0, 164.81, 246.94, 293.66],
];
const PLUCK = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66];
const CHORD_S = 8;

export function createEngine(): Engine {
  const ctx = new AudioContext({ latencyHint: 'interactive' });
  const master = ctx.createGain();
  master.gain.value = 0.9;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  master.connect(comp).connect(ctx.destination);

  const sfx = ctx.createGain();
  sfx.gain.value = 0.55;
  sfx.connect(master);

  // A small room: one feedback delay through a low-pass, shared by the music and the sheets.
  const room = ctx.createDelay(1);
  room.delayTime.value = 0.23;
  const roomFb = ctx.createGain();
  roomFb.gain.value = 0.32;
  const roomTone = ctx.createBiquadFilter();
  roomTone.type = 'lowpass';
  roomTone.frequency.value = 1800;
  const roomOut = ctx.createGain();
  roomOut.gain.value = 0.35;
  room.connect(roomTone).connect(roomFb).connect(room);
  roomTone.connect(roomOut).connect(master);

  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  {
    const data = noise.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < data.length; i += 1) {
      const white = Math.random() * 2 - 1;
      // Mostly white with a little brown: paper fibre rather than hiss.
      brown = (brown + 0.02 * white) / 1.02;
      data[i] = white * 0.7 + brown * 3.2;
    }
  }

  const env = (gain: AudioParam, t: number, peak: number, attack: number, release: number) => {
    gain.cancelScheduledValues(t);
    gain.setValueAtTime(0.0001, t);
    gain.exponentialRampToValueAtTime(peak, t + attack);
    gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  };

  /** A burst of filtered noise: the basic paper sound. */
  const rustle = (o: { t?: number; dur: number; type: BiquadFilterType; from: number; to: number; q?: number; peak: number; attack?: number; wet?: boolean }) => {
    const t = o.t ?? ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.playbackRate.value = 0.9 + Math.random() * 0.2;
    const f = ctx.createBiquadFilter();
    f.type = o.type;
    f.Q.value = o.q ?? 0.9;
    f.frequency.setValueAtTime(o.from, t);
    f.frequency.exponentialRampToValueAtTime(o.to, t + o.dur);
    const g = ctx.createGain();
    env(g.gain, t, o.peak, o.attack ?? 0.02, o.dur);
    src.connect(f).connect(g).connect(sfx);
    if (o.wet) g.connect(room);
    src.start(t, Math.random() * 1.5, o.dur + 0.3);
  };

  const tone = (o: { t?: number; freq: number; to?: number; type?: OscillatorType; peak: number; attack: number; release: number; dest?: AudioNode }) => {
    const t = o.t ?? ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = o.type ?? 'sine';
    osc.frequency.setValueAtTime(o.freq, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + o.attack + o.release);
    const g = ctx.createGain();
    env(g.gain, t, o.peak, o.attack, o.release);
    osc.connect(g).connect(o.dest ?? sfx);
    osc.start(t);
    osc.stop(t + o.attack + o.release + 0.05);
  };

  const play = (cue: Cue) => {
    if (ctx.state !== 'running') return;
    const t = ctx.currentTime;
    switch (cue) {
      case 'leaf-in': // a sheet slides out and lands
        rustle({ t, dur: 0.32, type: 'bandpass', from: 2600, to: 700, q: 0.8, peak: 0.5, attack: 0.04, wet: true });
        tone({ t: t + 0.3, freq: 110, to: 70, peak: 0.25, attack: 0.005, release: 0.09 });
        rustle({ t: t + 0.3, dur: 0.05, type: 'lowpass', from: 900, to: 400, peak: 0.25, attack: 0.003 });
        break;
      case 'leaf-out': // lifted off
        rustle({ t, dur: 0.24, type: 'highpass', from: 700, to: 2600, q: 0.6, peak: 0.32, attack: 0.05 });
        break;
      case 'drawer': // the drawer runs out on its rails, then stops
        rustle({ t, dur: 0.5, type: 'lowpass', from: 300, to: 650, q: 2, peak: 0.6, attack: 0.08 });
        tone({ t, freq: 52, to: 46, type: 'triangle', peak: 0.14, attack: 0.06, release: 0.45 });
        tone({ t: t + 0.5, freq: 820, to: 600, type: 'square', peak: 0.04, attack: 0.002, release: 0.05 });
        rustle({ t: t + 0.5, dur: 0.06, type: 'bandpass', from: 1400, to: 900, q: 3, peak: 0.3, attack: 0.002 });
        break;
      case 'tap': // a card button
        rustle({ t, dur: 0.035, type: 'bandpass', from: 3200, to: 2400, q: 2.5, peak: 0.35, attack: 0.002 });
        tone({ t, freq: 1300, to: 900, peak: 0.05, attack: 0.002, release: 0.04 });
        break;
      case 'unfold': // a dialog sheet opens
        rustle({ t, dur: 0.12, type: 'bandpass', from: 1800, to: 3000, q: 1.2, peak: 0.35, attack: 0.01 });
        rustle({ t: t + 0.11, dur: 0.22, type: 'bandpass', from: 3000, to: 900, q: 0.9, peak: 0.4, attack: 0.02, wet: true });
        break;
      case 'fold':
        rustle({ t, dur: 0.18, type: 'bandpass', from: 1200, to: 2800, q: 1, peak: 0.3, attack: 0.02 });
        tone({ t: t + 0.17, freq: 140, to: 90, peak: 0.16, attack: 0.004, release: 0.07 });
        break;
      case 'lamp': // the lamp switch
        tone({ t, freq: 2200, to: 1500, type: 'square', peak: 0.05, attack: 0.001, release: 0.03 });
        rustle({ t, dur: 0.03, type: 'highpass', from: 2500, to: 4000, peak: 0.3, attack: 0.001 });
        tone({ t: t + 0.06, freq: 1700, to: 1200, type: 'square', peak: 0.035, attack: 0.001, release: 0.025 });
        break;
    }
  };

  // Backsound: a pad that changes chord every 8 s and an occasional pluck, through the room.
  const musicBus = ctx.createGain();
  musicBus.gain.value = 0;
  const padTone = ctx.createBiquadFilter();
  padTone.type = 'lowpass';
  padTone.frequency.value = 950;
  padTone.Q.value = 0.4;
  padTone.connect(musicBus);
  musicBus.connect(master);
  musicBus.connect(room);
  // The filter breathes slowly, so the pad never sits still.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.05;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 260;
  lfo.connect(lfoDepth).connect(padTone.frequency);
  lfo.start();

  let timer = 0;
  let step = 0;
  let playing = false;

  const chord = (t: number) => {
    for (const freq of CHORDS[step % CHORDS.length]) {
      for (const detune of [-6, 5]) {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.detune.value = detune;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.05, t + 2.6);
        g.gain.setValueAtTime(0.05, t + CHORD_S - 1);
        g.gain.exponentialRampToValueAtTime(0.0001, t + CHORD_S + 2.5);
        osc.connect(g).connect(padTone);
        osc.start(t);
        osc.stop(t + CHORD_S + 2.6);
      }
    }
    // Two or three plucks per chord, never on a fixed grid.
    const n = 2 + Math.round(Math.random());
    for (let i = 0; i < n; i += 1) {
      const at = t + 1 + Math.random() * (CHORD_S - 2);
      const freq = PLUCK[Math.floor(Math.random() * PLUCK.length)];
      tone({ t: at, freq, peak: 0.045, attack: 0.004, release: 1.6, dest: musicBus });
      tone({ t: at, freq: freq * 2, peak: 0.012, attack: 0.002, release: 0.5, dest: musicBus });
    }
    step += 1;
  };

  const schedule = () => {
    chord(ctx.currentTime + 0.1);
    timer = window.setTimeout(schedule, CHORD_S * 1000);
  };

  const music = (on: boolean) => {
    const t = ctx.currentTime;
    musicBus.gain.cancelScheduledValues(t);
    musicBus.gain.setValueAtTime(musicBus.gain.value, t);
    if (on && !playing) {
      playing = true;
      musicBus.gain.linearRampToValueAtTime(0.75, t + 3);
      schedule();
    } else if (!on && playing) {
      playing = false;
      musicBus.gain.linearRampToValueAtTime(0, t + 1.2);
      window.clearTimeout(timer);
    }
  };

  return {
    play,
    music,
    resume: () => ctx.resume(),
    suspend: () => ctx.suspend(),
  };
}
