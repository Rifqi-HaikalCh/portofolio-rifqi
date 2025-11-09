"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { designSkills, developerSkills } from '../../data/portfolio';
import GlassSkillCard from '../shared/GlassSkillCard';

const MobileUiUxSkills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills-mobile" className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">
        My Skills
      </h2>

      {/* Design Skills */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-200">
          Design Skills
        </h3>
        <motion.div
          className="grid grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {designSkills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <GlassSkillCard name={skill.name} image={skill.image} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Developer Skills */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-200">
          Developer Skills
        </h3>
        <motion.div
          className="grid grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {developerSkills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <GlassSkillCard name={skill.name} image={skill.image} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MobileUiUxSkills;
