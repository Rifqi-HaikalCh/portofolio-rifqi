'use client';

import { ArrowDown, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { setSound, soundServerSnapshot, soundSnapshot, subscribeSound } from '../../lib/sound/control';
import { SWIPE_POSES } from '../scene/figurine-parts';
import { RifqiFigurine } from '../scene/RifqiFigurine';
import { PaperDialog } from '../ui/PaperDialog';
import { T } from '../ui/T';

/*
  Welcome tour (v3.11, owner: "on the first visit, a tutorial modal: a short
  welcome, then show that objects move when you scroll, and tell visitors to
  keep scrolling"). Two pages in the one modal (PaperDialog, §7):
    1  welcome: who and what this is
    2  how to move: an animated drawing (the wheel or a finger moves, and the
       paper on the little stage rises, a book opens, the camera slides), then
       "keep scrolling"
  Shown once per browser (localStorage), after the hero has settled. Never under
  automation (navigator.webdriver) unless `?welcome` is in the address, so the
  test suite still sees the page as a visitor who has been here before.
*/

const KEY = 'studio-welcome';
const DELAY_MS = 1200;

function seen() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return true; // storage blocked: never nag on every load
  }
}

export function WelcomeTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('welcome');
    if (!forced && (navigator.webdriver || seen())) return undefined;
    const timer = window.setTimeout(() => {
      setTouch(window.matchMedia('(pointer: coarse)').matches);
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* private mode: it shows again next visit */
    }
  }, []);

  if (!open) return null;

  const last = step === 1;
  const footer = (
    <div className="flex w-full items-center justify-between gap-4">
      <ol className="welcome-dots">
        {[0, 1].map((i) => (
          <li key={i} data-on={i === step || undefined}>
            <span className="sr-only">
              <T en={`Page ${i + 1} of 2${i === step ? ', current' : ''}`} id={`Halaman ${i + 1} dari 2${i === step ? ', saat ini' : ''}`} />
            </span>
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-2">
        {!last && (
          <button type="button" onClick={close} className="inline-flex min-h-11 items-center px-3 text-sm text-muted hover:text-ink">
            <T en="Skip" id="Lewati" />
          </button>
        )}
        <button
          type="button"
          onClick={() => (last ? close() : setStep(1))}
          className="inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          autoFocus
        >
          {last ? <T en="Start scrolling" id="Mulai menggulir" /> : <T en="Show me how" id="Tunjukkan caranya" />}
          {last ? <ArrowDown size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );

  return (
    <PaperDialog
      open={open}
      onClose={close}
      labelledBy="welcome-title"
      size={last ? 'md' : 'sm'}
      className="welcome-dialog"
      eyebrow={last ? <T en="How to explore" id="Cara menjelajah" /> : <T en="Welcome" id="Selamat datang" />}
      title={
        last ? (
          touch ? <T en="Swipe up, and the studio moves" id="Geser ke atas, studionya bergerak" /> : <T en="Scroll, and the studio moves" id="Gulir, studionya bergerak" />
        ) : (
          <T en="Hi, welcome to the Paper Studio" id="Hai, selamat datang di Paper Studio" />
        )
      }
      footer={footer}
    >
      {last ? (
        <div key="how" className="welcome-page">
          <ScrollDemo touch={touch} />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
            {touch ? (
              <T
                en="Every swipe moves the paper: the camera travels to the next desk, sheets rise with the story, books come off the shelf and open."
                id="Setiap geseran menggerakkan kertasnya: kamera pindah ke meja berikutnya, lembaran naik membawa cerita, buku keluar dari rak lalu terbuka."
              />
            ) : (
              <T
                en="Every turn of the wheel moves the paper: the camera travels to the next desk, sheets rise with the story, books come off the shelf and open."
                id="Setiap putaran roda mouse menggerakkan kertasnya: kamera pindah ke meja berikutnya, lembaran naik membawa cerita, buku keluar dari rak lalu terbuka."
              />
            )}
          </p>
          <p className="welcome-keep">
            <ArrowDown size={16} aria-hidden="true" />
            <T en="Keep scrolling to walk through all six rooms." id="Terus gulir untuk menjelajahi keenam ruangan." />
          </p>
        </div>
      ) : (
        <div key="hello" className="welcome-page">
          <p className="text-[0.9375rem] leading-relaxed text-ink">
            <T
              en="I am Rifqi, a software engineer. This portfolio is a small paper studio: six rooms, each one a part of my work, built from cut paper you can walk through."
              id="Saya Rifqi, seorang software engineer. Portofolio ini adalah studio kertas kecil: enam ruangan, masing-masing satu bagian dari pekerjaan saya, dibuat dari potongan kertas yang bisa kamu jelajahi."
            />
          </p>
          <ul className="welcome-tips">
            <li>
              <T en="Tap the desk lamp to switch day and night." id="Ketuk lampu meja untuk berganti siang dan malam." />
            </li>
            <li>
              <T en="EQBot, bottom right, answers questions about my work." id="EQBot, di kanan bawah, menjawab pertanyaan tentang pekerjaan saya." />
            </li>
            <li>
              <T en="Poke the paper me. I do not mind. Much." id="Coba colek saya versi kertas. Tidak apa-apa. Sedikit sakit, sih." />
            </li>
          </ul>
          <SoundHint />
        </div>
      )}
    </PaperDialog>
  );
}

/*
  v3.13 (owner: "a hint to turn the sound on for a better experience"). Sound
  stays off until asked (§10.4); the welcome page says it is there and offers
  the switch itself. The speaker on the desk and the navbar icon do the same.
*/
function SoundHint() {
  const on = useSyncExternalStore(subscribeSound, soundSnapshot, soundServerSnapshot);
  const Icon = on ? Volume2 : VolumeX;
  return (
    <div className="welcome-sound" data-on={on || undefined}>
      <span className="welcome-sound-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <p>
        <T
          en="Best with sound on: paper rustles, page turns and a soft studio tune. The speaker on the desk switches it too."
          id="Lebih seru dengan suara: gemerisik kertas, halaman dibalik dan musik studio yang lembut. Speaker di meja juga bisa menyalakannya."
        />
      </p>
      <button type="button" data-sound="none" aria-pressed={on} onClick={() => setSound(!on)} className="welcome-sound-btn">
        {on ? <T en="Sound on" id="Suara aktif" /> : <T en="Turn sound on" id="Nyalakan suara" />}
      </button>
    </div>
  );
}

/*
  v3.13 (owner: "a better tutorial animation, papercraft 2D/3D, my figure showing
  the swipe up and down slowly, the objects beside him moving with it"). A small
  shadow box: the paper me on the left swipes his near hand up and down in five
  stop-motion frames (§10.2); beside him a cut-paper browser card scrolls its
  chapter sheets, a book opens and a paper sheet rises, all keyed to the same
  progress `--p` (0 at rest, 1 at the top of the swipe). One rAF loop writes
  `--p` and `data-frame` on the stage only, so nothing re-renders. Reduced motion:
  one still frame, halfway up.
*/
const LOOP_MS = 7600;
// [time, progress]: rest, up slowly, hold, down slowly, rest.
const KEYS: readonly (readonly [number, number])[] = [
  [0, 0],
  [0.1, 0],
  [0.44, 1],
  [0.56, 1],
  [0.9, 0],
  [1, 0],
];
const ease = (x: number) => 0.5 - Math.cos(Math.PI * x) / 2;

function progressAt(t: number) {
  for (let i = 1; i < KEYS.length; i += 1) {
    const [t1, p1] = KEYS[i];
    const [t0, p0] = KEYS[i - 1];
    if (t <= t1) return p0 + (p1 - p0) * ease((t - t0) / (t1 - t0 || 1));
  }
  return 0;
}

const CHAPTERS = [
  { n: '01', en: 'The Desk', id: 'Meja' },
  { n: '02', en: 'About', id: 'Tentang' },
  { n: '03', en: 'Experience', id: 'Pengalaman' },
  { n: '04', en: 'Projects', id: 'Proyek' },
  { n: '05', en: 'Certificates', id: 'Sertifikat' },
  { n: '06', en: 'Contact', id: 'Kontak' },
];

function ScrollDemo({ touch }: { touch: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const write = (p: number, dir: 'up' | 'down') => {
      stage.style.setProperty('--p', p.toFixed(4));
      const frame = String(Math.min(SWIPE_POSES.length - 1, Math.round(p * (SWIPE_POSES.length - 1))));
      if (stage.dataset.frame !== frame) stage.dataset.frame = frame;
      if (stage.dataset.dir !== dir) stage.dataset.dir = dir;
    };
    if (still) {
      write(0.5, 'up');
      return undefined;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % LOOP_MS) / LOOP_MS;
      write(progressAt(t), t < 0.5 ? 'up' : 'down');
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="welcome-demo" data-frame="0" data-dir="up" aria-hidden="true">
      <div className="wt-wall" />
      <div className="wt-floor" />

      {/* The paper me, five frames of the swipe stacked; the stage shows one. */}
      <div className="wt-fig">
        <span className="wt-fig-shadow" />
        {SWIPE_POSES.map((pose, i) => (
          <RifqiFigurine key={pose} crop="wide" pose={pose} className="wt-frame" style={{ '--i': i } as CSSProperties} />
        ))}
      </div>

      {/* The gesture tag by his hand: a cut-paper arrow that turns with the swipe. */}
      <span className="wt-tag">
        <span className="wt-tag-arrow" />
        <span className="wt-tag-word">{touch ? <T en="swipe" id="geser" /> : <T en="scroll" id="gulir" />}</span>
      </span>

      {/* The browser card: chapter sheets scroll with the hand, the thumb runs down the rail. */}
      <div className="wt-card">
        <div className="wt-card-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="wt-card-view">
          <div className="wt-reel">
            {CHAPTERS.map((c) => (
              <div key={c.n} className="wt-leaf">
                <b>{c.n}</b>
                <span>
                  <T en={c.en} id={c.id} />
                </span>
                <em />
                <em />
              </div>
            ))}
          </div>
        </div>
        <span className="wt-rail">
          <span className="wt-thumb" />
        </span>
      </div>

      {/* In front: a sheet rising out of the floor slot and a book whose cover opens. */}
      <div className="wt-sheet">
        <em />
        <em />
        <em />
      </div>
      <div className="wt-book">
        <span className="wt-book-page" />
        <span className="wt-book-cover" />
      </div>
    </div>
  );
}
