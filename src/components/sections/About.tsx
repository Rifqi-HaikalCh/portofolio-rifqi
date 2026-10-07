'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import { Download, GraduationCap, Briefcase, Trophy, Users, ChevronRight } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { BrandLockup } from '../shared/BrandLockup';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={18} />,
  briefcase: <Briefcase size={18} />,
  trophy: <Trophy size={18} />,
  users: <Users size={18} />,
};

export const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" data-studio="manuscript" className="py-12 md:py-16 border-b border-line">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <AnimatedSectionTitle
          center={false}
          badge={t('Get to Know Me', 'Mengenal Saya') as string}
          title={t('About Me', 'Tentang Saya') as string}
          subtitle={t(
            'Software engineer specialized in C#, ASP.NET, and SQL Server for enterprise web and data systems',
            'Software engineer yang berfokus pada C#, ASP.NET, dan SQL Server untuk sistem web dan data enterprise'
          ) as string}
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <figure data-eqbot="about-photo" data-eqbot-at="above" className="rise-item lg:col-span-5 lg:sticky lg:top-24">
            <div className="border border-line bg-raised">
              <div className="relative aspect-square overflow-hidden bg-raised">
                <Image
                  src="/assets/me.png"
                  alt="Rifqi Haikal"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="p-4 flex items-center gap-4">
                <BrandLockup variant="badge" label="" className="h-20 w-20 shrink-0" />
                <div className="min-w-0">
                  <p className="font-serif text-xl text-ink">Rifqi Haikal</p>
                  <p className="text-sm text-muted">{t('Software Developer', 'Developer Perangkat Lunak')}</p>
                  <p className="mt-2 inline-flex items-center text-[11px] tracking-[0.14em] uppercase text-accent">
                    <span className="presence" aria-hidden="true" />
                    {t('Available for Work', 'Tersedia untuk Bekerja')}
                  </p>
                </div>
              </figcaption>
            </div>
          </figure>

          <div className="rise-item lg:col-span-7">
            <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink mb-5">
              {t("Hi, I'm", "Halo, Saya")}{' '}
              <span className="italic">Rifqi Haikal</span>
            </h3>
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {language === 'en'
                ? 'Software Engineer with 3 years of hands-on development experience. My core work is C#, ASP.NET MVC, and .NET Core for enterprise web and data systems. I also bring additional full-stack experience with React, Angular, and Spring Boot. I have built backend services, REST APIs, monitoring dashboards, and secure applications with SQL Server, Entity Framework, RBAC, SSO, and MFA, delivered for telecommunications, oil and gas, research, and financial services.'
                : 'Software Engineer dengan 3 tahun pengalaman pengembangan. Pekerjaan inti saya adalah C#, ASP.NET MVC, dan .NET Core untuk sistem web dan data enterprise. Saya juga memiliki pengalaman full-stack tambahan dengan React, Angular, dan Spring Boot. Saya membangun layanan backend, REST API, dashboard pemantauan, dan aplikasi yang aman dengan SQL Server, Entity Framework, RBAC, SSO, dan MFA, untuk telekomunikasi, minyak dan gas, riset, serta jasa keuangan.'}
            </p>

            <div className="mt-10">
              <p className="font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent mb-4">
                {t('At a Glance', 'Sekilas')}
              </p>
              <dl className="grid sm:grid-cols-2 auto-rows-fr border-t border-l border-line">
                {aboutHighlights.map((highlight) => (
                  <div key={highlight.title} className="read-row flex flex-col p-5 border-b border-r border-line">
                    <dt className="flex items-center gap-2.5">
                      <span className="shrink-0 text-accent">{iconMap[highlight.icon]}</span>
                      <span className="font-jetbrains-mono text-[11px] tracking-[0.14em] uppercase text-ink">
                        {t(highlight.title, highlight.titleId)}
                      </span>
                    </dt>
                    <dd className="mt-3 text-[15px] leading-relaxed text-muted">
                      {t(highlight.description, highlight.descriptionId)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/assets/CV Rifqi Haikal Chairiansyah.pdf" download className="btn-primary-custom">
                <Download size={16} />
                {t('Download CV', 'Unduh CV')}
              </a>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline-custom"
              >
                {t('Get in Touch', 'Hubungi Saya')}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
