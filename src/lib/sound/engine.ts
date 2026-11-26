/*
  The studio's sound (DesignRules.md §10.4): every sound is synthesised here
  with the Web Audio API. There are no audio files: paper is filtered noise,
  the drawer is a low rumble, a tap is a click. The backsound (v3.9, owner:
  "an energetic theme") is a 112 BPM groove generated live: a paper kick, a
  clap, shaker hats, a round bass, a kalimba arpeggio and a bright pad over
  D – A – Bm – G. Loaded with import() only after the visitor turns sound on,
  so it costs nothing on first load.
*/

export type Cue =
  | 'leaf-in'
  | 'leaf-out'
  | 'drawer'
  | 'tap'
  | 'unfold'
  | 'fold'
  | 'lamp'
  | 'whoosh'
  | 'zoom'
  | 'swish'
  | 'pop'
  | 'ouch'
  | 'chime'
  | 'pin'
  | 'glint'
  | 'whistle'
  | 'burst';

type Engine = {
  play: (cue: Cue, n?: number) => void;
  /** Stops the clock, the oscillators and the context (v3.22: one engine at a time). */
  dispose: () => void;
  music: (on: boolean) => void;
  resume: () => Promise<void>;
  suspend: () => Promise<void>;
};

// D – A – Bm – G, one bar each at 112 BPM (sixteen steps a bar).
const BPM = 112;
const STEP = 60 / BPM / 4;
const ROOTS = [73.42, 55.0, 61.74, 49.0];
const CHORDS = [
  [293.66, 369.99, 440.0, 554.37],
  [277.18, 329.63, 440.0, 554.37],
  [246.94, 293.66, 369.99, 440.0],
  [246.94, 293.66, 392.0, 493.88],
];
// Arpeggio: chord-tone index per sixteenth (-1 = rest), two patterns that alternate.
const ARP = [
  [0, -1, 2, 1, -1, 3, 2, -1, 0, -1, 2, 3, -1, 2, 1, -1],
  [3, -1, 2, -1, 1, 2, -1, 0, 2, -1, 3, -1, 2, 1, -1, 0],
];
// Bass: 1 = root, 2 = octave, 5 = fifth, 0 = rest.
const BASS = [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 5, 0, 0];

type Holder = { __studioEngine?: Engine };

