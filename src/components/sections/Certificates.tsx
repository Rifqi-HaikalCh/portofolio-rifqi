// Update the import path below if '@/data/portfolio' alias is not configured
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { certificateCategories } from '../../data/portfolio';
import { ChevronDown, Award, FileText } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'code': <i className="fas fa-code text-2xl" />,
  'trophy': <i className="fas fa-trophy text-2xl" />,
  'users': <i className="fas fa-users text-2xl" />,
  'briefcase': <i className="fas fa-briefcase text-2xl" />,
};

export const Certificates: React.FC = () => {
  const { t } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Certificates & Achievements", "Sertifikat & Prestasi")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t(
              "Click on each category to explore my professional certifications and achievements organized by type.",
              "Klik pada setiap kategori untuk menjelajahi sertifikasi profesional dan pencapaian saya yang diorganisir berdasarkan jenis."
            )}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {certificateCategories.map((category, index) => (
            <div
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4 overflow-hidden"
            >
              <div
                onClick={() => toggleCategory(category.id)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 cursor-pointer flex justify-between items-center hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {categoryIcons[category.icon]}
                  <h3 className="text-xl font-bold">
                    {t(category.title, category.titleId)}
                  </h3>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                    {category.count}
                  </span>
                </div>
                <ChevronDown
                  size={24}
                  className={`transition-transform duration-300 ${
                    expandedCategories.includes(category.id) ? 'rotate-180' : ''
                  }`}
                />
              </div>

              <div
                className={`transition-all duration-300 ${
                  expandedCategories.includes(category.id)
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="p-6 grid md:grid-cols-2 gap-4">
                  {category.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border-2 border-transparent hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1"
                    >
                      <h4 className="text-emerald-500 font-semibold mb-2">
                        {t(cert.title, cert.titleId || cert.title)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {t(cert.description, cert.descriptionId || cert.description)}
                      </p>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-all hover:-translate-y-0.5"
                      >
                        <FileText size={14} />
                        {t("View Certificate", "Lihat Sertifikat")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};