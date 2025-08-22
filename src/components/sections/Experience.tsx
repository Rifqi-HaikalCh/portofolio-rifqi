"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import { Calendar, MapPin, X } from 'lucide-react';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <section id="experience" className="py-20 bg-bg-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("Experience", "Pengalaman")}
          </h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            {t(
              "Click on any experience card to see photos from that period.",
              "Klik pada kartu pengalaman untuk melihat foto dari periode tersebut."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Work Experience */}
          <div data-aos="fade-up">
            <h3 className="text-2xl font-bold text-primary-green text-center mb-6">
              {t("Work Experience", "Pengalaman Kerja")}
            </h3>
            {workExperience.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4 shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer relative hover:border-l-4 hover:border-primary-green"
              >
                <h4 className="text-xl font-semibold text-text-dark dark:text-white mb-1">
                  {t(exp.title, exp.titleId || exp.title)}
                </h4>
                <h5 className="text-primary-green font-medium mb-2">{exp.company}</h5>
                <div className="flex items-center gap-4 text-sm text-text-light dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {exp.period}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {exp.location}
                    </span>
                  )}
                </div>
                <p className="text-text-light dark:text-gray-400 mb-3">
                  {t(exp.description, exp.descriptionId || exp.description)}
                </p>
                {exp.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-light-green text-dark-green rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Organization Experience */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-bold text-primary-green text-center mb-6">
              {t("Organization Experience", "Pengalaman Organisasi")}
            </h3>
            {organizationExperience.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4 shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer relative hover:border-l-4 hover:border-primary-green"
              >
                <h4 className="text-xl font-semibold text-text-dark dark:text-white mb-1">
                  {t(exp.title, exp.titleId || exp.title)}
                </h4>
                <h5 className="text-primary-green font-medium mb-2">{exp.company}</h5>
                <div className="flex items-center gap-4 text-sm text-text-light dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {exp.period}
                  </span>
                </div>
                <p className="text-text-light dark:text-gray-400">
                  {t(exp.description, exp.descriptionId || exp.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedExp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedExp(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="bg-gradient-primary text-white p-6 rounded-t-2xl flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedExp.company}</h3>
                <button onClick={() => setSelectedExp(null)} className="hover:bg-white/20 p-1 rounded">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                {selectedExp.image && (
                  <Image src={selectedExp.image} alt={selectedExp.company} width={600} height={400} className="w-full rounded-lg mb-4" />
                )}
                <p className="text-text-light dark:text-gray-400">
                  {t(selectedExp.description, selectedExp.descriptionId || selectedExp.description)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};