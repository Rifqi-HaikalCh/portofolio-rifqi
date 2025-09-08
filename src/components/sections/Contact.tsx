'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { staggerContainer, fadeInUp } from '../../lib/animations';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );

      console.log('Email sent successfully:', result.text);
      setStatus('success');
      setStatusMessage(t('Your message has been sent successfully!', 'Pesan Anda berhasil dikirim!') as string);
      form.current.reset();
      setFocusedField(null);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setStatusMessage(t('Failed to send message. Please try again later.', 'Gagal mengirim pesan. Silakan coba lagi nanti.') as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced dark background with shimmer */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionTitle
          badge="Let's Connect"
          badgeIcon={<MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          title={t("Get In Touch", "Hubungi Saya") as string}
          subtitle={t(
            "Have a project in mind? Let's discuss how we can work together to bring your ideas to life",
            "Punya projek dalam pikiran? Mari diskusikan bagaimana kita bisa bekerja sama untuk mewujudkan ide Anda"
          ) as string}
        />

        <div className="max-w-4xl mx-auto">
          {/* Enhanced Glassmorphism Form */}
          <motion.form 
            ref={form}
            onSubmit={handleSubmit} 
            className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Form background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 opacity-50" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Enhanced Name Field */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.label 
                  className={`block font-semibold mb-3 transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'text-emerald-400 dark:text-emerald-400 text-lg' 
                      : 'text-gray-700 dark:text-white/80 text-base'
                  }`}
                  animate={{ 
                    y: focusedField === 'name' ? -5 : 0,
                    scale: focusedField === 'name' ? 1.05 : 1
                  }}
                >
                  {t("Full Name", "Nama Lengkap")}
                </motion.label>
                <motion.input
                  type="text"
                  name="name"
                  required
                  className={`w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none transition-all duration-300 ${
                    focusedField === 'name'
                      ? 'border-emerald-500 bg-white/90 dark:bg-white/20 shadow-glow'
                      : 'border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30'
                  }`}
                  placeholder={t("Enter your full name", "Masukkan nama lengkap") as string}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
              
              {/* Enhanced Email Field */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.label 
                  className={`block font-semibold mb-3 transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'text-emerald-400 dark:text-emerald-400 text-lg' 
                      : 'text-gray-700 dark:text-white/80 text-base'
                  }`}
                  animate={{ 
                    y: focusedField === 'email' ? -5 : 0,
                    scale: focusedField === 'email' ? 1.05 : 1
                  }}
                >
                  Email
                </motion.label>
                <motion.input
                  type="email"
                  name="email"
                  required
                  className={`w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none transition-all duration-300 ${
                    focusedField === 'email'
                      ? 'border-emerald-500 bg-white/90 dark:bg-white/20 shadow-glow'
                      : 'border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30'
                  }`}
                  placeholder={t("Enter your email address", "Masukkan alamat email") as string}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            </div>

            {/* Enhanced Subject Field */}
            <motion.div 
              className="mb-6 relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.label 
                className={`block font-semibold mb-3 transition-all duration-300 ${
                  focusedField === 'subject' 
                    ? 'text-emerald-400 dark:text-emerald-400 text-lg' 
                    : 'text-gray-700 dark:text-white/80 text-base'
                }`}
                animate={{ 
                  y: focusedField === 'subject' ? -5 : 0,
                  scale: focusedField === 'subject' ? 1.05 : 1
                }}
              >
                {t("Subject", "Subjek")}
              </motion.label>
              <motion.input
                type="text"
                name="subject"
                required
                className={`w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none transition-all duration-300 ${
                  focusedField === 'subject'
                    ? 'border-emerald-500 bg-white/90 dark:bg-white/20 shadow-glow'
                    : 'border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30'
                }`}
                placeholder={t("What's this about?", "Tentang apa ini?") as string}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Enhanced Message Field */}
            <motion.div 
              className="mb-8 relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.label 
                className={`block font-semibold mb-3 transition-all duration-300 ${
                  focusedField === 'message' 
                    ? 'text-emerald-400 dark:text-emerald-400 text-lg' 
                    : 'text-gray-700 dark:text-white/80 text-base'
                }`}
                animate={{ 
                  y: focusedField === 'message' ? -5 : 0,
                  scale: focusedField === 'message' ? 1.05 : 1
                }}
              >
                {t("Message", "Pesan")}
              </motion.label>
              <motion.textarea
                name="message"
                rows={5}
                required
                className={`w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none transition-all duration-300 resize-none ${
                  focusedField === 'message'
                    ? 'border-emerald-500 bg-white/90 dark:bg-white/20 shadow-glow'
                    : 'border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30'
                }`}
                placeholder={t("Tell me about your project or idea...", "Ceritakan tentang proyek atau ide Anda...") as string}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Status Message */}
            {status !== 'idle' && statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-2xl border-2 relative z-10 flex items-center gap-3 ${
                  status === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="font-medium">{statusMessage}</span>
              </motion.div>
            )}

            {/* Enhanced Submit Button */}
            <div className="text-center relative z-10">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-5 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600 text-white rounded-full font-bold text-lg tracking-wide transition-all duration-500 inline-flex items-center justify-center gap-3 shadow-2xl hover:shadow-glow ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                }`}
                whileHover={!isSubmitting ? { 
                  y: -5,
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <motion.div
                  animate={isSubmitting ? {
                    rotate: 360,
                    transition: { duration: 1, repeat: Infinity, ease: "linear" }
                  } : {}}
                >
                  {isSubmitting ? <Loader size={20} /> : <Send size={20} />}
                </motion.div>
                {isSubmitting 
                  ? t("Sending...", "Mengirim...")
                  : t("Send Message", "Kirim Pesan")
                }
                
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-full" />
              </motion.button>
            </div>
          </motion.form>

          {/* Enhanced Contact Info Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Mail size={32} />,
                title: t("Email Me", "Email Saya"),
                info: contactInfo.email,
                gradient: "from-emerald-500 to-blue-500",
                delay: 0
              },
              {
                icon: <Phone size={32} />,
                title: t("Call Me", "Telepon Saya"),
                info: contactInfo.phone,
                gradient: "from-blue-500 to-purple-500",
                delay: 0.1
              },
              {
                icon: <MapPin size={32} />,
                title: t("Location", "Lokasi"),
                info: contactInfo.location,
                gradient: "from-purple-500 to-emerald-500",
                delay: 0.2
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:border-white/30 transition-all duration-500 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon with gradient background */}
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl group-hover:shadow-glow`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {item.icon}
                </motion.div>
                
                <div className="relative z-10">
                  <h5 className="font-bold text-gray-900 dark:text-white text-xl mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-gray-700 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors text-lg">
                    {item.info}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};