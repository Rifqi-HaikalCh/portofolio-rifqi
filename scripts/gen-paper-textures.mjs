/*
  Generates the seamless paper texture tiles used by paper-kit grain
  (DesignRules.md §2.4, §9.5). Each tile is 256 × 256 RGBA: dark fibres and
  light fibres as alpha over transparent, so one tile works on any fill and in
  both themes. Deterministic (seeded): re-running gives identical files.

  Usage: node scripts/gen-paper-textures.mjs
*/
import sharp from 'sharp';

const N = 256;
const OUT = 'public/assets/papercraft';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Tileable value noise with the given period (must divide N). */
function valueNoise(rand, period) {
  const grid = Array.from({ length: period * period }, () => rand() * 2 - 1);
  const at = (x, y) => grid[((y + period) % period) * period + ((x + period) % period)];
  const smooth = (t) => t * t * (3 - 2 * t);
  return (px, py) => {
    const fx = (px / N) * period;
    const fy = (py / N) * period;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = smooth(fx - x0);
    const ty = smooth(fy - y0);
    const a = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * tx;
    const b = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * tx;
    return a + (b - a) * ty;
  };
}

function field() {
  return new Float32Array(N * N);
}

function add(f, x, y, v) {
  const i = (((y % N) + N) % N) * N + (((x % N) + N) % N);
  f[i] += v;
}

function fibres(f, rand, count, minLen, maxLen, strength, darkShare, angle = null) {
  for (let n = 0; n < count; n += 1) {
    const len = minLen + rand() * (maxLen - minLen);
    const a = angle ?? rand() * Math.PI;
    const wobble = (rand() - 0.5) * 0.6;
    const v = (rand() < darkShare ? -1 : 1) * strength * (0.4 + rand() * 0.6);
    let x = rand() * N;
    let y = rand() * N;
    for (let s = 0; s < len; s += 0.7) {
      const t = a + Math.sin(s * 0.15) * wobble;
      x += Math.cos(t) * 0.7;
      y += Math.sin(t) * 0.7;
      add(f, Math.round(x), Math.round(y), v * (1 - Math.abs(s / len - 0.5)));
    }
  }
}

function octaves(f, rand, list) {
  for (const [period, amp] of list) {
    const noise = valueNoise(rand, period);
    for (let y = 0; y < N; y += 1) for (let x = 0; x < N; x += 1) f[y * N + x] += noise(x, y) * amp;
  }
}

async function write(name, f, dark, light) {
  const px = Buffer.alloc(N * N * 4);
  for (let i = 0; i < N * N; i += 1) {
    const v = Math.max(-1, Math.min(1, f[i]));
    const c = v < 0 ? dark : light;
    px[i * 4] = c[0];
    px[i * 4 + 1] = c[1];
    px[i * 4 + 2] = c[2];
    px[i * 4 + 3] = Math.round(Math.abs(v) * 255);
  }
  const file = `${OUT}/tex-${name}.webp`;
  await sharp(px, { raw: { width: N, height: N, channels: 4 } }).webp({ quality: 82, alphaQuality: 80, effort: 6 }).toFile(file);
  console.log(file);
}

const DARK = [52, 38, 26];
const LIGHT = [255, 252, 244];

{
  const r = rng(11);
  const f = field();
  octaves(f, r, [[8, 0.12], [32, 0.08], [128, 0.1]]);
  fibres(f, r, 1400, 5, 16, 0.38, 0.55);
  await write('cardstock', f, DARK, LIGHT);
}
{
  const r = rng(23);
  const f = field();
  octaves(f, r, [[4, 0.2], [16, 0.14], [64, 0.1]]);
  fibres(f, r, 2600, 8, 30, 0.5, 0.65);
  await write('kraft', f, DARK, LIGHT);
}
{
  const r = rng(37);
  const f = field();
  octaves(f, r, [[8, 0.22], [32, 0.16]]);
  for (let n = 0; n < 5200; n += 1) {
    const cx = r() * N;
    const cy = r() * N;
    const rad = 0.8 + r() * 2.4;
    const v = (r() < 0.62 ? -1 : 1) * (0.3 + r() * 0.5);
    for (let y = -3; y <= 3; y += 1) for (let x = -3; x <= 3; x += 1) {
      const d = Math.hypot(x, y);
      if (d <= rad) add(f, Math.round(cx + x), Math.round(cy + y), v * (1 - d / (rad + 0.5)));
    }
  }
  await write('cork', f, [40, 26, 14], [255, 236, 200]);
}
{
  const r = rng(53);
  const f = field();
  const warp = valueNoise(r, 4);
  const rows = valueNoise(r, 64);
  for (let y = 0; y < N; y += 1) for (let x = 0; x < N; x += 1) {
    f[y * N + x] += rows(0, y + warp(x, y) * 18) * 0.38;
  }
  fibres(f, r, 900, 20, 70, 0.4, 0.7, 0);
  await write('wood', f, [44, 28, 16], [255, 238, 214]);
}
