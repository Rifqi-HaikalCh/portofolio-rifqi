'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'social' | 'skill';
  color?: string;
  background?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  size = 'md',
  variant = 'default',
  color,
  background,
  onClick,
  href,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  const variantAnimations = {
    default: {
      hover: { scale: 1.1, rotate: 5 },
      tap: { scale: 0.9 }
    },
    social: {
      hover: { 
        scale: 1.15, 
        rotate: [0, -10, 10, 0],
        y: -3
      },
      tap: { scale: 0.85 }
    },
    skill: {
      hover: { 
        scale: 1.1, 
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.3 }
      },
      tap: { scale: 0.95 }
    }
  };

  const baseClasses = `flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-glow ${sizeClasses[size]} ${className}`;
  
  const Component = href ? motion.a : motion.div;
  const componentProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <Component
      {...componentProps}
      className={baseClasses}
      style={{
        backgroundColor: background || 'rgba(16, 185, 129, 0.1)',
        color: color || '#10B981'
      }}
      whileHover={variantAnimations[variant].hover}
      whileTap={variantAnimations[variant].tap}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.1
      }}
    >
      {/* Floating particles on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        whileHover={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Pulsing ring on social variant */}
      {variant === 'social' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-current opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Icon content */}
      <motion.div
        whileHover={variant === 'skill' ? {
          rotate: [0, 15, -15, 0]
        } : undefined}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full translate-x-[-100%] opacity-0"
        whileHover={{
          translateX: '100%',
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />
    </Component>
  );
};