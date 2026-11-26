import { ArrowUpRight, Plus } from 'lucide-react';
import { certificateCategories } from '../../data/portfolio';
import { displayCase } from '../../lib/display-case';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';
import { ArchiveStation, BINDER_FILLS, binderSpine } from '../scenes/archive/ArchiveStation';
import { ARCHIVE_CHAPTER } from '../scenes/archive/beats';
import { Beat, Chapter } from '../scenes/chapter/Chapter';
import type { CSSProperties } from 'react';
import type { CertificateCategory } from '../../types';

/*
  05 Certificates — the Archive Shelf chapter (DesignRules.md §4.5 `05`): the
  title rises as the binders settle, then the folios rise in flow. Each folio is tagged `data-binder` so its binder pulls out.
  Each folio is a native <details>: keyboard and screen readers get the
  expanded state for free and the section ships no JS. The first folio is open.
  v3.11 (owner): in the theatre the folios give way to four books, one per
  category (`CertBook`): each comes off the shelf, opens, and lists its
  certificates as links across its two pages.
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

      {certificateCategories.map((category, index) => (
        <Beat key={category.id} id={`book-${index}`} className="book-sheet stage-sheet">
          <CertBook category={category} index={index} total={certificateCategories.length} />
        </Beat>
      ))}

      <Beat id="folios" flow className="cert-folios">
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
                        <p className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-muted">
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

/*
  One certificate book (v3.11). The cover turns on the spine: its front is the
  binding, its back is the left page. Closed, only the right half shows; it is
  centred by the flight (scene.css). The certificates split across both pages.
  `--from-x/y`: from the book's place on the stage to its binder on the shelf
  (world → screen, chapter.css §9.1; the archive frame starts at world 0).
*/
function CertBook({ category, index, total }: { category: CertificateCategory; index: number; total: number }) {
  const spine = binderSpine(index);
  const half = Math.ceil(category.certificates.length / 2);
  const pages = [category.certificates.slice(0, half), category.certificates.slice(half)];
  const vars = {
    '--from-x': `calc(${spine.cx} * var(--s) - var(--cxs))`,
    '--from-y': `calc(${spine.cy} * var(--s) - var(--cys) - 1.75rem)`,
    '--book-ink': BINDER_FILLS[index % BINDER_FILLS.length],
  } as CSSProperties;
  const no = (n: number) => String(n).padStart(2, '0');
  const last = index === total - 1;

  const list = (certs: CertificateCategory['certificates'], from: number) => (
    <ol className="book-list" start={from + 1}>
      {certs.map((cert, i) => (
        <li key={cert.id}>
          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="book-entry">
            <span className="book-num" aria-hidden="true">
              {no(from + i + 1)}
            </span>
            <span className="min-w-0">
              <span className="book-entry-title">
                <T en={cert.title} id={cert.titleId} />
              </span>
              <span className="book-entry-desc">
                <T en={cert.description} id={cert.descriptionId} />
              </span>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" className="book-entry-go" />
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="book" style={vars}>
      <span className="book-spine" aria-hidden="true" />
      <div className="book-cover">
        <div className="book-face book-front" aria-hidden="true">
          <span className="book-plate">
            <span className="book-plate-no">{no(index + 1)}</span>
            <span className="book-plate-title">
              <T en={displayCase(category.title)} id={displayCase(category.titleId)} />
            </span>
            <span className="book-plate-count">{no(category.certificates.length)}</span>
          </span>
        </div>
        <div className="book-face book-page book-left">
          <p className="book-kicker">
            <T en={`Book ${no(index + 1)} of ${no(total)}`} id={`Buku ${no(index + 1)} dari ${no(total)}`} />
          </p>
          <h3 className="book-title">
            <T en={displayCase(category.title)} id={displayCase(category.titleId)} />
          </h3>
          <p className="book-count">
            <T en={`${category.certificates.length} certificates · each opens the original`} id={`${category.certificates.length} sertifikat · masing-masing membuka dokumen aslinya`} />
          </p>
          {list(pages[0], 0)}
        </div>
      </div>
      <div className="book-page book-right">
        {list(pages[1], half)}
        <p className="book-foot" aria-hidden="true">
          {last ? <T en="Scroll on: the mail tray" id="Gulir terus: kotak surat" /> : <T en="Scroll on: the next book" id="Gulir terus: buku berikutnya" />}
        </p>
      </div>
    </div>
  );
}
