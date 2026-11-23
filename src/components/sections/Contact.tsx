import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { contactInfo } from '../../data/portfolio';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';
import { ContactForm } from './ContactForm';
import { CopyEmail } from './CopyEmail';
import { MailStation } from '../scenes/mail/MailStation';
import { MAIL_CHAPTER } from '../scenes/mail/beats';
import { Beat, Chapter } from '../scenes/chapter/Chapter';

const channels = [
  { href: contactInfo.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
  { href: contactInfo.github, label: 'GitHub', icon: GithubIcon },
  { href: contactInfo.whatsapp, label: 'WhatsApp', icon: MessageCircle },
];

/*
  06 Contact — the Mail Tray chapter (DesignRules.md §4.5 `06`): the
  letterhead drops, the letterpress card emerges from the envelope, then the
  correspondence sheet rises in flow.
  Server component; the form and the copy button are the client leaves.
*/
export function Contact() {
  return (
    <Chapter
      spec={MAIL_CHAPTER}
      labelledBy="contact-title"
      studio="letter"
      stage={<MailStation wide />}
      front={<MailStation wide only={['letters']} />}
    >
      <Beat id="letterhead" className="[&_header]:mb-0">
        <div data-eqbot="contact-title" data-eqbot-at="above">
          <SectionTitle
            index="06"
            eyebrow={<T en="Correspondence" id="Surat-menyurat" />}
            title={<T en="Write to me" id="Kirimi saya surat" />}
            titleId="contact-title"
            lede={
              <T
                en="A role, a project, or a question about something on this desk."
                id="Sebuah posisi, proyek, atau pertanyaan tentang apa pun di meja ini."
              />
            }
          />
        </div>
      </Beat>

      <Beat id="card">
        <address className="not-italic">
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
      </Beat>

      <Beat id="form" flow className="fold-tr">
        <ContactForm />
      </Beat>
    </Chapter>
  );
}
