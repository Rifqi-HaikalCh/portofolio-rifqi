'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { navLinks } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Enhanced About Section */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <motion.h4 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Rifqi Haikal Chairiansyah
            </motion.h4>
            <p className="text-gray-300 leading-relaxed text-base mb-8">
              {t(
                "Passionate Full-Stack Developer and Mobile App Developer dedicated to creating innovative solutions through code. Always learning, always growing.",
                "Pengembang Full-Stack dan Aplikasi Mobile yang passionate, berdedikasi untuk menciptakan solusi inovatif melalui kode. Selalu belajar, selalu berkembang."
              )}
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex gap-4">
              {[
                { href: `mailto:${contactInfo.email}`, icon: <Mail size={20} />, label: "Email", gradient: "from-emerald-500 to-emerald-600" },
                { href: contactInfo.linkedin, icon: <Linkedin size={20} />, label: "LinkedIn", gradient: "from-blue-500 to-blue-600", external: true },
                { href: contactInfo.github, icon: <Github size={20} />, label: "GitHub", gradient: "from-gray-600 to-gray-700", external: true },
                { href: contactInfo.whatsapp, icon: <MessageCircle size={20} />, label: "WhatsApp", gradient: "from-green-500 to-green-600", external: true }
              ].map((social, index) => (
                <motion.div key={social.label} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }}>
                  <Link 
                    href={social.href} 
                    {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group relative w-12 h-12 bg-gradient-to-r ${social.gradient} rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-glow overflow-hidden`}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative z-10">{social.icon}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quick Links */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h4 className="text-xl font-bold mb-6 text-emerald-400">
              {t("Quick Links", "Tautan Cepat")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-all duration-300 font-medium"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {language === 'en' ? link.labelEn : link.labelId}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Services */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h4 className="text-xl font-bold mb-6 text-emerald-400">
              {t("Services", "Layanan")}
            </h4>
            <ul className="space-y-3">
              {[
                { en: "Web Development", id: "Pengembangan Web" },
                { en: "Mobile Development", id: "Pengembangan Mobile" },
                { en: "UI/UX Design", id: "Desain UI/UX" }
              ].map((service, index) => (
                <motion.li 
                  key={service.en}
                  className="group flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full group-hover:scale-125 transition-transform" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                    {t(service.en, service.id)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom Bar */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Animated divider */}
          <div className="relative mb-8 flex items-center">
            <motion.div 
              className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            <div className="px-4">
              <motion.div 
                className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.div 
              className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="text-center">
            <motion.p 
              className="text-gray-400 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {t(
                `© ${currentYear} Rifqi Haikal Chairiansyah. All rights reserved.`,
                `© ${currentYear} Rifqi Haikal Chairiansyah. Semua hak cipta dilindungi.`
              )}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};