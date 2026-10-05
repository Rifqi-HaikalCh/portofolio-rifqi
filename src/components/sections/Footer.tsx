'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo, navLinks } from '../../data/portfolio';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: `mailto:${contactInfo.email}`, icon: Mail, label: 'Email' },
    { href: contactInfo.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
    { href: contactInfo.github, icon: Github, label: 'GitHub', external: true },
    { href: contactInfo.whatsapp, icon: MessageCircle, label: 'WhatsApp', external: true },
  ];

  const services = [
    { en: '.NET / C# Development', id: 'Pengembangan .NET / C#' },
    { en: 'Enterprise Web and Data', id: 'Web dan Data Enterprise' },
    { en: 'UI/UX Design', id: 'Desain UI/UX' },
  ];

  return (
    <footer data-studio="colophon" className="bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-tight mb-4">
              Rifqi Haikal Chairiansyah
            </h2>
            <p className="text-paper/75 leading-relaxed text-sm max-w-sm">
              {t(
                "Software developer focused on C#, ASP.NET, .NET Core, and SQL Server for enterprise web and data systems.",
                "Pengembang perangkat lunak yang berfokus pada C#, ASP.NET, .NET Core, dan SQL Server untuk sistem web dan data enterprise."
              )}
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-paper/70 hover:text-paper"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-jetbrains-mono text-[11px] tracking-[0.2em] uppercase text-paper/50 mb-4">
              {t('Quick Links', 'Tautan Cepat')}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-paper/80 hover:text-paper">
                    {language === 'en' ? link.labelEn : link.labelId}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-jetbrains-mono text-[11px] tracking-[0.2em] uppercase text-paper/50 mb-4">
              {t('Services', 'Layanan')}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.en} className="text-sm text-paper/80">
                  {t(service.en, service.id)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 text-xs text-paper/55">
          {t(
            `© ${currentYear} Rifqi Haikal Chairiansyah. All rights reserved.`,
            `© ${currentYear} Rifqi Haikal Chairiansyah. Semua hak cipta dilindungi.`
          )}
        </div>
      </div>
    </footer>
  );
};
