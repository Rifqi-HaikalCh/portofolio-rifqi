'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Portal } from './Portal';
import { stackLogo } from '../../lib/additional-skills';
import type { Experience } from '../../types';

export interface ProjectDetailLink {
  href: string;
  label: string;
}

export interface DetailFact {
  label: string;
  value: string;
}

interface ProjectDetailDialogProps {
  title: string;
  category?: string;
  subtitle?: string;
  detail?: string;
  description: string;
  images: string[];
  facts?: DetailFact[];
  points?: string[];
  pointsLabel?: string;
  tools?: string[];
  links: ProjectDetailLink[];
  overviewLabel: string;
  toolsLabel: string;
  closeLabel: string;
  metaUnderImage?: boolean;
  onClose: () => void;
}

export function projectDetailLinks(
  language: 'en' | 'id',
  links: { demo?: string; prototype?: string; figma?: string; github?: string; needToKnow?: string }
): ProjectDetailLink[] {
  const label = (en: string, id: string) => (language === 'en' ? en : id);
  const items: ProjectDetailLink[] = [];
  const figma = links.figma || links.prototype;
  if (figma) items.push({ href: figma, label: 'Figma' });
  if (links.demo) items.push({ href: links.demo, label: label('Preview', 'Pratinjau') });
  if (links.github) items.push({ href: links.github, label: label('Source', 'Kode') });
  if (links.needToKnow) items.push({ href: links.needToKnow, label: label('Documentation', 'Dokumentasi') });
  return items;
}

