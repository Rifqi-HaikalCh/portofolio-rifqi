'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export const MobileContact: React.FC = () => {
  const { language } = useLanguage();
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
      let serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      let templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      let autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      let publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        serviceId = 'service_r4ez1t9';
        templateId = 'template_lgl8zbc';
        autoReplyTemplateId = 'template_wexjx9n';
        publicKey = 'it9csNm7MMiMayM7z';
      }

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);

      if (autoReplyTemplateId) {
        await emailjs.sendForm(serviceId, autoReplyTemplateId, form.current, publicKey);
      }

      setStatus('success');
      setStatusMessage(
        language === 'en'
          ? 'Your message has been sent successfully!'
          : 'Pesan Anda berhasil dikirim!'
      );
      form.current.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setStatusMessage(
        language === 'en'
          ? 'Failed to send message. Please try again later.'
          : 'Gagal mengirim pesan. Silakan coba lagi nanti.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 bg-white dark:bg-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
          {language === 'en' ? "Let's Connect" : 'Mari Terhubung'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Get In Touch' : 'Hubungi Saya'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {language === 'en'
            ? "Have a project in mind? Let's discuss how we can work together"
            : 'Punya projek dalam pikiran? Mari diskusikan bagaimana kita bisa bekerja sama'}
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        ref={form}
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-4 mb-12"
      >
        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {language === 'en' ? 'Full Name' : 'Nama Lengkap'}
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder={language === 'en' ? 'Enter your full name' : 'Masukkan nama lengkap'}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder={language === 'en' ? 'Enter your email address' : 'Masukkan alamat email'}
          />
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {language === 'en' ? 'Subject' : 'Subjek'}
          </label>
          <input
            type="text"
            name="subject"
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder={language === 'en' ? "What's this about?" : 'Tentang apa ini?'}
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {language === 'en' ? 'Message' : 'Pesan'}
          </label>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            placeholder={language === 'en' ? 'Tell me about your project or idea...' : 'Ceritakan tentang proyek atau ide Anda...'}
          />
        </div>

        {/* Status Message */}
        {status !== 'idle' && statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl flex items-center gap-3 ${
              status === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }`}
          >
            {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium text-sm">{statusMessage}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'
          } transition-all`}
        >
          {isSubmitting ? (
            <>
              <Loader size={20} className="animate-spin" />
              {language === 'en' ? 'Sending...' : 'Mengirim...'}
            </>
          ) : (
            <>
              <Send size={20} />
              {language === 'en' ? 'Send Message' : 'Kirim Pesan'}
            </>
          )}
        </button>
      </motion.form>

      {/* Contact Info Cards - Enhanced Design */}
      <div className="space-y-4">
        {[
          {
            icon: <Mail size={26} />,
            title: language === 'en' ? 'Email Me' : 'Email Saya',
            info: contactInfo.email,
            gradient: 'from-emerald-400 via-teal-500 to-blue-500',
            iconBg: 'bg-white/90',
            iconColor: 'text-emerald-600',
            link: `mailto:${contactInfo.email}`,
          },
          {
            icon: <Phone size={26} />,
            title: language === 'en' ? 'Call Me' : 'Telepon Saya',
            info: contactInfo.phone,
            gradient: 'from-blue-400 via-indigo-500 to-purple-500',
            iconBg: 'bg-white/90',
            iconColor: 'text-blue-600',
            link: `tel:${contactInfo.phone}`,
          },
          {
            icon: <MapPin size={26} />,
            title: language === 'en' ? 'Location' : 'Lokasi',
            info: contactInfo.location,
            gradient: 'from-purple-400 via-pink-500 to-emerald-500',
            iconBg: 'bg-white/90',
            iconColor: 'text-purple-600',
            link: null,
          },
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.link || undefined}
            target={item.link ? "_blank" : undefined}
            rel={item.link ? "noopener noreferrer" : undefined}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`block bg-gradient-to-r ${item.gradient} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-5">
              {/* Icon Container */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 ${item.iconBg} backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${item.iconColor}`}
              >
                {item.icon}
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-xl mb-1.5 drop-shadow-sm">{item.title}</h5>
                <p className="text-white/95 text-base font-medium truncate">{item.info}</p>
              </div>

              {/* Arrow Indicator for Links */}
              {item.link && (
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              )}
            </div>

            {/* Bottom Shine Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};
