'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useStudio } from './StudioProvider';
import { pageSections, type PageSectionId } from '../../data/sections';

/*
  Section hints (v3.9, owner request: "illustrated hints that tell visitors to
  scroll, or what they can do, by how they browse and their screen"). When a
  visitor pauses in a section they have not been hinted in yet, a small paper
  tag rises at the bottom centre with an animated drawing: a mouse wheel on a
  desktop stage, a finger swiping up on touch screens, a hand dragging the wire
  sideways in the gallery, a tap on the folios. It leaves on the next scroll,
  click or after a few seconds, and each section hints once per visit.
*/

type Kind = 'wheel' | 'swipe-up' | 'drag' | 'swipe-side' | 'tap' | 'write';
type Hint = { id: PageSectionId; kind: Kind; en: string; idn: string };

const KEY = 'studio-hints';
const SHOW_MS = 5200;
/** v3.10: a visitor still for this long gets a "where am I" hint, any number of times. */
const LOST_MS = 13000;

function seenSet() {
  try {
    return new Set<string>(JSON.parse(sessionStorage.getItem(KEY) ?? '[]'));
  } catch {
    return new Set<string>();
  }
}
function remember(set: Set<string>) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* private mode: hints repeat next visit, which is fine */
  }
}

function hintFor(id: PageSectionId): Hint | null {
  const touch = window.matchMedia('(pointer: coarse)').matches;
  const theatre =
    window.innerWidth >= 768 && window.innerHeight >= 561 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const go: Kind = touch ? 'swipe-up' : 'wheel';
  const move = touch ? 'Swipe up' : 'Scroll';
  const moveId = touch ? 'Geser ke atas' : 'Gulir';
  switch (id) {
    case 'home':
      return { id, kind: go, en: `${move} to walk into the studio`, idn: `${moveId} untuk masuk ke studio` };
    case 'about':
      return { id, kind: go, en: `${move}: the cards on the board come forward`, idn: `${moveId}: kartu di papan maju satu per satu` };
    case 'experience':
      return { id, kind: go, en: `${move} through the files · open one to read it all`, idn: `${moveId} menyusuri berkas · buka untuk membaca lengkap` };
    case 'services':
      return { id, kind: go, en: `${move}: each service is drawn on the board`, idn: `${moveId}: tiap layanan digambar di papan` };
    case 'projects':
      return theatre
        ? { id, kind: touch ? 'swipe-side' : 'drag', en: touch ? 'Swipe sideways along the wire, or scroll down' : 'Drag the wire sideways, or scroll down', idn: touch ? 'Geser ke samping di kawat, atau gulir ke bawah' : 'Seret kawat ke samping, atau gulir ke bawah' }
        : { id, kind: 'tap', en: 'Tap a project for its case study', idn: 'Ketuk proyek untuk studi kasusnya' };
    case 'certificates':
      return theatre
        ? { id, kind: go, en: `${move}: each book comes off the shelf and opens`, idn: `${moveId}: tiap buku keluar dari rak lalu terbuka` }
        : { id, kind: 'tap', en: 'Open a folio to see the certificates', idn: 'Buka map untuk melihat sertifikatnya' };
    case 'contact':
      return { id, kind: 'write', en: 'Write a note: it goes straight to Rifqi', idn: 'Tulis catatan: langsung sampai ke Rifqi' };
    default:
      return null;
  }
}

/** Where the visitor is and what comes next (v3.10, owner: "so visitors do not get lost"). */
function wayfinding(id: PageSectionId): Hint {
  const touch = window.matchMedia('(pointer: coarse)').matches;
  const i = pageSections.findIndex((section) => section.id === id);
  const here = pageSections[i];
  const next = pageSections[i + 1];
  const at = `${here.index} / 06`;
  if (!next) {
    return { id, kind: touch ? 'swipe-up' : 'wheel', en: `${at} ${here.en} · the last stop. Write a note, or go back up with Home`, idn: `${at} ${here.idn} · pemberhentian terakhir. Tulis catatan, atau kembali lewat Beranda` };
  }
  return {
    id,
    kind: touch ? 'swipe-up' : 'wheel',
    en: `${at} ${here.en} · ${touch ? 'swipe up' : 'scroll'} on to ${next.index} ${next.en}`,
    idn: `${at} ${here.idn} · ${touch ? 'geser ke atas' : 'gulir'} ke ${next.index} ${next.idn}`,
  };
}

