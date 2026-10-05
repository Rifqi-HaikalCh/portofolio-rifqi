'use client';
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { certificateCategories } from '../../data/portfolio';
import { ArrowUpRight } from 'lucide-react';

export const MobileCertificates: React.FC = () => {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState(certificateCategories[0]?.id ?? '');
  const active = certificateCategories.find((category) => category.id === activeId) ?? certificateCategories[0];

  const label = (en: string, id: string) => (language === 'en' ? en : id);

  return (
    <section id="certificates" data-studio="archive" className="py-16 px-5 border-b border-line bg-paper">
      <header className="rise-item mb-12">
        <p className="font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent mb-3">
          {label('Professional Growth', 'Pertumbuhan Profesional')}
        </p>
        <h2 className="font-serif text-4xl font-medium tracking-tight text-ink">
          {label('Certificates', 'Sertifikat')}
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          {label(
            'Tap on each category to explore my certifications',
            'Ketuk setiap kategori untuk menjelajahi sertifikat saya'
          )}
        </p>
      </header>

      <ul data-eqbot="certificates-list" data-eqbot-at="above" className="rise-item border-t border-line mb-8">
        {certificateCategories.map((category, index) => {
          const selected = category.id === active?.id;
          return (
            <li key={category.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setActiveId(category.id)}
                aria-pressed={selected}
                className={`w-full text-left py-3.5 flex items-baseline justify-between gap-3 ${
                  selected ? 'mark-current text-ink' : 'text-muted'
                }`}
              >
                <span className="flex items-baseline gap-3 min-w-0">
                  <span className="font-jetbrains-mono text-[11px] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={selected ? 'font-medium' : ''}>
                    {label(category.title, category.titleId)}
                  </span>
                </span>
                <span className="font-serif text-lg">{category.count}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-line" aria-live="polite">
        {active?.certificates.map((cert) => (
          <article key={cert.id} className="rise-item py-5 border-b border-line">
            <h3 className="font-serif text-xl font-medium text-ink leading-snug">
              {label(cert.title, cert.titleId || cert.title)}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {label(cert.description, cert.descriptionId || cert.description)}
            </p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-ink border-b border-line hover:border-accent hover:text-accent"
            >
              {label('View Certificate', 'Lihat Sertifikat')}
              <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