export function createEngine(): Engine {
  // v3.22 (owner: the backsound was doubled): never two engines. A second one (a hot reload, a
  // remount) would run its own groove over the first; the older one is stopped and closed first.
  const holder = window as unknown as Holder;
  holder.__studioEngine?.dispose();
  const ctx = new AudioContext({ latencyHint: 'interactive' });
  const master = ctx.createGain();
  master.gain.value = 1;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  master.connect(comp).connect(ctx.destination);

  const sfx = ctx.createGain();
  sfx.gain.value = 0.5;
  sfx.connect(master);

  // A small room: one feedback delay through a low-pass, shared by the music and the sheets.
  const room = ctx.createDelay(1);
  // v3.22: the echo sits on the beat (an eighth note), not 0.23 s off it, which sounded like each hit played twice.
  room.delayTime.value = (60 / BPM) / 2;
  const roomFb = ctx.createGain();
  roomFb.gain.value = 0.28;
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

  const play = (cue: Cue, n = 0) => {
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
      case 'whoosh': // the camera moves to the next station
        rustle({ t, dur: 0.55, type: 'bandpass', from: 380, to: 2400, q: 0.7, peak: 0.32, attack: 0.22, wet: true });
        tone({ t, freq: 180, to: 320, type: 'sine', peak: 0.05, attack: 0.25, release: 0.3 });
        break;
      case 'zoom': // the camera pushes in to the board
        rustle({ t, dur: 0.8, type: 'lowpass', from: 300, to: 3200, q: 1.4, peak: 0.28, attack: 0.5, wet: true });
        tone({ t, freq: 220, to: 660, type: 'triangle', peak: 0.04, attack: 0.6, release: 0.25 });
        tone({ t: t + 0.78, freq: 1318.5, peak: 0.05, attack: 0.004, release: 0.5, dest: room });
        break;
      case 'swish': // the wire slides to the next pair
        rustle({ t, dur: 0.32, type: 'highpass', from: 1200, to: 4200, q: 0.8, peak: 0.26, attack: 0.08 });
        tone({ t: t + 0.3, freq: 987.77, peak: 0.04, attack: 0.003, release: 0.35 });
        tone({ t: t + 0.36, freq: 1479.98, peak: 0.03, attack: 0.003, release: 0.4 });
        break;
      case 'pop': // a speech bubble
        tone({ t, freq: 520, to: 980, type: 'sine', peak: 0.12, attack: 0.004, release: 0.09 });
        rustle({ t, dur: 0.04, type: 'bandpass', from: 2600, to: 1800, q: 2, peak: 0.14, attack: 0.002 });
        break;
      case 'ouch': // v3.11+: the figure is poked — a paper thwack, then a short cartoon yelp that bends down
        rustle({ t, dur: 0.06, type: 'lowpass', from: 1400, to: 500, q: 1.2, peak: 0.42, attack: 0.002 });
        tone({ t, freq: 180, to: 90, peak: 0.2, attack: 0.003, release: 0.08 });
        tone({ t: t + 0.04, freq: 880, to: 1240, type: 'triangle', peak: 0.07, attack: 0.01, release: 0.06 });
        tone({ t: t + 0.11, freq: 1240, to: 520, type: 'triangle', peak: 0.08, attack: 0.005, release: 0.22 });
        [0, 1, 2].forEach((i) => rustle({ t: t + 0.05 + i * 0.045, dur: 0.03, type: 'bandpass', from: 4200 - i * 600, to: 3000, q: 3, peak: 0.12, attack: 0.002 }));
        break;
      case 'chime': // a section reached
        [1174.66, 1479.98, 1760].forEach((f, i) => tone({ t: t + i * 0.07, freq: f, peak: 0.045, attack: 0.003, release: 0.7, dest: room }));
        break;
      case 'pin': // a pin pressed into the board: a tack and a small thud
        rustle({ t, dur: 0.03, type: 'bandpass', from: 3600, to: 2600, q: 3, peak: 0.4, attack: 0.001 });
        tone({ t, freq: 1500, to: 800, type: 'square', peak: 0.035, attack: 0.001, release: 0.03 });
        tone({ t: t + 0.015, freq: 130, to: 80, peak: 0.2, attack: 0.003, release: 0.09 });
        break;
      case 'glint': { // the light reaches a pin: a bell, one step higher each time along the path
        const scale = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51];
        const f = scale[Math.min(n, scale.length - 1)];
        tone({ t, freq: f, peak: 0.075, attack: 0.003, release: 0.7, dest: room });
        tone({ t, freq: f * 2, peak: 0.02, attack: 0.002, release: 0.3, dest: room });
        break;
      }
      case 'whistle': // the rocket goes up
        tone({ t, freq: 520, to: 2300, type: 'sine', peak: 0.05, attack: 0.05, release: 0.4 });
        rustle({ t, dur: 0.4, type: 'highpass', from: 2000, to: 6000, q: 0.7, peak: 0.1, attack: 0.1 });
        break;
      case 'burst': // the firework: a soft boom, a spray of paper and a few crackles
        tone({ t, freq: 110, to: 46, type: 'triangle', peak: 0.2, attack: 0.004, release: 0.35 });
        rustle({ t, dur: 0.5, type: 'highpass', from: 1500, to: 4200, q: 0.6, peak: 0.34, attack: 0.01, wet: true });
        [0.05, 0.12, 0.19, 0.27, 0.35, 0.46].forEach((d, i) =>
          rustle({ t: t + d, dur: 0.03, type: 'bandpass', from: 5200 - i * 300, to: 4200, q: 3, peak: 0.14, attack: 0.001 }),
        );
        tone({ t: t + 0.1, freq: 1760, peak: 0.03, attack: 0.003, release: 0.6, dest: room });
        break;
      case 'lamp': // the lamp switch
        tone({ t, freq: 2200, to: 1500, type: 'square', peak: 0.05, attack: 0.001, release: 0.03 });
        rustle({ t, dur: 0.03, type: 'highpass', from: 2500, to: 4000, peak: 0.3, attack: 0.001 });
        tone({ t: t + 0.06, freq: 1700, to: 1200, type: 'square', peak: 0.035, attack: 0.001, release: 0.025 });
        break;
    }
  };

  // Backsound: a groove scheduled a little ahead of the clock (the usual Web Audio look-ahead).
  const musicBus = ctx.createGain();
  musicBus.gain.value = 0;
  musicBus.connect(master);
  // The pad and arpeggio duck a little under each kick, so the groove pumps. Only they go to the room:
  // the kick, clap, hats and bass stay dry (an echoing kick is the 'double' hit).
  const musicWet = ctx.createGain();
  musicWet.gain.value = 0.35;
  const melodic = ctx.createGain();
  melodic.connect(musicBus);
  melodic.connect(musicWet).connect(room);
  const padTone = ctx.createBiquadFilter();
  padTone.type = 'lowpass';
  padTone.frequency.value = 1500;
  padTone.Q.value = 0.6;
  padTone.connect(melodic);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.11;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 500;
  lfo.connect(lfoDepth).connect(padTone.frequency);
  lfo.start();

  const kick = (t: number) => {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(46, t + 0.14);
    const g = ctx.createGain();
    env(g.gain, t, 0.42, 0.003, 0.24);
    osc.connect(g).connect(musicBus);
    osc.start(t);
    osc.stop(t + 0.3);
    melodic.gain.setValueAtTime(0.55, t);
    melodic.gain.linearRampToValueAtTime(1, t + STEP * 3);
  };
  const hit = (t: number, o: { type: BiquadFilterType; freq: number; q: number; peak: number; dur: number }) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = o.type;
    f.frequency.value = o.freq;
    f.Q.value = o.q;
    const g = ctx.createGain();
    env(g.gain, t, o.peak, 0.002, o.dur);
    src.connect(f).connect(g).connect(musicBus);
    src.start(t, Math.random() * 1.5, o.dur + 0.05);
  };
  // Paper clap: three quick bursts.
  const clap = (t: number) => {
    [0, 0.012, 0.024].forEach((d, i) => hit(t + d, { type: 'bandpass', freq: 1500, q: 0.9, peak: i === 2 ? 0.3 : 0.18, dur: i === 2 ? 0.16 : 0.02 }));
  };
  const bass = (t: number, freq: number, len: number) => {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.Q.value = 4;
    f.frequency.setValueAtTime(900, t);
    f.frequency.exponentialRampToValueAtTime(180, t + len);
    const g = ctx.createGain();
    env(g.gain, t, 0.16, 0.006, len);
    osc.connect(f).connect(g).connect(musicBus);
    osc.start(t);
    osc.stop(t + len + 0.05);
  };
  const pluck = (t: number, freq: number, accent: boolean) => {
    tone({ t, freq, type: 'triangle', peak: accent ? 0.06 : 0.04, attack: 0.003, release: 0.32, dest: melodic });
    tone({ t, freq: freq * 2, peak: 0.014, attack: 0.002, release: 0.12, dest: melodic });
  };
  const pad = (t: number, chord: number[]) => {
    const len = STEP * 16;
    for (const freq of chord) {
      for (const detune of [-8, 7]) {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freq / 2;
        osc.detune.value = detune;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.014, t + 0.12);
        g.gain.setValueAtTime(0.014, t + len - 0.2);
        g.gain.exponentialRampToValueAtTime(0.0001, t + len + 0.15);
        osc.connect(g).connect(padTone);
        osc.start(t);
        osc.stop(t + len + 0.2);
      }
    }
  };

  let timer = 0;
  let step = 0;
  let next = 0;
  let playing = false;

  const at = (n: number, t: number) => {
    const bar = Math.floor(n / 16);
    const i = n % 16;
    const c = bar % 4;
    // Sixteen bars of the full groove, then four lighter bars (no kick, no bass) so it breathes.
    const light = bar % 20 >= 16;
    if (i === 0) pad(t, CHORDS[c]);
    if (!light && i % 4 === 0) kick(t);
    if (i === 4 || i === 12) clap(t);
    if (i % 2 === 0) hit(t, { type: 'highpass', freq: 7000, q: 0.7, peak: i % 4 === 2 ? 0.09 : 0.04, dur: 0.035 });
    else if (Math.random() < 0.3) hit(t, { type: 'highpass', freq: 8000, q: 0.7, peak: 0.025, dur: 0.025 });
    const b = BASS[i];
    if (b && !light) bass(t, ROOTS[c] * (b === 2 ? 2 : b === 5 ? 1.5 : 1), STEP * 1.6);
    const a = ARP[bar % 2][i];
    if (a >= 0) pluck(t, CHORDS[c][a] * (bar % 8 >= 4 ? 2 : 1), i % 4 === 0);
  };

  const schedule = () => {
    while (next < ctx.currentTime + 0.15) {
      at(step, next);
      step += 1;
      next += STEP;
    }
  };

  const music = (on: boolean) => {
    const t = ctx.currentTime;
    musicBus.gain.cancelScheduledValues(t);
    musicBus.gain.setValueAtTime(musicBus.gain.value, t);
    if (on && !playing) {
      playing = true;
      musicBus.gain.linearRampToValueAtTime(1.2, t + 2);
      next = t + 0.08;
      step = 0;
      window.clearInterval(timer);
      schedule();
      timer = window.setInterval(schedule, 40);
    } else if (!on && playing) {
      playing = false;
      musicBus.gain.linearRampToValueAtTime(0, t + 1.2);
      window.setTimeout(() => {
        if (!playing) window.clearInterval(timer);
      }, 1300);
    }
  };

  const api: Engine = {
    play,
    music,
    resume: () => ctx.resume(),
    suspend: () => ctx.suspend(),
    dispose: () => {
      playing = false;
      window.clearInterval(timer);
      try {
        lfo.stop();
      } catch {
        /* already stopped */
      }
      void ctx.close().catch(() => undefined);
      if (holder.__studioEngine === api) holder.__studioEngine = undefined;
    },
  };
  holder.__studioEngine = api;
  return api;
}
