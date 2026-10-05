'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Portal } from './Portal';
import {
  additionalSkillCards,
  additionalSkillTiers,
  type CatalogSkill,
  type SkillTierRow,
} from '../../lib/additional-skills';

type TabId = 'all' | 'tier';

const tierCopy = {
  lead: { en: 'Tier I · Most used', id: 'Tingkat I · Paling sering' },
  repeat: { en: 'Tier II · Repeated', id: 'Tingkat II · Berulang' },
  once: { en: 'Tier III · Once', id: 'Tingkat III · Sekali' },
} as const;

export function AdditionalSkillsCell({
  onOpen,
  language,
}: {
  onOpen: () => void;
  language: 'en' | 'id';
}) {
  const id = language === 'en';
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="cell-open flex h-full w-full flex-1 flex-col items-center justify-center gap-2 p-4 text-center"
    >
      <span className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent">
        {id ? 'Language · Framework' : 'Bahasa · Framework'}
      </span>
      <span className="cell-open-title font-serif text-lg leading-snug text-ink">
        {id ? 'Additional Skills' : 'Keterampilan Tambahan'}
      </span>
    </button>
  );
}

export function AdditionalSkillsDialog({
  language,
  onClose,
}: {
  language: 'en' | 'id';
  onClose: () => void;
}) {
  const idn = language === 'id';
  const text = (en: string, id: string) => (idn ? id : en);
  const cards = useMemo(() => additionalSkillCards(), []);
  const tiers = useMemo(() => additionalSkillTiers(cards), [cards]);
  const maxCount = tiers[0]?.count ?? 1;
  const [tab, setTab] = useState<TabId>('all');
  const [focus, setFocus] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const shown = focus ? cards.filter((card) => card.skills.some((skill) => skill.name === focus)) : cards;

  const openSkill = (name: string) => {
    setFocus(name);
    setTab('all');
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[99999] overflow-y-auto overscroll-contain bg-ink/45 dark:bg-paper/80 flex p-4 sm:p-8"
        onClick={onClose}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="additional-skills-title"
          tabIndex={-1}
          className="bg-raised text-ink border border-line w-full max-w-5xl m-auto outline-none flex flex-col max-h-[90vh]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-6 p-6 md:p-8 border-b border-line">
            <div>
              <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-2">
                {text('Outside the enterprise core', 'Di luar inti enterprise')}
              </p>
              <h3 id="additional-skills-title" className="font-serif text-3xl md:text-4xl font-medium leading-tight">
                {text('Additional Skills', 'Keterampilan Tambahan')}
              </h3>
              <p className="mt-2 max-w-xl text-muted leading-relaxed">
                {text(
                  'Languages and frameworks from the work and projects already listed on this page.',
                  'Bahasa dan framework dari kerja dan projek yang sudah tercantum di halaman ini.'
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={text('Close', 'Tutup')}
              className="w-10 h-10 shrink-0 border border-line flex items-center justify-center hover:border-ink hover:bg-ink hover:text-paper"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 md:px-8 pt-6">
            <div className="flex w-fit flex-col border border-line sm:flex-row" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'all'}
                onClick={() => setTab('all')}
                className={`px-5 py-3 text-sm text-left sm:text-center ${tab === 'all' ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
              >
                {text('All Additional Skills', 'Semua Keterampilan Tambahan')}
                <span className="ml-2 font-serif">{cards.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'tier'}
                onClick={() => setTab('tier')}
                className={`px-5 py-3 text-sm text-left sm:text-center border-t sm:border-t-0 sm:border-l border-line ${tab === 'tier' ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
              >
                {text('List Tier Additional Skills', 'Daftar Tingkat Keterampilan Tambahan')}
              </button>
            </div>
          </div>

          <div key={tab} className="frame-swap flex-1 overflow-y-auto p-6 md:p-8">
            {tab === 'all' ? (
              <div>
                {focus && (
                  <div className="mb-6 flex items-center justify-between gap-4 border border-line px-4 py-3">
                    <p className="text-sm text-ink">
                      {text('Showing works that use', 'Menampilkan karya yang memakai')}{' '}
                      <span className="text-accent">{focus}</span>
                    </p>
                    <button type="button" onClick={() => setFocus(null)} className="text-sm text-ink link-mark">
                      {text('Show all', 'Tampilkan semua')}
                    </button>
                  </div>
                )}
                <ul className="grid sm:grid-cols-2 gap-6" aria-live="polite">
                  {shown.map((card) => (
                    <li key={card.id} className="border border-line bg-paper">
                      <div className="relative h-40 border-b border-line bg-raised">
                        <Image src={card.image} alt="" fill sizes="360px" className="object-contain" />
                      </div>
                      <div className="p-5">
                        <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent">
                          {card.source === 'work' ? text('Work', 'Kerja') : text('Project', 'Projek')}
                        </p>
                        <h4 className="mt-2 font-serif text-xl font-medium leading-snug text-ink">
                          {idn && card.titleId ? card.titleId : card.title}
                        </h4>
                        <SkillLines
                          skills={card.skills}
                          focus={focus}
                          onPick={openSkill}
                          languageLabel={text('Language', 'Bahasa')}
                          frameworkLabel={text('Framework', 'Framework')}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="max-w-xl text-muted leading-relaxed">
                  {text(
                    'Counted once for each work or project outside the enterprise core. Choose a row to see those works.',
                    'Dihitung sekali untuk tiap kerja atau projek di luar inti enterprise. Pilih baris untuk melihat karya itu.'
                  )}
                </p>
                {(['lead', 'repeat', 'once'] as const).map((tier) => {
                  const rows = tiers.filter((row) => row.tier === tier);
                  if (!rows.length) return null;
                  return (
                    <section key={tier} className="mt-8">
                      <h4 className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-3">
                        {idn ? tierCopy[tier].id : tierCopy[tier].en}
                      </h4>
                      <ul className="border-t border-line">
                        {rows.map((row) => (
                          <li key={row.skill.name} className="border-b border-line">
                            <TierRow row={row} maxCount={maxCount} language={language} onPick={openSkill} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}

function SkillLines({
  skills,
  focus,
  onPick,
  languageLabel,
  frameworkLabel,
}: {
  skills: CatalogSkill[];
  focus: string | null;
  onPick: (name: string) => void;
  languageLabel: string;
  frameworkLabel: string;
}) {
  const languages = skills.filter((skill) => skill.kind === 'language');
  const frameworks = skills.filter((skill) => skill.kind === 'framework');

  return (
    <div className="mt-4 space-y-3">
      {languages.length > 0 && (
        <SkillRow label={languageLabel} skills={languages} focus={focus} onPick={onPick} />
      )}
      {frameworks.length > 0 && (
        <SkillRow label={frameworkLabel} skills={frameworks} focus={focus} onPick={onPick} />
      )}
    </div>
  );
}

function SkillRow({
  label,
  skills,
  focus,
  onPick,
}: {
  label: string;
  skills: CatalogSkill[];
  focus: string | null;
  onPick: (name: string) => void;
}) {
  return (
    <div>
      <p className="font-jetbrains-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill.name}>
            <button
              type="button"
              onClick={() => onPick(skill.name)}
              aria-pressed={focus === skill.name}
              className={`inline-flex items-center gap-2 border px-2 py-1 text-sm ${
                focus === skill.name ? 'border-accent text-accent' : 'border-line text-ink hover:border-accent hover:text-accent'
              }`}
            >
              <Image src={skill.image} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
              {skill.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TierRow({
  row,
  maxCount,
  language,
  onPick,
}: {
  row: SkillTierRow;
  maxCount: number;
  language: 'en' | 'id';
  onPick: (name: string) => void;
}) {
  const idn = language === 'id';
  const width = `${Math.round((row.count / maxCount) * 100)}%`;

  return (
    <button type="button" onClick={() => onPick(row.skill.name)} className="read-row w-full px-1 py-4 text-left cursor-pointer">
      <span className="flex items-center gap-4">
        <span className="font-jetbrains-mono text-[11px] tracking-[0.14em] text-accent w-6">
          {String(row.rank).padStart(2, '0')}
        </span>
        <Image src={row.skill.image} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-xl text-ink">{row.skill.name}</span>
          <span className="block text-sm text-muted">
            {row.skill.kind === 'language' ? (idn ? 'Bahasa' : 'Language') : 'Framework'}
            {' · '}
            {idn ? `Dipakai di ${row.count}` : `Used in ${row.count}`}
          </span>
        </span>
      </span>
      <span className="tier-rule mt-3 ml-10 block" aria-hidden="true">
        <span style={{ width }} />
      </span>
    </button>
  );
}
