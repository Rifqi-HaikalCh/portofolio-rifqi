'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights, workExperience } from '../../data/portfolio';
import { calculateTotalExperience } from '../../lib/experience-utils';
import { Download, GraduationCap, Briefcase, Trophy, Users, ChevronRight } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={18} />,
  briefcase: <Briefcase size={18} />,
  trophy: <Trophy size={18} />,
  users: <Users size={18} />,
};

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const totalExp = useMemo(() => calculateTotalExperience(workExperience), []);

  const stats = [
    {
      number: '30+',
      label: t('Projects Completed', 'Proyek Diselesaikan'),
      description: t('From concept to technology solutions', 'Dari konsep hingga solusi teknologi'),
    },
    {
      number: `${totalExp.years}+`,
      label: t('Years Experience', 'Tahun Pengalaman'),
      description: t('Development and Design', 'Pengembangan dan Desain'),
    },
    {
      number: '10+',
      label: t('Technologies Mastered', 'Teknologi Dikuasai'),
      description: t('Modern tech stack expertise', 'Keahlian teknologi modern'),
    },
  ];

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
          <figure data-eqbot="about-photo" data-eqbot-at="above" className="rise-item lg:col-span-5">
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
              <figcaption className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-xl text-ink">Rifqi Haikal</p>
                  <p className="text-sm text-muted">{t('Software Developer', 'Developer Perangkat Lunak')}</p>
                </div>
                <span className="inline-flex items-center text-[11px] tracking-[0.14em] uppercase text-accent">
                  <span className="presence" aria-hidden="true" />
                  {t('Available for Work', 'Tersedia untuk Bekerja')}
                </span>
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

            <dl data-eqbot="about-counts" data-eqbot-at="above" className="mt-10 grid grid-cols-1 sm:grid-cols-3 border-t border-line">
              {stats.map((stat) => (
                <div key={stat.label as string} className="py-5 sm:pr-6 border-b sm:border-b-0 border-line">
                  <dt className="font-serif text-3xl text-ink">{stat.number}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{stat.label}</dd>
                  <dd className="mt-1 text-sm text-muted">{stat.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="rise-item font-serif text-3xl font-medium text-ink mb-8">
            {t('My Expertise', 'Keahlian Saya')}
          </h3>
          <div className="grid md:grid-cols-2 border-t border-l border-line">
            {aboutHighlights.map((highlight) => (
              <article key={highlight.title} className="rise-item read-row p-6 md:p-8 border-b border-r border-line bg-paper">
                <div className="flex items-center gap-3 text-accent mb-4">
                  {iconMap[highlight.icon]}
                  <span className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase">
                    {t(highlight.title, highlight.titleId)}
                  </span>
                </div>
                <p className="text-ink leading-relaxed">
                  {t(highlight.description, highlight.descriptionId)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
