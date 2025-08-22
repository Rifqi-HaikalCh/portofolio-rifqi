import { Github, Link, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { navLinks } from '../../data/portfolio';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h4 className="text-primary-green font-semibold text-lg mb-4">Rifqi Haikal Chairiansyah</h4>
            <p className="text-gray-300 leading-relaxed">
              {t(
                "Passionate Full-Stack Developer and Mobile App Developer dedicated to creating innovative solutions through code. Always learning, always growing.",
                "Pengembang Full-Stack dan Aplikasi Mobile yang passionate, berdedikasi untuk menciptakan solusi inovatif melalui kode. Selalu belajar, selalu berkembang."
              )}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <Link href={`mailto:${contactInfo.email}`} className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-secondary-green transition-all hover:-translate-y-1">
                <Mail size={18} />
              </Link>
              <Link href={contactInfo.linkedin} target="_blank" className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-secondary-green transition-all hover:-translate-y-1">
                <Linkedin size={18} />
              </Link>
              <Link href={contactInfo.github} target="_blank" className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-secondary-green transition-all hover:-translate-y-1">
                <Github size={18} />
              </Link>
              <Link href={contactInfo.whatsapp} target="_blank" className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center hover:bg-secondary-green transition-all hover:-translate-y-1">
                <MessageCircle size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-green font-semibold text-lg mb-4">
              {t("Quick Links", "Tautan Cepat")}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-green transition-colors"
                  >
                    {language === 'en' ? link.labelEn : link.labelId}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-green font-semibold text-lg mb-4">
              {t("Services", "Layanan")}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t("Web Development", "Pengembangan Web")}</li>
              <li>{t("Mobile Development", "Pengembangan Mobile")}</li>
              <li>{t("UI/UX Design", "Desain UI/UX")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
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