'use client';

import { ArrowDown, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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
      size="sm"
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
              <T en="Poke the little paper me. I do not mind. Much." id="Coba colek saya versi kertas. Tidak apa-apa. Sedikit sakit, sih." />
            </li>
          </ul>
        </div>
      )}
    </PaperDialog>
  );
}

/* The little stage: as the wheel (or finger) moves, a sheet rises, a book opens and the scroll thumb runs down. */
function ScrollDemo({ touch }: { touch: boolean }) {
  return (
    <svg viewBox="0 0 320 170" className="welcome-demo" aria-hidden="true">
      <rect x="1" y="1" width="318" height="168" rx="3" className="wd-frame" />
      <g className="wd-world">
        <rect x="1" y="1" width="318" height="118" className="wd-wall" />
        <rect x="1" y="119" width="318" height="50" className="wd-floor" />
        <rect x="150" y="96" width="140" height="10" className="wd-desk" />
        <rect x="160" y="106" width="8" height="40" className="wd-desk" />
        <rect x="272" y="106" width="8" height="40" className="wd-desk" />
        {/* The book on the desk: its cover turns open. */}
        <rect x="222" y="80" width="30" height="16" className="wd-page" />
        <rect x="222" y="80" width="30" height="16" className="wd-cover" />
        {/* The figure. */}
        <g className="wd-fig">
          <circle cx="132" cy="60" r="11" className="wd-skin" />
          <path d="M125 54 Q132 44 140 54 Z" className="wd-hair" />
          <rect x="122" y="71" width="20" height="34" rx="3" className="wd-shirt" />
          <rect x="124" y="105" width="7" height="34" className="wd-jeans" />
          <rect x="133" y="105" width="7" height="34" className="wd-jeans" />
        </g>
      </g>
      {/* The sheet that rises with the scroll. */}
      <g className="wd-sheet">
        <rect x="176" y="30" width="58" height="46" className="wd-paper" />
        <line x1="184" y1="42" x2="222" y2="42" className="wd-ink" />
        <line x1="184" y1="52" x2="214" y2="52" className="wd-ink" />
        <line x1="184" y1="60" x2="218" y2="60" className="wd-ink" />
      </g>
      {/* The scrollbar. */}
      <rect x="306" y="10" width="5" height="150" rx="2.5" className="wd-track" />
      <rect x="306" y="10" width="5" height="34" rx="2.5" className="wd-thumb" />
      {touch ? (
        <g className="wd-finger">
          <circle cx="44" cy="120" r="10" className="wd-dot" />
          <line x1="44" y1="120" x2="44" y2="64" className="wd-trail" />
        </g>
      ) : (
        <g className="wd-mouse">
          <rect x="30" y="66" width="30" height="48" rx="15" className="wd-paper" />
          <line x1="45" y1="74" x2="45" y2="84" className="wd-wheel" />
        </g>
      )}
    </svg>
  );
}
