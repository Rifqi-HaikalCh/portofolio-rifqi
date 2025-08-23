'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionTitleProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
  delay?: number;
}

export const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  className = "",
  center = true,
  delay = 0
}) => {
  return (
    <motion.div 
      className={`${center ? 'text-center' : ''} mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
    >
      {badge && (
        <motion.div 
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 dark:from-emerald-900/30 dark:via-blue-900/30 dark:to-purple-900/30 rounded-full mb-8 shadow-lg backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {badgeIcon && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {badgeIcon}
            </motion.div>
          )}
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wider uppercase">
            {badge}
          </span>
        </motion.div>
      )}
      
      <motion.h2 
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        {/* Animated gradient background */}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-emerald-600 via-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-bg bg-[length:400%_400%] drop-shadow-2xl">
            {title}
          </span>
          
          {/* Glow effect */}
          <span 
            className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent blur-sm opacity-50 animate-gradient-bg bg-[length:400%_400%]"
            aria-hidden="true"
          >
            {title}
          </span>
          
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: delay + 1
            }}
          />
        </span>
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};