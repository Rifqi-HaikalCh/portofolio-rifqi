'use client';

import { useCallback, useDeferredValue, useId, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PaperDialog } from '../ui/PaperDialog';
import { T } from '../ui/T';
import { CaseStudy } from './CaseStudy';
import { kindCopy, kindLabel, type ShelfKind, type ShelfProject } from './shelf-types';

export type { ShelfProject } from './shelf-types';

/* A taped print of the project: the whole card opens the case study. */
function ProjectCard({ project, onOpen, tilt }: { project: ShelfProject; onOpen: () => void; tilt: string }) {
  const label = kindLabel(project);
  return (
    <article className="paper-card flex h-full flex-col border border-line">
      <div className="relative aspect-[16/10] border-b border-line bg-recess">
        <span className="tape z-scene-front" style={{ '--tape-rotate': tilt } as CSSProperties} aria-hidden="true" />
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          <T en={label.en} id={label.id} />
        </p>
        <h4 className="mt-2 font-serif text-xl font-medium leading-snug text-ink">
          <button type="button" onClick={onOpen} aria-haspopup="dialog" className="stretched text-left">
            {project.title}
          </button>
        </h4>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          <T en={project.en} id={project.idn} />
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.slice(0, 3).map((tech) => (
            <li key={tech.name} className="inline-flex items-center border border-line px-2 py-1 font-mono text-xs leading-none text-ink">
              {tech.name}
            </li>
          ))}
          {project.stack.length > 3 && (
            <li className="inline-flex items-center px-1 font-mono text-xs leading-none text-muted">+{project.stack.length - 3}</li>
          )}
        </ul>
        <p className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm text-accent" aria-hidden="true">
          <T en="Read the case study" id="Baca studi kasus" />
          <ArrowRight size={14} />
        </p>
      </div>
    </article>
  );
}

const tilts = ['-2deg', '1.5deg', '-1deg', '2deg'];

/* Full-screen drawer with every project: filter, search, open a case study. */
function Archive({ projects, onClose, onOpen }: { projects: ShelfProject[]; onClose: () => void; onOpen: (p: ShelfProject) => void }) {
  const { language, say } = useLanguage();
  const [kind, setKind] = useState<ShelfKind | 'all'>('all');
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const searchId = useId();

  const shown = projects.filter((project) => {
    if (kind !== 'all' && project.kind !== kind) return false;
    if (!deferred) return true;
    const haystack = [project.title, language === 'en' ? project.en : project.idn, ...project.stack.map((s) => s.name)].join(' ');
    return haystack.toLowerCase().includes(deferred);
  });
  const count = (value: ShelfKind | 'all') => (value === 'all' ? projects.length : projects.filter((p) => p.kind === value).length);

  return (
    <PaperDialog open onClose={onClose} labelledBy="archive-title" drawer>
      <div data-studio="sheet" className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <form method="dialog">
            <button type="submit" className="btn-outline-custom">
              <ArrowLeft size={16} aria-hidden="true" />
              <T en="Back to desk" id="Kembali ke meja" />
            </button>
          </form>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span className="stamp">04</span> — <T en="Archive drawer" id="Laci arsip" />
          </p>
        </div>

        <h3 id="archive-title" className="mt-8 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
          <T en="Every project" id="Semua proyek" />
        </h3>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <fieldset>
            <legend className="sr-only">{say('Filter by kind', 'Saring menurut jenis')}</legend>
            <div className="flex flex-wrap gap-2">
              {(['all', 'individual', 'group', 'design'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={kind === value}
                  onClick={() => setKind(value)}
                  className={`inline-flex min-h-11 items-center gap-2 border px-4 text-sm ${
                    kind === value ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  {language === 'en' ? kindCopy[value].en : kindCopy[value].id}
                  <span className="font-mono text-[11px] opacity-70">{String(count(value)).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="w-full md:w-80">
            <label htmlFor={searchId} className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <T en="Search by name or tool" id="Cari nama atau alat" />
            </label>
            <div className="flex min-h-11 items-center gap-2 border border-line bg-raised px-3 focus-within:border-accent">
              <Search size={16} className="text-muted" aria-hidden="true" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Vue, Figma, Spring…"
                className="w-full bg-transparent py-2 text-ink outline-none placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-muted" role="status" aria-live="polite">
          {say(`${shown.length} of ${projects.length} projects`, `${shown.length} dari ${projects.length} proyek`)}
        </p>

        {shown.length > 0 ? (
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project, i) => (
              <li key={project.id}>
                <ProjectCard project={project} onOpen={() => onOpen(project)} tilt={tilts[i % tilts.length]} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 border border-dashed border-line p-10 text-center">
            <p className="font-serif text-2xl text-ink">
              <T en="This drawer is empty." id="Laci ini kosong." />
            </p>
            <p className="mt-2 text-muted">
              <T en="Try another tool name, or clear the filter." id="Coba nama alat lain, atau hapus saringan." />
            </p>
          </div>
        )}
      </div>
    </PaperDialog>
  );
}

/*
  Selected work on the desk plus the archive drawer (DesignRules.md §4 `04`).
  Data arrives as props from the server section, so this leaf never imports
  portfolio.ts.
*/
export function ProjectShelf({ projects, featured }: { projects: ShelfProject[]; featured: string[] }) {
  const [open, setOpen] = useState<ShelfProject | null>(null);
  const [archive, setArchive] = useState(false);
  const close = useCallback(() => setOpen(null), []);
  const closeArchive = useCallback(() => setArchive(false), []);
  const picks = featured.map((id) => projects.find((p) => p.id === id)).filter((p): p is ShelfProject => Boolean(p));

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((project, i) => (
          <li key={project.id}>
            <ProjectCard project={project} onOpen={() => setOpen(project)} tilt={tilts[i % tilts.length]} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => setArchive(true)} aria-haspopup="dialog" className="btn-primary-custom">
          <T en={`Open the archive (${projects.length})`} id={`Buka arsip (${projects.length})`} />
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className="text-sm text-muted">
          <T en="Every project, with filters and search." id="Semua proyek, dengan saringan dan pencarian." />
        </p>
      </div>

      {archive && <Archive projects={projects} onClose={closeArchive} onOpen={setOpen} />}
      {open && <CaseStudy key={open.id} project={open} onClose={close} />}
    </>
  );
}
