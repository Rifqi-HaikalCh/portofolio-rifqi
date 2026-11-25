import { ArrowUp, ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo, cvFile } from '../../data/portfolio';
import { pageSections } from '../../data/sections';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../icons/BrandIcons';
import { BrandLockup } from '../shared/BrandLockup';
import { T } from '../ui/T';
import { FrameBack } from '../scenes/FrameBack';

/*
  The back of the frame (DesignRules.md §4.3 Footer): kraft backing board with
  its hanging wire, then the colophon in ink. v3.10 (owner: "a more
  professional footer layout"): a call to action with the availability, then
  three columns (studio, index, contact; v3.12 dropped the settings and the
  colophon, which the navbar already covers), then a legal bar with the year
  and a way back to the top. Server component: the year is rendered at
  build/revalidate time.
*/

const label = 'mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper/70';
const link = 'group inline-flex min-h-10 items-center gap-3 text-sm text-paper/85 transition-colors hover:text-paper';

export function Footer() {
  const year = new Date().getFullYear();
  const reach = [
    { href: `mailto:${contactInfo.email}`, text: contactInfo.email, icon: <Mail size={16} aria-hidden="true" /> },
    { href: `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`, text: contactInfo.phone, icon: <Phone size={16} aria-hidden="true" /> },
    { href: contactInfo.linkedin, text: 'LinkedIn', icon: <LinkedinIcon size={16} aria-hidden="true" />, out: true },
    { href: contactInfo.github, text: 'GitHub', icon: <GithubIcon size={16} aria-hidden="true" />, out: true },
    { href: contactInfo.whatsapp, text: 'WhatsApp', icon: <WhatsappIcon size={16} aria-hidden="true" />, out: true },
  ];

  return (
    <footer data-studio="colophon" className="relative z-content-ui bg-ink text-paper">
      <FrameBack />
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 lg:px-8">
        {/* Call to action */}
        <div className="flex flex-col gap-8 border-b border-paper/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 border border-paper/25 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-paper/85">
              <span className="footer-live" aria-hidden="true" />
              <T en={contactInfo.availability.en} id={contactInfo.availability.id} />
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-paper md:text-4xl">
              <T en="Have a system to build or untangle? Let's talk." id="Punya sistem untuk dibangun atau dirapikan? Mari bicara." />
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex min-h-11 items-center gap-2 bg-paper px-5 text-sm font-medium text-ink transition-colors hover:bg-paper/85">
              <T en="Write to me" id="Tulis pesan" />
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={cvFile} download className="inline-flex min-h-11 items-center gap-2 border border-paper/35 px-5 text-sm text-paper transition-colors hover:border-paper">
              <Download size={16} aria-hidden="true" />
              <T en="Download CV" id="Unduh CV" />
            </a>
          </div>
        </div>

        {/* Three columns (v3.12, owner: settings and colophon removed) */}
        <div className="footer-cols grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <BrandLockup variant="horizontal" surface="ink" className="h-auto w-full max-w-[15rem]" label="Rifqi Haikal" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/75">
              <T
                en="Software engineer building enterprise .NET and SQL Server systems, and the web interfaces people use on top of them."
                id="Software engineer yang membangun sistem enterprise .NET dan SQL Server, beserta antarmuka web yang dipakai di atasnya."
              />
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-paper/75">
              <MapPin size={16} aria-hidden="true" />
              {contactInfo.location}
            </p>
          </div>

          <nav aria-labelledby="footer-index">
            <h2 id="footer-index" className={label}>
              <T en="Index" id="Indeks" />
            </h2>
            <ol className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {pageSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={link}>
                    <span className="w-7 font-mono text-[0.6875rem] text-paper/60 group-hover:text-paper">{section.index}</span>
                    <T en={section.en} id={section.idn} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            <h2 className={label}>
              <T en="Contact" id="Kontak" />
            </h2>
            <ul className="footer-reach grid">
              {reach.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={link}
                    {...(item.out ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="grid h-8 w-8 flex-none place-items-center border border-paper/20 text-paper/80 group-hover:border-paper/60">
                      {item.icon}
                    </span>
                    <span className="break-all">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Rifqi Haikal Chairiansyah. <T en="All rights reserved." id="Hak cipta dilindungi." />
          </p>
          <a href="#home" className="inline-flex min-h-11 items-center gap-2 text-paper/85 hover:text-paper">
            <T en="Back to top" id="Kembali ke atas" />
            <span className="grid h-8 w-8 place-items-center border border-paper/30">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
