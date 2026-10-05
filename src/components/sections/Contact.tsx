'use client';
import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { submitContact } from '../../lib/submit-contact';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';

export const Contact: React.FC = () => {
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
      setStatusMessage(t('Failed to send message. Please try again later.', 'Gagal mengirim pesan. Silakan coba lagi nanti.') as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-studio="letter" className="py-12 md:py-16 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <AnimatedSectionTitle
          badge="Let's Connect"
          title={t("Get In Touch", "Hubungi Saya") as string}
          subtitle={t(
            "Have a project in mind? Let's discuss how we can work together to bring your ideas to life",
            "Punya projek dalam pikiran? Mari diskusikan bagaimana kita bisa bekerja sama untuk mewujudkan ide Anda"
          ) as string}
        />

        <div className="max-w-4xl mx-auto">
          <form
            ref={form}
            data-eqbot="contact-title"
            data-eqbot-at="above"
            onSubmit={handleSubmit}
            className="border border-line bg-raised p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block text-sm text-ink">
                {t("Full Name", "Nama Lengkap")}
                <input
                  type="text"
                  name="name"
                  required
                  className="field mt-2 w-full px-4 py-3 bg-paper border border-line text-ink placeholder:text-muted focus:outline-none"
                  placeholder={t("Enter your full name", "Masukkan nama lengkap") as string}
                />
              </label>
              <label className="block text-sm text-ink">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="field mt-2 w-full px-4 py-3 bg-paper border border-line text-ink placeholder:text-muted focus:outline-none"
                  placeholder={t("Enter your email address", "Masukkan alamat email") as string}
                />
              </label>
            </div>
            <label className="mt-6 block text-sm text-ink">
              {t("Subject", "Subjek")}
              <input
                type="text"
                name="subject"
                required
                className="field mt-2 w-full px-4 py-3 bg-paper border border-line text-ink placeholder:text-muted focus:outline-none"
                placeholder={t("What's this about?", "Tentang apa ini?") as string}
              />
            </label>
            <label className="mt-6 block text-sm text-ink">
              {t("Message", "Pesan")}
              <textarea
                name="message"
                rows={5}
                required
                className="field mt-2 w-full px-4 py-3 bg-paper border border-line text-ink placeholder:text-muted focus:outline-none resize-none"
                placeholder={t("Tell me about your project or idea...", "Ceritakan tentang proyek atau ide Anda...") as string}
              />
            </label>
            {status !== 'idle' && statusMessage && (
              <p className={`mt-6 border px-4 py-3 text-sm ${status === 'success' ? 'border-line text-ink' : 'border-accent text-accent'}`}>
                {status === 'success' ? <CheckCircle size={16} className="inline mr-2" /> : <AlertCircle size={16} className="inline mr-2" />}
                {statusMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary-custom mt-8 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
              {isSubmitting ? t("Sending...", "Mengirim...") : t("Send Message", "Kirim Pesan")}
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: <Mail size={18} />, title: t("Email Me", "Email Saya"), info: contactInfo.email, href: `mailto:${contactInfo.email}` },
              { icon: <Phone size={18} />, title: t("Call Me", "Telepon Saya"), info: contactInfo.phone, href: `tel:${contactInfo.phone}` },
              { icon: <MapPin size={18} />, title: t("Location", "Lokasi"), info: contactInfo.location, href: '' },
            ].map((item) => {
              const body = (
                <>
                  <div className="text-accent mb-4">{item.icon}</div>
                  <h5 className="card-hover-title font-serif text-xl text-ink mb-2">{item.title}</h5>
                  <p className="text-muted">{item.info}</p>
                </>
              );
              if (!item.href) {
                return (
                  <div key={item.info} className="border border-line bg-raised p-6">
                    {body}
                  </div>
                );
              }
              return (
                <a key={item.info} href={item.href} className="card-hover border border-line bg-raised p-6">
                  {body}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
