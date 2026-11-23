import { ArrowUpRight, Plus } from 'lucide-react';
import { certificateCategories } from '../../data/portfolio';
import { displayCase } from '../../lib/display-case';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';
import { ArchiveStation } from '../scenes/archive/ArchiveStation';
import { ARCHIVE_CHAPTER } from '../scenes/archive/beats';
import { Beat, Chapter } from '../scenes/chapter/Chapter';

/*
  05 Certificates — the Archive Shelf chapter (DesignRules.md §4.5 `05`): the
  title rises as the binders settle, then the folios rise in flow. Each folio is tagged `data-binder` so its binder pulls out.
  Each folio is a native <details>: keyboard and screen readers get the
  expanded state for free and the section ships no JS. The first folio is open.
*/
export function Certificates() {
  const total = certificateCategories.reduce((sum, category) => sum + category.certificates.length, 0);

  return (
    <Chapter
      spec={ARCHIVE_CHAPTER}
      labelledBy="certificates-title"
      studio="archive"
      next={{ id: 'contact', en: 'Contact', idn: 'Kontak' }}
      stage={
        <ArchiveStation
          wide
          binders={certificateCategories.map((category) => ({ label: category.id.toUpperCase(), count: category.certificates.length }))}
        />
      }
    >
      <Beat id="title" className="fold-tr [&>header]:mb-0">
        <SectionTitle
          index="05"
          eyebrow={<T en="Archive shelf" id="Rak arsip" />}
          title={<T en="Certificates" id="Sertifikat" />}
          titleId="certificates-title"
          lede={
            <T
              en={`${total} certificates from courses, events, organizations and internships. Each one opens the original.`}
              id={`${total} sertifikat dari kursus, kegiatan, organisasi, dan magang. Masing-masing membuka dokumen aslinya.`}
            />
          }
        />
      </Beat>

      <Beat id="folios" flow>
        <ul data-eqbot="certificates-list" data-eqbot-at="above" className="grid gap-3">
          {certificateCategories.map((category, index) => (
            <li key={category.id}>
              <details className="folio paper-sheet border border-line" open={index === 0} data-binder={index}>
                <summary className="flex min-h-11 items-center gap-4 px-5 py-4 sm:px-6">
                  <span className="stamp text-xs" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-serif text-xl text-ink sm:text-2xl">
                    <T en={displayCase(category.title)} id={displayCase(category.titleId)} />
                  </span>
                  <span className="border border-line px-2 py-1 font-mono text-xs text-muted">
                    {String(category.certificates.length).padStart(2, '0')}
                  </span>
                  <span className="folio-mark inline-flex h-8 w-8 items-center justify-center border border-line text-ink" aria-hidden="true">
                    <Plus size={14} />
                  </span>
                </summary>
                <ul className="folio-body border-t border-line">
                  {category.certificates.map((cert) => (
                    <li
                      key={cert.id}
                      className="grid gap-3 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-6"
                    >
                      <div className="min-w-0">
                        <h3 className="font-medium text-ink">
                          <T en={cert.title} id={cert.titleId} />
                        </h3>
                        <p className="mt-1 max-w-[68ch] text-[15px] leading-relaxed text-muted">
                          <T en={cert.description} id={cert.descriptionId} />
                        </p>
                      </div>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-accent hover:text-ink sm:self-center"
                      >
                        <T en="Open" id="Buka" />
                        <span className="sr-only">
                          <T en={cert.title} id={cert.titleId} />
                        </span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </Beat>
    </Chapter>
  );
}
