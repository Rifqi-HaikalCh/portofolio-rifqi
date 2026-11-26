'use client';

import { useCallback, useDeferredValue, useEffect, useId, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PaperDialog } from '../ui/PaperDialog';
import { T } from '../ui/T';
import { CaseStudy } from './CaseStudy';
import { ProjectShadowBox } from '../scenes/ProjectShadowBox';
import { kindCopy, kindLabel, type ShelfKind, type ShelfProject } from './shelf-types';

export type { ShelfProject } from './shelf-types';

/** Asks the shelf (the one ProjectShelf on the page) to open a case study; the cards on the wire are separate beats. */
const OPEN = 'shelf:open';
type OpenDetail = { id: string; from: HTMLElement };

/*
  A taped print of the project: the whole card opens the case study. `level`: h3 on the gallery
  wire (under the chapter's h2), h4 in the archive (under its h3). Without `onOpen` the card asks
  the shelf through a window event, so it can be rendered inside any beat.
*/
export function ProjectCard({
  project,
  onOpen,
  tilt,
  level = 3,
}: {
  project: ShelfProject;
  onOpen?: (from: HTMLElement) => void;
  tilt: string;
  level?: 3 | 4;
}) {
  const open = (from: HTMLElement) =>
    onOpen ? onOpen(from) : window.dispatchEvent(new CustomEvent<OpenDetail>(OPEN, { detail: { id: project.id, from } }));
  const label = kindLabel(project);
  const Title = level === 3 ? 'h3' : 'h4';
  return (
    <article className="paper-card flex h-full flex-col border border-line">
      <ProjectShadowBox
        image={project.image}
        art={project.art}
        mobile={project.mobile}
        tilt={tilt}
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 60vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
          <T en={label.en} id={label.id} />
        </p>
        <Title className="mt-2 font-serif text-xl font-medium leading-snug text-ink">
          <button type="button" onClick={(event) => open(event.currentTarget)} aria-haspopup="dialog" className="stretched text-left">
            {project.title}
          </button>
        </Title>
        <p className={`mt-2 text-sm leading-relaxed text-muted ${level === 3 ? 'line-clamp-2' : 'line-clamp-3'}`}>
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

export const tilts = ['-2deg', '1.5deg', '-1deg', '2deg'];

/* Full-screen drawer with every project: filter, search, open a case study. */
function Archive({ projects, onClose, onOpen }: { projects: ShelfProject[]; onClose: () => void; onOpen: (p: ShelfProject, from: HTMLElement) => void }) {
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
    <PaperDialog
      open
      onClose={onClose}
      labelledBy="archive-title"
      size="drawer"
      eyebrow={
        <>
          <span className="stamp">04</span> — <T en="Archive drawer" id="Laci arsip" />
        </>
      }
      title={<T en="Every project" id="Semua proyek" />}
      closeLabel={<T en="Back to desk" id="Kembali ke meja" />}
    >
      <div data-studio="sheet">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
                  <span className="font-mono text-[0.6875rem] opacity-70">{String(count(value)).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="w-full md:w-80">
            <label htmlFor={searchId} className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
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
                <ProjectCard project={project} onOpen={(from) => onOpen(project, from)} tilt={tilts[i % tilts.length]} level={4} />
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
  The shelf behind the gallery wire (DesignRules.md §4.5 `04b`, v3.6): the archive
  drawer button, and the one place the case study and the archive open. The cards
  on the wire ask for a case study with the `shelf:open` event. Data arrives as
  props from the server section, so this leaf never imports portfolio.ts.
*/
export function ProjectShelf({ projects }: { projects: ShelfProject[] }) {
  const [open, setOpen] = useState<ShelfProject | null>(null);
  const [archive, setArchive] = useState(false);
  const close = useCallback(() => setOpen(null), []);
  const closeArchive = useCallback(() => setArchive(false), []);
  /*
    Frame → sheet morph (§10.2): the clicked frame and the case-study sheet share the
    view-transition name `case-sheet`, so the sheet grows out of the frame. The frame
    gives up the name inside the update, so the two never hold it at once.
  */
  const openCase = useCallback((project: ShelfProject, from: HTMLElement) => {
    const frame = from.closest('article')?.querySelector<HTMLElement>('.psb');
    if (!frame || !('startViewTransition' in document) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(project);
      return;
    }
    const root = document.documentElement;
    frame.style.viewTransitionName = 'case-sheet';
    root.classList.add('is-morphing');
    const morph = document.startViewTransition(() => {
      frame.style.viewTransitionName = '';
      flushSync(() => setOpen(project));
    });
    morph.finished.finally(() => root.classList.remove('is-morphing'));
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const { id, from } = (event as CustomEvent<OpenDetail>).detail;
      const project = projects.find((p) => p.id === id);
      if (project) openCase(project, from);
    };
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, [projects, openCase]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => setArchive(true)} aria-haspopup="dialog" className="btn-primary-custom">
          <T en={`Open the archive (${projects.length})`} id={`Buka arsip (${projects.length})`} />
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className="text-sm text-ink">
          <T en="Every project, with filters and search." id="Semua proyek, dengan saringan dan pencarian." />
        </p>
      </div>

      {archive && <Archive projects={projects} onClose={closeArchive} onOpen={openCase} />}
      {open && <CaseStudy key={open.id} project={open} onClose={close} />}
    </>
  );
}
