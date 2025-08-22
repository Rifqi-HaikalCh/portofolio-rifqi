import { useState } from 'react';
import { hardSkills, softSkills } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

export const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'hard' | 'soft'>('hard');

  const currentSkills = activeCategory === 'hard' ? hardSkills : softSkills;

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("Skills & Technologies", "Keahlian & Teknologi")}
          </h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            {t(
              "Click on each category to explore my technical and soft skills.",
              "Klik pada setiap kategori untuk menjelajahi keahlian teknis dan lunak saya."
            )}
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-12" data-aos="fade-up">
          <button
            onClick={() => setActiveCategory('hard')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === 'hard'
                ? 'bg-primary-green text-white transform -translate-y-1 shadow-custom'
                : 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white'
            }`}
          >
            {t("Hard Skills", "Keahlian Teknis")}
          </button>
          <button
            onClick={() => setActiveCategory('soft')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === 'soft'
                ? 'bg-primary-green text-white transform -translate-y-1 shadow-custom'
                : 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white'
            }`}
          >
            {t("Soft Skills", "Keahlian Lunak")}
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {currentSkills.map((skill, index) => (
            <div
              key={skill.name}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="group p-6 bg-white dark:bg-gray-700 rounded-2xl text-center shadow-custom hover:shadow-custom-hover hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:bg-primary-green"
            >
              <i 
                className={`fab fa-${skill.icon} text-4xl mb-3 transition-all duration-300 group-hover:text-white group-hover:scale-110`}
                style={{ color: skill.color }}
              ></i>
              <p className="font-semibold text-text-dark dark:text-white group-hover:text-white">
                {activeCategory === 'soft' && language === 'id' 
                  ? skill.name === 'Problem Solving' ? 'Pemecahan Masalah'
                  : skill.name === 'Critical Thinking' ? 'Berpikir Kritis'
                  : skill.name === 'Team Work' ? 'Kerja Tim'
                  : skill.name === 'Communication' ? 'Komunikasi'
                  : skill.name === 'Leadership' ? 'Kepemimpinan'
                  : skill.name === 'Time Management' ? 'Manajemen Waktu'
                  : skill.name === 'Creativity' ? 'Kreativitas'
                  : skill.name === 'Adaptability' ? 'Kemampuan Adaptasi'
                  : skill.name
                  : skill.name
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};