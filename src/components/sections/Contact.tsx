import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { contactInfo } from '../../data/portfolio';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';
import { ContactForm } from './ContactForm';
import { CopyEmail } from './CopyEmail';

const channels = [
  { href: contactInfo.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
  { href: contactInfo.github, label: 'GitHub', icon: GithubIcon },
  { href: contactInfo.whatsapp, label: 'WhatsApp', icon: MessageCircle },
];

/*
  06 Contact — a letterpress card and a letter to send (DesignRules.md §4 `06`).
  Server component; the form and the copy button are the client leaves.
*/
export function Contact() {
  return (
    <section id="contact" data-studio="letter" aria-labelledby="contact-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div data-eqbot="contact-title" data-eqbot-at="above">
          <SectionTitle
            index="06"
            eyebrow={<T en="Correspondence" id="Surat-menyurat" />}
            title={<T en="Write to me" id="Kirimi saya surat" />}
            titleId="contact-title"
            lede={
              <T
                en="A role, a project, or a question about something on this desk. I read every message."
                id="Sebuah posisi, projek, atau pertanyaan tentang apa pun di meja ini. Saya membaca setiap pesan."
              />
            }
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start">
          <address className="paper-sheet border border-line p-6 not-italic md:p-8">
            <p className="letterpress font-serif text-3xl leading-tight">Rifqi Haikal Chairiansyah</p>
            <p className="mt-1 text-sm text-muted">Software Engineer</p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Email</p>
              <div className="mt-2 flex items-center gap-2">
                <a href={`mailto:${contactInfo.email}`} className="link-mark min-w-0 flex-1 break-all text-ink">
                  {contactInfo.email}
                </a>
                <CopyEmail email={contactInfo.email} />
              </div>
            </div>

            <ul className="mt-6 grid gap-2 border-t border-line pt-6">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-3 text-ink hover:text-accent"
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span className="flex-1">{channel.label}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-center gap-3 border-t border-line pt-6 text-sm text-muted">
              <MapPin size={16} aria-hidden="true" />
              {contactInfo.location}
            </p>
          </address>

          <div className="paper-sheet fold-tr border border-line">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
