import Image from 'next/image';
import { Plus } from 'lucide-react';
import { workExperience, organizationExperience } from '../../data/portfolio';
import type { Experience as ExperienceEntry } from '../../types';
import { calculateTotalExperience } from '../../lib/experience-utils';
import { displayCase } from '../../lib/display-case';
import { SectionTitle } from '../ui/SectionTitle';
import { TabbedPanels } from '../ui/TabbedPanels';
import { Tag } from '../ui/Tag';
import { T } from '../ui/T';
import { CabinetStation, type FolderSet } from '../scenes/cabinet/CabinetStation';
import { CABINET_CHAPTER } from '../scenes/cabinet/beats';
import { Beat, Chapter } from '../scenes/chapter/Chapter';

const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? '';

const bullets = (text?: string) =>
  (text ?? '')
    .split('\n')
    .map((line) => line.replace(/^[•\-\s]+/, '').trim())
    .filter(Boolean);

/* One ledger row: a <details> unfolds in place (native aria-expanded, no JS). */
function LedgerRow({ entry, index, set }: { entry: ExperienceEntry; index: number; set: string }) {
  const en = bullets(entry.description);
  const id = bullets(entry.descriptionId);
  return (
    <li className="border-b border-line">
      <details className="folio group" data-row={`${set}-${index}`}>
        <summary className="grid min-h-11 grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-1 py-6 md:grid-cols-[3rem_1fr_14rem_2rem] md:gap-x-8">
          <span className="stamp pt-1 text-xs" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-xl font-medium leading-snug text-ink md:text-2xl">
              <T en={displayCase(entry.title)} id={displayCase(entry.titleId ?? entry.title)} />
            </span>
            <span className="mt-1 block text-ink">{displayCase(entry.company)}</span>
            <span className="mt-2 block max-w-[62ch] text-[15px] leading-relaxed text-muted">
              <T en={entry.shortDescription} id={entry.shortDescriptionId} />
            </span>
          </span>
          <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted md:col-start-3 md:row-start-1 md:text-right">
            <span className="block text-accent">{entry.period}</span>
            {entry.location && <span className="mt-1 block normal-case tracking-normal">{entry.location}</span>}
            {entry.logo && (
              <Image
                src={entry.logo}
                alt=""
                width={128}
                height={28}
                className="mt-3 h-7 w-auto max-w-32 object-contain object-left md:ml-auto md:object-right"
              />
            )}
          </span>
          <span
            className="folio-mark col-start-3 row-start-1 inline-flex h-8 w-8 items-center justify-center border border-line text-ink md:col-start-4"
            aria-hidden="true"
          >
            <Plus size={14} />
          </span>
        </summary>
        <div className="folio-body grid gap-6 pb-8 pl-14 md:grid-cols-[1fr_14rem] md:gap-8 md:pl-20">
          {en.length > 0 && (
            <ul className="max-w-[68ch] space-y-2 text-[15px] leading-relaxed text-ink">
              {en.map((line, i) => (
                <li key={line} className="grid grid-cols-[1rem_1fr]">
                  <span className="text-accent" aria-hidden="true">—</span>
                  <span>
                    <T en={line} id={id[i]} />
                  </span>
                </li>
              ))}
            </ul>
          )}
          {entry.techStack && entry.techStack.length > 0 && (
            <ul aria-label="Stack" className="flex flex-wrap content-start gap-1.5 md:justify-end">
              {entry.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </ul>
          )}
        </div>
      </details>
    </li>
  );
}

const Ledger = ({ entries, set }: { entries: ExperienceEntry[]; set: string }) => (
  <ol className="border-t border-line bg-raised px-4 sm:px-6">
    {entries.map((entry, index) => (
      <LedgerRow key={entry.id} entry={entry} index={index} set={set} />
    ))}
  </ol>
);

/*
  03 Experience — the Filing Cabinet chapter (DesignRules.md §4.5 `03`): the
  drawer slides out with the title, the current role emerges from the newest
  folder past the drawer front, then the full ledger rises in folder tabs.
  Rows are tagged `data-row` so the station lifts the matching folder (CSS
  :has, no JS). Total experience is worked out on the server; the page
  revalidates daily.
*/
export function Experience() {
  const total = calculateTotalExperience(workExperience);
  const current = workExperience[0];
  const sets: FolderSet[] = [
    { name: 'work', years: workExperience.map((entry) => startYear(entry.period)) },
    { name: 'organization', years: organizationExperience.map((entry) => startYear(entry.period)) },
  ];

  return (
    <Chapter
      spec={CABINET_CHAPTER}
      labelledBy="experience-title"
      studio="ledger"
      next={{ id: 'services', en: 'Services', idn: 'Layanan' }}
      stage={<CabinetStation sets={sets} wide />}
      front={<CabinetStation sets={sets} wide only={['drawer-front']} name="cabinet-front" />}
    >
      <Beat id="title" className="[&>header]:mb-0">
        <SectionTitle
          index="03"
          eyebrow={<T en="Ledger" id="Buku besar" />}
          title={<T en="Experience" id="Pengalaman" />}
          titleId="experience-title"
          lede={
            <T
              en="Where I've worked, newest first. Open a row for what I shipped there."
              id="Tempat saya bekerja, dari yang terbaru. Buka baris untuk melihat apa yang saya kerjakan."
            />
          }
        />
        <p data-eqbot="experience-total" data-eqbot-at="above" className="mt-6 border-l-2 border-accent pl-4">
          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <T en="Total work experience" id="Total pengalaman kerja" />
          </span>
          <span className="mt-1 block font-serif text-3xl text-ink">
            {total.years} <T en={total.years === 1 ? 'year' : 'years'} id="tahun" /> {total.months}{' '}
            <T en={total.months === 1 ? 'month' : 'months'} id="bulan" />
          </span>
        </p>
      </Beat>

      <Beat id="current" className="fold-tr">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span className="stamp">{startYear(current.period)}</span> — <T en="Now" id="Saat ini" />
        </p>
        <p className="mt-4 font-serif text-2xl font-medium leading-snug text-ink md:text-3xl">
          <T en={displayCase(current.title)} id={displayCase(current.titleId ?? current.title)} />
        </p>
        <p className="mt-1 text-ink">{displayCase(current.company)}</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {current.period}
          {current.location ? ` · ${current.location}` : ''}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          <T en={current.shortDescription} id={current.shortDescriptionId} />
        </p>
      </Beat>

      <Beat id="ledger" flow className="beat-ledger">
        <TabbedPanels
          idBase="experience"
          eqbot="experience-tabs"
          label={{ en: 'Experience type', id: 'Jenis pengalaman' }}
          tabs={[
            { id: 'work', en: 'Work', idn: 'Kerja', count: workExperience.length, panel: <Ledger entries={workExperience} set="work" /> },
            {
              id: 'organization',
              en: 'Organizations',
              idn: 'Organisasi',
              count: organizationExperience.length,
              panel: <Ledger entries={organizationExperience} set="organization" />,
            },
          ]}
        />
      </Beat>
    </Chapter>
  );
}
