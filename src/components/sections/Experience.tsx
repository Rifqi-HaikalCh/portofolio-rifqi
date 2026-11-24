import Image from 'next/image';
import { workExperience, organizationExperience } from '../../data/portfolio';
import type { Experience as ExperienceEntry } from '../../types';
import { calculateTotalExperience } from '../../lib/experience-utils';
import { displayCase } from '../../lib/display-case';
import { SectionTitle } from '../ui/SectionTitle';
import { stackLogo } from '../../lib/additional-skills';
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

/** Initials for a company without a logo file (v3.12, the file's header mark). */
const monogram = (company: string) =>
  company
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const SETS = {
  work: { en: 'Work', idn: 'Kerja' },
  organization: { en: 'Organization', idn: 'Organisasi' },
} as const;

/* A photograph of the place, taped to the sheet (v3.6, owner request; from the v1 data). Logos sit on paper. */
function RolePhoto({ entry, src = entry.image, wide = false, className = '' }: { entry: ExperienceEntry; src?: string; wide?: boolean; className?: string }) {
  if (!src) return null;
  const logo = src.endsWith('.png');
  return (
    <span className={`role-photo ${className}`}>
      <span className="role-photo-image" style={wide ? { aspectRatio: '16 / 9' } : undefined}>
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 360px, 40vw"
          className={logo ? 'object-contain p-[12%]' : 'object-cover'}
        />
      </span>
    </span>
  );
}

/*
  The full entry, opened from the sheet in the standard paper dialog: what was
  shipped, then the tools with their logos under it (v3.9, owner: "tools under
  the description, not under the photo"); photographs on the side. v3.12: the
  company's logo moved to the far left of the dialog header (`mark`).
*/
function FileBody({ entry }: { entry: ExperienceEntry }) {
  const en = bullets(entry.description);
  const id = bullets(entry.descriptionId);
  const stack = entry.techStack ?? [];
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_14rem]">
      <div>
        {en.length > 0 && (
          <ul className="max-w-[68ch] space-y-2 text-[0.9375rem] leading-relaxed text-ink">
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
        {stack.length > 0 && (
          <>
            <h4 className="mt-8 mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
              <T en="Tools" id="Tools" />
            </h4>
            <ul aria-label="Stack" className="flex flex-wrap content-start gap-2">
              {stack.map((tech) => {
                const logo = stackLogo(tech);
                return (
                  <li key={tech} className="inline-flex items-center gap-2 border border-line bg-raised px-2.5 py-1.5 font-mono text-xs leading-none text-ink">
                    {logo && <Image src={logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />}
                    {tech}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      <div className="space-y-6">
        <RolePhoto entry={entry} className="w-full" />
        {(entry.photos ?? []).map((photo) => (
          <RolePhoto key={photo} entry={entry} src={photo} wide className="w-full -rotate-1" />
        ))}
      </div>
    </div>
  );
}

/* One role: what is on the sheet that comes out of its folder (§4.5 `03`). Short enough to pin; the rest is in the file. */
function RoleSheet({ entry, set, index, count }: { entry: ExperienceEntry; set: 'work' | 'organization'; index: number; count: number }) {
  const titleId = `experience-${set}-${index}-file`;
  return (
    <article aria-labelledby={`experience-${set}-${index}-role`} data-eqbot={set === 'work' && index === 0 ? 'experience-files' : undefined}>
      <RolePhoto entry={entry} className="float-right ml-5 w-28 sm:w-36" />
      <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">
        <span className="stamp">{startYear(entry.period)}</span>
        <span className="text-muted">
          <T en={SETS[set].en} id={SETS[set].idn} /> · {String(index + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}
        </span>
      </p>
      <h3 id={`experience-${set}-${index}-role`} className="mt-4 font-serif text-2xl font-medium leading-snug text-ink md:text-3xl">
        <T en={displayCase(entry.title)} id={displayCase(entry.titleId ?? entry.title)} />
      </h3>
      <p className="mt-1 text-ink">{displayCase(entry.company)}</p>
      <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
        {entry.period}
        {entry.location ? ` · ${entry.location}` : ''}
      </p>
      <p className="mt-4 clear-right text-[0.9375rem] leading-relaxed text-muted sm:clear-none">
        <T en={entry.shortDescription} id={entry.shortDescriptionId} />
      </p>
      <ExperienceFile
        titleId={titleId}
        eyebrow={
          <>
            <T en={SETS[set].en} id={SETS[set].idn} /> · {entry.period}
          </>
        }
        title={<T en={displayCase(entry.title)} id={displayCase(entry.titleId ?? entry.title)} />}
        mark={
          entry.logo ? (
            <Image src={entry.logo} alt="" width={80} height={80} />
          ) : (
            <span className="pd-mark-monogram">{monogram(entry.company)}</span>
          )
        }
        lede={
          <>
            {displayCase(entry.company)}
            {entry.location ? ` · ${entry.location}` : ''}
          </>
        }
        label={
          <>
            <T en="Open the file" id="Buka berkas" />
            <span className="sr-only">: {displayCase(entry.company)}</span>
          </>
        }
      >
        <FileBody entry={entry} />
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
          <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
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
