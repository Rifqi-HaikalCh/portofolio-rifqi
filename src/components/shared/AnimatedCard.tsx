'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowEffect?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverScale = 1.03,
  hoverY = -8,
  glowEffect = true,
  onClick,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${glowEffect ? 'hover:shadow-glow' : 'hover:shadow-xl'} ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        scale: hoverScale, 
        y: hoverY,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)' // GPU acceleration
      }}
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Animated border glow */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          initial={{ 
            backgroundColor: 'rgba(0, 0, 0, 0)' 
          }}
          animate={{
            background: isHovered 
              ? 'linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))'
              : 'rgba(0, 0, 0, 0)'
          }}
          transition={{ duration: 0.3 }}
          style={{ 
            padding: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0)'
          }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-inherit" />
        </motion.div>
      )}
      
      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-bl-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};