export function ProjectDetailDialog({
  title,
  category,
  subtitle,
  detail,
  description,
  images,
  facts = [],
  points = [],
  pointsLabel,
  tools = [],
  links,
  overviewLabel,
  toolsLabel,
  closeLabel,
  metaUnderImage = false,
  onClose,
}: ProjectDetailDialogProps) {
  const frames = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const current = frames[Math.min(index, Math.max(frames.length - 1, 0))];
  const metaUnderMedia = metaUnderImage && Boolean(current);
  const onCloseRef = useRef(onClose);
  const dialogRef = useRef<HTMLDivElement>(null);
  onCloseRef.current = onClose;

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
      if (event.key === 'ArrowRight') setIndex((value) => Math.min(frames.length - 1, value + 1));
      if (event.key === 'ArrowLeft') setIndex((value) => Math.max(0, value - 1));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [frames.length]);

  const factsBlock = facts.length > 0 ? (
    <dl className={`grid grid-cols-2 border-t border-l border-line ${metaUnderMedia ? '' : 'mb-8'}`}>
      {facts.map((fact) => (
        <div key={fact.label} className="p-4 border-b border-r border-line">
          <dt className="font-jetbrains-mono text-[11px] tracking-[0.14em] uppercase text-accent">
            {fact.label}
          </dt>
          <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
        </div>
      ))}
    </dl>
  ) : null;

  const toolsBlock = tools.length > 0 ? (
    <>
      <h4 className={`${metaUnderMedia ? '' : 'mt-8'} font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-3`}>
        {toolsLabel}
      </h4>
      <ul className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const logo = stackLogo(tool);
          return (
            <li key={tool} className="inline-flex items-center gap-2 border border-line px-2 py-1 text-sm text-ink">
              {logo && (
                <Image src={logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
              )}
              {tool}
            </li>
          );
        })}
      </ul>
    </>
  ) : null;

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
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        className="bg-raised text-ink border border-line w-full max-w-5xl m-auto outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6 p-6 md:p-8 border-b border-line">
          <div>
            {category && (
              <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-2">
                {category}
              </p>
            )}
            <h3 id="project-detail-title" className="font-serif text-3xl md:text-4xl font-medium leading-tight">
              {title}
            </h3>
            {subtitle && <p className="mt-2 text-ink">{subtitle}</p>}
            {detail && <p className="mt-1 text-sm text-muted">{detail}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="w-10 h-10 shrink-0 border border-line flex items-center justify-center hover:border-ink hover:bg-ink hover:text-paper"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-12">
          {current && (
            <div className="md:col-span-7 p-6 md:p-8 border-b md:border-b-0 md:border-r border-line">
              <div key={index} className="frame-swap relative h-[42vh] min-h-[220px] border border-line bg-paper">
                <Image
                  src={current}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 520px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
              {frames.length > 1 && (
                <>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setIndex((value) => Math.max(0, value - 1))}
                      disabled={index === 0}
                      aria-label="Previous"
                      className="w-10 h-10 border border-line flex items-center justify-center hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <p className="font-jetbrains-mono text-[11px] tracking-[0.14em] text-muted">
                      {String(index + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIndex((value) => Math.min(frames.length - 1, value + 1))}
                      disabled={index === frames.length - 1}
                      aria-label="Next"
                      className="w-10 h-10 border border-line flex items-center justify-center hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <ul className="mt-3 flex gap-2 overflow-x-auto">
                    {frames.map((src, frameIndex) => (
                      <li key={`${src}-${frameIndex}`}>
                        <button
                          type="button"
                          onClick={() => setIndex(frameIndex)}
                          aria-label={`${frameIndex + 1}`}
                          className={`relative block w-16 h-12 border ${frameIndex === index ? 'border-accent' : 'border-line hover:border-ink'}`}
                        >
                          <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {metaUnderMedia && (
                <div className="mt-8 space-y-8">
                  {factsBlock}
                  {toolsBlock}
                </div>
              )}
            </div>
          )}

          <div className={`${current ? 'md:col-span-5' : 'md:col-span-12'} p-6 md:p-8`}>
            {!metaUnderMedia && factsBlock}

            <h4 className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-3">
              {overviewLabel}
            </h4>
            <p className="text-muted leading-relaxed">{description}</p>

            {points.length > 0 && (
              <>
                <h4 className="mt-8 font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-3">
                  {pointsLabel}
                </h4>
                <ul className="space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-ink leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {!metaUnderMedia && toolsBlock}

            {links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {links.map((link, linkIndex) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkIndex === 0 ? 'btn-primary-custom' : 'btn-outline-custom'}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Portal>
  );
}

const contributionLines = (description: string) =>
  description.split('\n').map((line) => line.replace(/^[•\-\s]+/, '').trim()).filter(Boolean);

export function ExperienceDetailDialog({
  exp,
  language,
  onClose,
}: {
  exp: Experience;
  language: 'en' | 'id';
  onClose: () => void;
}) {
  const label = (en: string, id: string) => (language === 'en' ? en : id);
  const overview = language === 'en' ? exp.shortDescription : (exp.shortDescriptionId || exp.shortDescription);
  const contributions = language === 'en' ? exp.description : (exp.descriptionId || exp.description);

  return (
    <ProjectDetailDialog
      title={exp.company}
      subtitle={label(exp.title, exp.titleId || exp.title)}
      category={exp.companyType ? label(exp.companyType, exp.companyTypeId || exp.companyType) : undefined}
      detail={exp.positionDetail ? label(exp.positionDetail, exp.positionDetailId || exp.positionDetail) : undefined}
      description={overview}
      images={exp.image ? [exp.image] : []}
      facts={[
        { label: label('Period', 'Periode'), value: exp.period },
        { label: label('Location', 'Lokasi'), value: exp.location || '—' },
      ]}
      points={contributionLines(contributions)}
      pointsLabel={label('Detailed Contributions', 'Kontribusi')}
      tools={exp.techStack}
      metaUnderImage={exp.type === 'work'}
      links={[]}
      overviewLabel={label('Overview', 'Ringkasan')}
      toolsLabel={label('Stack', 'Teknologi')}
      closeLabel={label('Close', 'Tutup')}
      onClose={onClose}
    />
  );
}
