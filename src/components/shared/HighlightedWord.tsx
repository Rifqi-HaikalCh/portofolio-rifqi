'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HighlightedWordProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export const HighlightedWord: React.FC<HighlightedWordProps> = ({
  children,
  variant = 'primary',
  intensity = 'medium',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: {
      idle: 'text-current',
      hover: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500'
    },
    secondary: {
      idle: 'text-current',
      hover: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'
    },
    accent: {
      idle: 'text-current',
      hover: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600'
    }
  };

  const intensities = {
    subtle: {
      y: -1,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    medium: {
      y: -3,
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    strong: {
      y: -5,
      scale: 1.08,
      rotate: [0, -1, 1, 0],
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }
  };

  return (
    <motion.span
      className={`inline-block cursor-default relative ${isHovered ? variants[variant].hover : variants[variant].idle} ${className}`}
      whileHover={intensities[intensity]}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        textShadow: isHovered ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      {children}
      
      {/* Subtle glow effect on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: intensity === 'strong' 
            ? 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '4px',
          transform: 'scale(1.2)'
        }}
      />
    </motion.span>
  );
};