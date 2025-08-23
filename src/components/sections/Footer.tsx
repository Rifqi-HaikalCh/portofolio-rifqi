import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { navLinks } from '../../data/portfolio';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white pt-12 sm:pt-16 pb-6 sm:pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About Section */}
          <div>
            <h4 className="text-emerald-400 font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Rifqi Haikal Chairiansyah</h4>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {t(
                "Passionate Full-Stack Developer and Mobile App Developer dedicated to creating innovative solutions through code. Always learning, always growing.",
                "Pengembang Full-Stack dan Aplikasi Mobile yang passionate, berdedikasi untuk menciptakan solusi inovatif melalui kode. Selalu belajar, selalu berkembang."
              )}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center sm:justify-start">
              <Link href={`mailto:${contactInfo.email}`} className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all hover:-translate-y-1">
                <Mail size={18} />
              </Link>
              <Link href={contactInfo.linkedin} target="_blank" className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all hover:-translate-y-1">
                <Linkedin size={18} />
              </Link>
              <Link href={contactInfo.github} target="_blank" className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all hover:-translate-y-1">
                <Github size={18} />
              </Link>
              <Link href={contactInfo.whatsapp} target="_blank" className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all hover:-translate-y-1">
                <MessageCircle size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-emerald-400 font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-center sm:text-left">
              {t("Quick Links", "Tautan Cepat")}
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-center sm:text-left">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-sm sm:text-base"
                  >
                    {language === 'en' ? link.labelEn : link.labelId}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-emerald-400 font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-center sm:text-left">
              {t("Services", "Layanan")}
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-center sm:text-left">
              <li className="text-sm sm:text-base">{t("Web Development", "Pengembangan Web")}</li>
              <li className="text-sm sm:text-base">{t("Mobile Development", "Pengembangan Mobile")}</li>
              <li className="text-sm sm:text-base">{t("UI/UX Design", "Desain UI/UX")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 dark:border-gray-600 pt-4 sm:pt-6 text-center text-gray-400 dark:text-gray-300">
          <p className="text-xs sm:text-sm">
            {t(
              `© ${currentYear} Rifqi Haikal Chairiansyah. All rights reserved.`,
              `© ${currentYear} Rifqi Haikal Chairiansyah. Semua hak cipta dilindungi.`
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};