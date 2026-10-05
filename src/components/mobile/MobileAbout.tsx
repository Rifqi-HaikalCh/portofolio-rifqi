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

export const MobileAbout: React.FC = () => {
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
    <section id="about" data-studio="manuscript" className="py-16 border-b border-line bg-paper text-ink">
      <div className="px-5">
        <AnimatedSectionTitle
          center={false}
          badge={t('Get to Know Me', 'Mengenal Saya') as string}
          title={t('About Me', 'Tentang Saya') as string}
          subtitle={t(
            'Software engineer specialized in C#, ASP.NET, and SQL Server for enterprise web and data systems',
            'Software engineer yang berfokus pada C#, ASP.NET, dan SQL Server untuk sistem web dan data enterprise'
          ) as string}
        />

        <figure data-eqbot="about-photo" data-eqbot-at="above" className="rise-item">
          <div className="border border-line bg-raised">
            <div className="relative aspect-square overflow-hidden bg-raised">
              <Image
                src="/assets/me.png"
                alt="Rifqi Haikal"
                fill
                sizes="90vw"
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

        <div className="rise-item">
        <h3 className="mt-10 font-serif text-3xl font-medium tracking-tight text-ink">
          {t("Hi, I'm", "Halo, Saya")}{' '}
          <span className="italic">Rifqi Haikal</span>
        </h3>
        <p className="mt-4 text-base text-muted leading-relaxed">
          {language === 'en'
            ? 'Software Engineer with 3 years of hands-on development experience. My core work is C#, ASP.NET MVC, and .NET Core for enterprise web and data systems. I also bring additional full-stack experience with React, Angular, and Spring Boot. I have built backend services, REST APIs, monitoring dashboards, and secure applications with SQL Server, Entity Framework, RBAC, SSO, and MFA, delivered for telecommunications, oil and gas, research, and financial services. Bachelor of Informatics from Institut Teknologi Del, GPA 3.39.'
            : 'Software Engineer dengan 3 tahun pengalaman pengembangan. Pekerjaan inti saya adalah C#, ASP.NET MVC, dan .NET Core untuk sistem web dan data enterprise. Saya juga memiliki pengalaman full-stack tambahan dengan React, Angular, dan Spring Boot. Saya membangun layanan backend, REST API, dashboard pemantauan, dan aplikasi yang aman dengan SQL Server, Entity Framework, RBAC, SSO, dan MFA, untuk telekomunikasi, minyak dan gas, riset, serta jasa keuangan. Sarjana Informatika dari Institut Teknologi Del, IPK 3,39.'}
        </p>

        <div className="mt-8 flex flex-col gap-3">
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

        <dl className="mt-10 border-t border-line">
          {stats.map((stat) => (
            <div key={stat.label as string} className="py-5 border-b border-line">
              <dt className="font-serif text-3xl text-ink">{stat.number}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{stat.label}</dd>
              <dd className="mt-1 text-sm text-muted">{stat.description}</dd>
            </div>
          ))}
        </dl>
        </div>

        <h3 className="rise-item mt-14 font-serif text-3xl font-medium text-ink mb-6">
          {t('My Expertise', 'Keahlian Saya')}
        </h3>
        <div className="border-t border-line">
          {aboutHighlights.map((highlight) => (
            <article key={highlight.title} className="rise-item read-row py-6 border-b border-line">
              <div className="flex items-center gap-3 text-accent mb-3">
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
    </section>
  );
};
