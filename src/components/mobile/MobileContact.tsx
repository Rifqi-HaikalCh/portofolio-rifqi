'use client';

import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { submitContact } from '../../lib/submit-contact';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';

const fieldClass = 'field w-full px-4 py-3 bg-paper border border-line text-ink placeholder:text-muted focus:outline-none';

export const MobileContact: React.FC = () => {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const data = new FormData(form.current);
      await submitContact({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        subject: String(data.get('subject') ?? ''),
        message: String(data.get('message') ?? ''),
      });

      setStatus('success');
      setStatusMessage(t(
        'Your message has been sent. A reply will go to the email address you entered.',
        'Pesan Anda sudah terkirim. Balasan akan dikirim ke email yang Anda masukkan.'
      ) as string);
      form.current.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setStatusMessage(t(
        'Failed to send message. Please try again later.',
        'Gagal mengirim pesan. Silakan coba lagi nanti.'
      ) as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  const details = [
    {
      icon: <Mail size={18} />,
      title: t('Email Me', 'Email Saya'),
      info: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: <Phone size={18} />,
      title: t('Call Me', 'Telepon Saya'),
      info: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: <MapPin size={18} />,
      title: t('Location', 'Lokasi'),
      info: contactInfo.location,
    },
  ];

  return (
    <section id="contact" data-studio="letter" className="py-16 px-5 border-b border-line bg-paper text-ink">
      <AnimatedSectionTitle
        badge="Let's Connect"
        title={t('Get In Touch', 'Hubungi Saya') as string}
        subtitle={t(
          "Have a project in mind? Let's discuss how we can work together to bring your ideas to life",
          'Punya projek dalam pikiran? Mari diskusikan bagaimana kita bisa bekerja sama untuk mewujudkan ide Anda'
        ) as string}
      />

      <form
        ref={form}
        data-eqbot="contact-title"
        data-eqbot-at="above"
        onSubmit={handleSubmit}
        className="border border-line bg-raised p-5 space-y-5"
      >
        <label className="block">
          <span className="block text-sm text-ink mb-2">{t('Full Name', 'Nama Lengkap')}</span>
          <input
            type="text"
            name="name"
            required
            className={fieldClass}
            placeholder={t('Enter your full name', 'Masukkan nama lengkap') as string}
          />
        </label>
        <label className="block">
          <span className="block text-sm text-ink mb-2">Email</span>
          <input
            type="email"
            name="email"
            required
            className={fieldClass}
            placeholder={t('Enter your email address', 'Masukkan alamat email') as string}
          />
        </label>
        <label className="block">
          <span className="block text-sm text-ink mb-2">{t('Subject', 'Subjek')}</span>
          <input
            type="text"
            name="subject"
            required
            className={fieldClass}
            placeholder={t("What's this about?", 'Tentang apa ini?') as string}
          />
        </label>
        <label className="block">
          <span className="block text-sm text-ink mb-2">{t('Message', 'Pesan')}</span>
          <textarea
            name="message"
            rows={5}
            required
            className={`${fieldClass} resize-none`}
            placeholder={t('Tell me about your project or idea...', 'Ceritakan tentang proyek atau ide Anda...') as string}
          />
        </label>

        {status !== 'idle' && statusMessage && (
          <p className={`flex items-start gap-3 border px-4 py-3 text-sm ${
            status === 'success' ? 'border-line text-ink' : 'border-accent text-accent'
          }`}>
            {status === 'success' ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
            <span>{statusMessage}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary-custom w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
          {isSubmitting ? t('Sending...', 'Mengirim...') : t('Send Message', 'Kirim Pesan')}
        </button>
      </form>

      <dl className="mt-10 border-t border-line">
        {details.map((item) => (
          <div key={item.info} className="py-5 border-b border-line">
            <dt className="flex items-center gap-2 text-accent">
              {item.icon}
              <span className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase">{item.title}</span>
            </dt>
            <dd className="mt-2 text-ink">
              {item.href ? (
                <a href={item.href} className="underline underline-offset-4 decoration-line hover:text-accent hover:decoration-accent">
                  {item.info}
                </a>
              ) : (
                item.info
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
