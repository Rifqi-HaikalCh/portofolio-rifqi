'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PaperDialog } from '../ui/PaperDialog';
import { T } from '../ui/T';
import { kindLabel, type ShelfProject } from './shelf-types';

/* Case study: Overview → Stack → Slides → Links, each only when it has content. */
export function CaseStudy({ project, onClose }: { project: ShelfProject; onClose: () => void }) {
  const { say } = useLanguage();
  const [frame, setFrame] = useState(0);
  const frames = project.slides.length ? project.slides : [project.image];
  const label = kindLabel(project);
  const titleId = `case-${project.id}`;
  const links = [
    project.links.prototype && { href: project.links.prototype, en: 'Figma prototype', id: 'Prototipe Figma' },
    project.links.demo && { href: project.links.demo, en: 'Live preview', id: 'Pratinjau langsung' },
    project.links.github && { href: project.links.github, en: 'Source code', id: 'Kode sumber' },
    project.links.needToKnow && { href: project.links.needToKnow, en: 'Documentation', id: 'Dokumentasi' },
  ].filter((link): link is { href: string; en: string; id: string } => Boolean(link));

  return (
    <PaperDialog open onClose={onClose} labelledBy={titleId} className="case-dialog">
      <div className="fold-tr max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <header className="flex items-start justify-between gap-6 border-b border-line p-6 md:p-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              <T en={label.en} id={label.id} />
            </p>
            <h3 id={titleId} className="mt-2 font-serif text-3xl font-medium leading-tight text-ink md:text-4xl">
              {project.title}
            </h3>
          </div>
          <form method="dialog">
            <button
              type="submit"
              aria-label={say('Close case study', 'Tutup studi kasus')}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink hover:bg-ink hover:text-paper"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </form>
        </header>

        <div className="grid gap-10 p-6 md:p-8">
          <div role="group" aria-labelledby={`${titleId}-overview`}>
            <h4 id={`${titleId}-overview`} className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <T en="Overview" id="Ringkasan" />
            </h4>
            <p className="max-w-[68ch] leading-relaxed text-ink">
              <T en={project.en} id={project.idn} />
            </p>
          </div>

          {project.stack.length > 0 && (
            <div role="group" aria-labelledby={`${titleId}-stack`}>
              <h4 id={`${titleId}-stack`} className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Stack
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech.name} className="inline-flex items-center gap-2 border border-line px-2 py-1 font-mono text-xs text-ink">
                    {tech.logo && <Image src={tech.logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />}
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div role="group" aria-labelledby={`${titleId}-slides`}>
            <h4 id={`${titleId}-slides`} className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <T en="Screens" id="Layar" />
            </h4>
            <div className="relative aspect-[16/10] border border-line bg-recess">
              <Image
                key={frames[frame]}
                src={frames[frame]}
                alt={say(`${project.title}, screen ${frame + 1} of ${frames.length}`, `${project.title}, layar ${frame + 1} dari ${frames.length}`)}
                fill
                sizes="(min-width: 1024px) 960px, 94vw"
                className="object-contain"
              />
            </div>
            {frames.length > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setFrame((value) => Math.max(0, value - 1))}
                  disabled={frame === 0}
                  aria-label={say('Previous screen', 'Layar sebelumnya')}
                  className="flex h-11 w-11 items-center justify-center border border-line text-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <p className="font-mono text-xs text-muted" aria-live="polite">
                  {String(frame + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
                </p>
                <button
                  type="button"
                  onClick={() => setFrame((value) => Math.min(frames.length - 1, value + 1))}
                  disabled={frame === frames.length - 1}
                  aria-label={say('Next screen', 'Layar berikutnya')}
                  className="flex h-11 w-11 items-center justify-center border border-line text-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {links.length > 0 && (
            <div role="group" aria-labelledby={`${titleId}-links`}>
              <h4 id={`${titleId}-links`} className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                <T en="Links" id="Tautan" />
              </h4>
              <ul className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="btn-outline-custom">
                      <T en={link.en} id={link.id} />
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PaperDialog>
  );
}
