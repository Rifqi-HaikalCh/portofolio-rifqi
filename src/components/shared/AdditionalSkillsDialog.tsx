'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { PaperDialog } from '../ui/PaperDialog';
import { FolderTabs } from '../ui/FolderTabs';
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

/*
  Languages and frameworks outside the .NET core, counted from the work and
  projects on the page. Loaded only when the reader opens it (next/dynamic),
  so its data never reaches the first-load bundle.
*/
export default function AdditionalSkillsDialog({
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

  const shown = focus ? cards.filter((card) => card.skills.some((skill) => skill.name === focus)) : cards;

  const openSkill = (name: string) => {
    setFocus(name);
    setTab('all');
  };

  return (
    <PaperDialog open onClose={onClose} labelledBy="additional-skills-title" className="max-w-5xl">
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div className="flex items-start justify-between gap-6 border-b border-line p-6 md:p-8">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {text('Outside the enterprise core', 'Di luar inti enterprise')}
            </p>
            <h3 id="additional-skills-title" className="font-serif text-3xl font-medium leading-tight md:text-4xl">
              {text('Additional skills', 'Keterampilan tambahan')}
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">
              {text(
                'Languages and frameworks from the work and projects already listed on this page.',
                'Bahasa dan framework dari kerja dan proyek yang sudah tercantum di halaman ini.'
              )}
            </p>
          </div>
          <form method="dialog">
            <button
              type="submit"
              aria-label={text('Close', 'Tutup')}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-line hover:border-ink hover:bg-ink hover:text-paper"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="px-6 pt-6 md:px-8">
          <FolderTabs<TabId>
            idBase="additional-skills"
            label={text('Additional skills view', 'Tampilan keterampilan tambahan')}
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'all', label: text('All works', 'Semua karya'), count: cards.length },
              { id: 'tier', label: text('By tier', 'Per tingkat') },
            ]}
          />
        </div>

        <div
          key={tab}
          id={`additional-skills-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`additional-skills-tab-${tab}`}
          className="ledger-panel flex-1 overflow-y-auto p-6 md:p-8"
        >
          {tab === 'all' ? (
            <div>
              {focus && (
                <div className="mb-6 flex items-center justify-between gap-4 border border-line px-4 py-3">
                  <p className="text-sm text-ink">
                    {text('Showing works that use', 'Menampilkan karya yang memakai')}{' '}
                    <span className="text-accent">{focus}</span>
                  </p>
                  <button type="button" onClick={() => setFocus(null)} className="link-mark min-h-11 text-sm text-ink">
                    {text('Show all', 'Tampilkan semua')}
                  </button>
                </div>
              )}
              <ul className="grid gap-6 sm:grid-cols-2" aria-live="polite">
                {shown.map((card) => (
                  <li key={card.id} className="border border-line bg-paper">
                    <div className="relative h-40 border-b border-line bg-raised">
                      <Image src={card.image} alt="" fill sizes="360px" className="object-contain" />
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                        {card.source === 'work' ? text('Work', 'Kerja') : text('Project', 'Proyek')}
                      </p>
                      <h4 className="mt-2 font-serif text-xl font-medium leading-snug text-ink">
                        {idn && card.titleId ? card.titleId : card.title}
                      </h4>
                      <SkillLines
                        skills={card.skills}
                        focus={focus}
                        onPick={openSkill}
                        languageLabel={text('Language', 'Bahasa')}
                        frameworkLabel="Framework"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p className="max-w-xl leading-relaxed text-muted">
                {text(
                  'Counted once for each work or project outside the enterprise core. Choose a row to see those works.',
                  'Dihitung sekali untuk tiap kerja atau proyek di luar inti enterprise. Pilih baris untuk melihat karya itu.'
                )}
              </p>
              {(['lead', 'repeat', 'once'] as const).map((tier) => {
                const rows = tiers.filter((row) => row.tier === tier);
                if (!rows.length) return null;
                return (
                  <section key={tier} className="mt-8">
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
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
    </PaperDialog>
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
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">{label}</p>
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
    <button type="button" onClick={() => onPick(row.skill.name)} className="read-row min-h-11 w-full cursor-pointer px-1 py-4 text-left">
      <span className="flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent w-6">
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
