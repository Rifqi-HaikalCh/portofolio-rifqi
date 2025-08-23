'use client';

import React from 'react';
import { motion } from 'framer-motion';

// About Section - Gradient Blobs
export const AboutBackground: React.FC = () => {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.8, 1.3, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.4, 0.7, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
    </>
  );
};

// Skills Section - Geometric Grid Pattern
export const SkillsBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(16, 185, 129, 0.1) 41%, rgba(16, 185, 129, 0.1) 59%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(59, 130, 246, 0.1) 41%, rgba(59, 130, 246, 0.1) 59%, transparent 60%)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 border-2 border-emerald-500/20 rotate-45"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-12 h-12 border-2 border-blue-500/20"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

// Experience Section - Aurora Lines
export const ExperienceBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
          animate={{
            opacity: [0.7, 0.3, 0.7],
            scaleY: [1.2, 0.8, 1.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scaleY: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
    </>
  );
};

// Projects Section - Subtle Noise Texture
export const ProjectsBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <motion.div
          className="w-full h-full"
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

// Certificates Section - Similar to Projects
export const CertificatesBackground: React.FC = () => {
  return <ProjectsBackground />;
};

// Contact Section - Dark Elegant Shimmer
export const ContactBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl"
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
    </>
  );
};