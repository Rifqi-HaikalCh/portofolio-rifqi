'use client';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { certificateCategories } from '../../data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';

export const Certificates: React.FC = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(certificateCategories[0]?.id ?? '');
  const active = certificateCategories.find((category) => category.id === activeId) ?? certificateCategories[0];

  return (
    <section id="certificates" data-studio="archive" className="py-12 md:py-16 border-b border-line bg-paper">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <AnimatedSectionTitle
          center={false}
          badge="Professional Growth"
          title={t('Certificates & Achievements', 'Sertifikat & Prestasi') as string}
          subtitle={t(
            'Click on each category to explore my professional certifications and achievements organized by type',
            'Klik pada setiap kategori untuk menjelajahi sertifikasi profesional dan pencapaian saya yang diorganisir berdasarkan jenis'
          ) as string}
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <ul data-eqbot="certificates-list" data-eqbot-at="above" className="rise-item border-t border-line">
              {certificateCategories.map((category, index) => {
                const selected = category.id === active?.id;
                return (
                  <li key={category.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setActiveId(category.id)}
                      aria-pressed={selected}
                      className={`w-full text-left py-4 flex items-baseline justify-between gap-4 ${
                        selected ? 'mark-current text-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span className="flex items-baseline gap-3 min-w-0">
                        <span className="font-jetbrains-mono text-[11px] tracking-[0.16em] text-accent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-base ${selected ? 'font-medium' : ''}`}>
                          {t(category.title, category.titleId)}
                        </span>
                      </span>
                      <span className="font-serif text-lg text-ink">{category.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-8 border-t border-line" aria-live="polite">
            {active?.certificates.map((cert) => (
              <article key={cert.id} className="rise-item py-6 border-b border-line">
                <h3 className="font-serif text-2xl font-medium text-ink leading-snug">
                  {t(cert.title, cert.titleId || cert.title)}
                </h3>
                <p className="mt-2 text-muted leading-relaxed max-w-2xl">
                  {t(cert.description, cert.descriptionId || cert.description)}
                </p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-ink border-b border-line hover:border-accent hover:text-accent"
                >
                  {t('View Certificate', 'Lihat Sertifikat')}
                  <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
