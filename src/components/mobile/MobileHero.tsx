'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Mail, Linkedin, Github } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { typingTexts, contactInfo } from '../../data/portfolio';

export const MobileHero: React.FC = () => {
  const { language, t } = useLanguage();

  const socialIcons = [
    { href: `mailto:${contactInfo.email}`, icon: Mail, label: 'Email' },
    { href: contactInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: contactInfo.github, icon: Github, label: 'GitHub' },
    { href: contactInfo.whatsapp, icon: FaWhatsapp, label: 'WhatsApp' },
  ];

  return (
    <section id="home" data-studio="folio" className="border-b border-line bg-paper text-ink">
      <div className="px-5 pt-24 pb-10">
        <p className="font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent mb-5">
          {t('Web · Mobile · Interface', 'Web · Mobile · Antarmuka')}
        </p>
        <p className="text-sm text-muted mb-3">{t("Hi, I'm", 'Halo, Saya')}</p>
        <h1 className="font-serif text-6xl font-medium tracking-tight leading-[0.9] text-ink">
          Rifqi
          <span className="block">
            Haikal
            <span data-eqbot="home-name" data-eqbot-at="end" className="inline-block w-px h-px" aria-hidden="true" />
          </span>
        </h1>
        <p data-eqbot="home-role" data-eqbot-at="end" className="mt-6 text-lg text-muted max-w-sm">
          <span>{t("I'm", 'Saya')} </span>
          <TypeAnimation
            sequence={
              language === 'en'
                ? typingTexts.en.flatMap((text) => [text, 2000])
                : typingTexts.id.flatMap((text) => [text, 2000])
            }
            wrapper="span"
            speed={55}
            className="text-ink font-serif italic"
            repeat={Infinity}
            cursor
            preRenderFirstString
          />
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a href="#contact" className="btn-primary-custom">
            {t('Get In Touch', 'Hubungi Saya')}
          </a>
          <a href="#services" className="btn-outline-custom">
            {t('View Projects', 'Lihat Projek')}
          </a>
        </div>
      </div>

      <div className="border-t border-line px-5 py-5">
        <p data-eqbot="home-available" data-eqbot-at="end" className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase">
          <span className="inline-flex items-center text-accent">
            <span className="presence" aria-hidden="true" />
            {t('Available for work', 'Tersedia untuk bekerja')}
          </span>
          <span className="text-muted"> · {contactInfo.location}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {socialIcons.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="link-mark inline-flex items-center gap-2 text-sm text-muted"
              >
                <IconComponent size={16} />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