function Drawing({ kind }: { kind: Kind }) {
  switch (kind) {
    case 'wheel':
      return (
        <svg viewBox="0 0 40 48" aria-hidden="true" className="hint-art">
          <rect x="11" y="3" width="18" height="28" rx="9" className="hint-paper" />
          <line x1="20" y1="9" x2="20" y2="14" className="hint-ink hint-wheel" />
          <path d="M14 37 L20 42 L26 37" className="hint-ink hint-chev" />
          <path d="M14 42 L20 47 L26 42" className="hint-ink hint-chev hint-chev-2" />
        </svg>
      );
    case 'swipe-up':
      return (
        <svg viewBox="0 0 40 48" aria-hidden="true" className="hint-art">
          <rect x="8" y="2" width="24" height="44" rx="3" className="hint-paper" />
          <line x1="20" y1="38" x2="20" y2="12" className="hint-trail hint-trail-up" />
          <circle cx="20" cy="36" r="5" className="hint-dot hint-finger-up" />
        </svg>
      );
    case 'drag':
    case 'swipe-side':
      return (
        <svg viewBox="0 0 56 40" aria-hidden="true" className="hint-art hint-art-wide">
          <path d="M4 20 L10 14 M4 20 L10 26 M4 20 H20" className="hint-ink hint-arrow-l" />
          <path d="M52 20 L46 14 M52 20 L46 26 M52 20 H36" className="hint-ink hint-arrow-r" />
          <circle cx="28" cy="20" r="6" className="hint-dot hint-finger-side" />
        </svg>
      );
    case 'tap':
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true" className="hint-art">
          <rect x="6" y="8" width="28" height="22" rx="2" className="hint-paper" />
          <circle cx="24" cy="22" r="9" className="hint-ring" />
          <circle cx="24" cy="22" r="4.5" className="hint-dot hint-tap" />
        </svg>
      );
    case 'write':
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true" className="hint-art">
          <rect x="5" y="8" width="30" height="24" rx="2" className="hint-paper" />
          <path d="M10 18 H26 M10 24 H22" className="hint-ink hint-lines" />
          <path d="M27 27 L34 12 L37 13.5 L30 28.5 Z" className="hint-pencil" />
        </svg>
      );
  }
}

export function SectionHints() {
  const { activeId } = useStudio();
  const { say } = useLanguage();
  const [hint, setHint] = useState<Hint | null>(null);
  const seen = useRef<Set<string> | null>(null);

  // A pause in a new section raises its hint.
  useEffect(() => {
    seen.current ??= seenSet();
    if (seen.current.has(activeId)) return undefined;
    let wait = 0;
    const arm = () => {
      window.clearTimeout(wait);
      wait = window.setTimeout(
        () => {
          if (document.querySelector('dialog[open]') || document.querySelector('.eqbot-panel')) return arm();
          const next = hintFor(activeId);
          if (!next || !seen.current) return;
          seen.current.add(activeId);
          remember(seen.current);
          setHint(next);
        },
        activeId === 'home' ? 2600 : 1900,
      );
    };
    arm();
    window.addEventListener('scroll', arm, { passive: true });
    return () => {
      window.clearTimeout(wait);
      window.removeEventListener('scroll', arm);
    };
  }, [activeId]);

  // Still for a long while anywhere: a wayfinding tag (repeats after each pause).
  useEffect(() => {
    let wait = 0;
    const arm = () => {
      window.clearTimeout(wait);
      wait = window.setTimeout(() => {
        if (document.querySelector('dialog[open]') || document.querySelector('.eqbot-panel')) return arm();
        setHint(wayfinding(activeId));
      }, LOST_MS);
    };
    arm();
    const events = ['scroll', 'pointerdown', 'keydown'] as const;
    events.forEach((type) => window.addEventListener(type, arm, { passive: true }));
    return () => {
      window.clearTimeout(wait);
      events.forEach((type) => window.removeEventListener(type, arm));
    };
  }, [activeId]);

  // It leaves on the next scroll or click, or by itself.
  useEffect(() => {
    if (!hint) return undefined;
    const start = window.scrollY;
    const leave = () => setHint(null);
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) > 40) leave();
    };
    const timer = window.setTimeout(leave, SHOW_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', leave);
    window.addEventListener('keydown', leave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', leave);
      window.removeEventListener('keydown', leave);
    };
  }, [hint]);

  if (!hint) return null;
  return (
    <div className="section-hint" role="status" data-kind={hint.kind} key={`${hint.id}-${hint.en}`}>
      <Drawing kind={hint.kind} />
      <span>{say(hint.en, hint.idn)}</span>
    </div>
  );
}
