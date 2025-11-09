"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { designSkills, developerSkills } from '../../data/portfolio';
import AnimatedSectionTitle from '../shared/AnimatedSectionTitle';
import GlassSkillCard from '../shared/GlassSkillCard';

const UiUxSkills: React.FC = () => {
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
    <section id="skills" className="py-20 px-4 md:px-8 lg:px-16">
      <AnimatedSectionTitle>My Skills</AnimatedSectionTitle>

      {/* Design Skills */}
      <div className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-100">
          Design Skills
        </h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
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
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-100">
          Developer Skills
        </h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
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

export default UiUxSkills;
