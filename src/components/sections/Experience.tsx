'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import { Briefcase, Users, Calendar, MapPin } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const TimelineCard = ({ exp, side, icon }: { exp: any, side: 'left' | 'right', icon: React.ReactNode }) => {
  const { t } = useLanguage();
  const alignment = side === 'left' ? 'flex-row-reverse' : 'flex-row';
  const textAlignment = side === 'left' ? 'text-right' : 'text-left';
  const margin = side === 'left' ? 'mr-auto' : 'ml-auto';
  
  return (
    <motion.div variants={fadeInUp} className={`mb-8 flex justify-between items-center w-full ${alignment}`}>
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-primary-green shadow-xl w-10 h-10 rounded-full text-white">
        {icon}
      </div>
      <div className={`order-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4 ${textAlignment}`}>
        <h4 className="font-bold text-text-dark dark:text-white text-lg">{t(exp.title, exp.titleId || exp.title)}</h4>
        <h5 className="text-primary-green font-medium mb-2">{exp.company}</h5>
        <p className="text-sm text-text-light dark:text-gray-400">{exp.period}</p>
        <p className="text-sm leading-snug tracking-wide text-text-light dark:text-gray-400 text-opacity-100 mt-2">
           {t(exp.description, exp.descriptionId || exp.description)}
        </p>
      </div>
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 bg-bg-white dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("My Journey", "Perjalanan Saya")}
          </h2>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-500 h-full border" style={{left: '50%'}}></div>
            {workExperience.map((exp, i) => (
              <TimelineCard key={exp.id} exp={exp} side={i % 2 === 0 ? 'left' : 'right'} icon={<Briefcase size={16} />} />
            ))}
             {organizationExperience.map((exp, i) => (
              <TimelineCard key={exp.id} exp={exp} side={i % 2 !== 0 ? 'left' : 'right'} icon={<Users size={16} />} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};