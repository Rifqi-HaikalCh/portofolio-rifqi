import Image from 'next/image';
import { X } from 'lucide-react';
import { workExperience, organizationExperience } from '../../data/portfolio';
import type { Experience as ExperienceEntry } from '../../types';
import { calculateTotalExperience } from '../../lib/experience-utils';
import { displayCase } from '../../lib/display-case';
import { SectionTitle } from '../ui/SectionTitle';
import { Tag } from '../ui/Tag';
import { T } from '../ui/T';
import { CabinetStation, type FolderSet } from '../scenes/cabinet/CabinetStation';
import { CABINET_CHAPTER } from '../scenes/cabinet/beats';
import { Beat, Chapter } from '../scenes/chapter/Chapter';
import { ExperienceFile } from './ExperienceFile';

const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? '';

const bullets = (text?: string) =>
  (text ?? '')
    .split('\n')
    .map((line) => line.replace(/^[•\-\s]+/, '').trim())
    .filter(Boolean);

const SETS = {
  work: { en: 'Work', idn: 'Kerja' },
  organization: { en: 'Organization', idn: 'Organisasi' },
} as const;

/* The full entry, opened from the sheet as a paper dialog: what was shipped, the stack. */
function FileBody({ entry, titleId }: { entry: ExperienceEntry; titleId: string }) {
  const en = bullets(entry.description);
  const id = bullets(entry.descriptionId);
  return (
    <div className="fold-tr max-h-[calc(100dvh-2rem)] overflow-y-auto">
      <header className="flex items-start justify-between gap-6 border-b border-line p-6 md:p-8">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{entry.period}</p>
          <h3 id={titleId} className="mt-2 font-serif text-3xl font-medium leading-tight text-ink">
            <T en={displayCase(entry.title)} id={displayCase(entry.titleId ?? entry.title)} />
          </h3>
          <p className="mt-1 text-ink">
            {displayCase(entry.company)}
            {entry.location ? <span className="text-muted"> · {entry.location}</span> : null}
          </p>
        </div>
        <form method="dialog">
          <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink hover:bg-ink hover:text-paper">
            <X size={18} aria-hidden="true" />
            <span className="sr-only">
              <T en="Close the file" id="Tutup berkas" />
            </span>
          </button>
        </form>
      </header>
      <div className="grid gap-8 p-6 md:grid-cols-[1fr_13rem] md:p-8">
        {en.length > 0 && (
          <ul className="max-w-[68ch] space-y-2 text-[15px] leading-relaxed text-ink">
            {en.map((line, i) => (
              <li key={line} className="grid grid-cols-[1rem_1fr]">
                <span className="text-accent" aria-hidden="true">
                  —
                </span>
                <span>
                  <T en={line} id={id[i]} />
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="space-y-4">
          {entry.logo && <Image src={entry.logo} alt="" width={128} height={28} className="h-7 w-auto max-w-32 object-contain object-left" />}
          {entry.techStack && entry.techStack.length > 0 && (
            <ul aria-label="Stack" className="flex flex-wrap content-start gap-1.5">
              {entry.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* One role: what is on the sheet that comes out of its folder (§4.5 `03`). Short enough to pin; the rest is in the file. */
function RoleSheet({ entry, set, index, count }: { entry: ExperienceEntry; set: 'work' | 'organization'; index: number; count: number }) {
  const titleId = `experience-${set}-${index}-file`;
  return (
    <article aria-labelledby={`experience-${set}-${index}-role`} data-eqbot={set === 'work' && index === 0 ? 'experience-files' : undefined}>
      <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        <span className="stamp">{startYear(entry.period)}</span>
        <span className="text-muted">
          <T en={SETS[set].en} id={SETS[set].idn} /> · {String(index + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}
        </span>
      </p>
      <h3 id={`experience-${set}-${index}-role`} className="mt-4 font-serif text-2xl font-medium leading-snug text-ink md:text-3xl">
        <T en={displayCase(entry.title)} id={displayCase(entry.titleId ?? entry.title)} />
      </h3>
      <p className="mt-1 text-ink">{displayCase(entry.company)}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        {entry.period}
        {entry.location ? ` · ${entry.location}` : ''}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        <T en={entry.shortDescription} id={entry.shortDescriptionId} />
      </p>
      <ExperienceFile
        titleId={titleId}
        label={
          <>
            <T en="Open the file" id="Buka berkas" />
            <span className="sr-only">: {displayCase(entry.company)}</span>
          </>
        }
      >
        <FileBody entry={entry} titleId={titleId} />
      </ExperienceFile>
    </article>
  );
}

/*
  03 Experience — the Filing Cabinet chapter (DesignRules.md §4.5 `03`, v3.4):
  the drawer slides out with the title, then every role comes out of its own
  folder, one sheet per beat, newest first; the organisation roles follow
  from the organisation folders. Total experience is worked out on the server;
  the page revalidates daily.
*/
export function Experience() {
  const total = calculateTotalExperience(workExperience);
  const sets: FolderSet[] = [
    {
      name: 'work',
      years: workExperience.map((entry) => startYear(entry.period)),
    },
    {
      name: 'organization',
      years: organizationExperience.map((entry) => startYear(entry.period)),
    },
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
          eyebrow={<T en="Files" id="Berkas" />}
          title={<T en="Experience" id="Pengalaman" />}
          titleId="experience-title"
          lede={
            <T
              en={`One folder per role, newest first: ${workExperience.length} at work, ${organizationExperience.length} in organizations. Open a file for what I shipped there.`}
              id={`Satu folder untuk setiap peran, dari yang terbaru: ${workExperience.length} pekerjaan, ${organizationExperience.length} organisasi. Buka berkasnya untuk melihat apa yang saya kerjakan.`}
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

      {workExperience.map((entry, index) => (
        <Beat key={entry.id} id={`work-${index}`} className="fold-tr">
          <RoleSheet entry={entry} set="work" index={index} count={workExperience.length} />
        </Beat>
      ))}
      {organizationExperience.map((entry, index) => (
        <Beat key={entry.id} id={`organization-${index}`} className="fold-tr">
          <RoleSheet entry={entry} set="organization" index={index} count={organizationExperience.length} />
        </Beat>
      ))}
    </Chapter>
  );
}
