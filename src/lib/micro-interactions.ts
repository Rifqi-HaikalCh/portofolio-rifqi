import { Variants } from 'framer-motion';

// Enhanced micro-interactions for the portfolio

export const cardHoverVariants: Variants = {
  initial: { 
    scale: 1, 
    y: 0, 
    rotateX: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
  },
  hover: { 
    scale: 1.02, 
    y: -8, 
    rotateX: 5,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  tap: { 
    scale: 0.98,
    y: -4,
    transition: { duration: 0.1 }
  }
};

export const roleSelectionVariants: Variants = {
  initial: { 
    scale: 1, 
    rotateY: 0,
    z: 0
  },
  hover: { 
    scale: 1.05, 
    rotateY: 5,
    z: 50,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const serviceCardVariants: Variants = {
  initial: { 
    y: 0, 
    scale: 1,
    rotateX: 0
  },
  hover: { 
    y: -12, 
    scale: 1.03,
    rotateX: 10,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

export const buttonMicroInteraction: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)' 
  },
  hover: { 
    scale: 1.05,
    boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)',
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const iconSpinVariants: Variants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: 360,
    transition: { 
      duration: 0.5, 
      ease: 'easeInOut' 
    }
  }
};

export const imageZoomVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: 0.3, 
      ease: 'easeOut' 
    }
  }
};

export const textRevealVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const slideInFromBottom: Variants = {
  initial: { 
    y: 60, 
    opacity: 0 
  },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const slideInFromLeft: Variants = {
  initial: { 
    x: -60, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const slideInFromRight: Variants = {
  initial: { 
    x: 60, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const floatingAnimation: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const pulseAnimation: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const rotateAnimation: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const morphingVariants: Variants = {
  initial: { 
    borderRadius: '0.75rem',
    scale: 1 
  },
  hover: { 
    borderRadius: '2rem',
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export const magneticButton: Variants = {
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10
    }
  }
};

// Role-specific animations
export const uiuxThemeVariants: Variants = {
  initial: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    scale: 1 
  },
  hover: { 
    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    scale: 1.03,
    transition: { duration: 0.3 }
  }
};

export const developerThemeVariants: Variants = {
  initial: { 
    background: 'linear-gradient(135deg, #06ffa5 0%, #3d8bfd 100%)',
    scale: 1 
  },
  hover: { 
    background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
    scale: 1.03,
    transition: { duration: 0.3 }
  }
};

export const fullstackThemeVariants: Variants = {
  initial: { 
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    scale: 1 
  },
  hover: { 
    background: 'linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)',
    scale: 1.03,
    transition: { duration: 0.3 }
  }
};

// Advanced interaction animations
export const liquidMotion: Variants = {
  hover: {
    borderRadius: ['0.75rem', '2rem', '0.75rem'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

export const breathingAnimation: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const glowEffect: Variants = {
  hover: {
    boxShadow: [
      '0 0 0 0 rgba(139, 92, 246, 0)',
      '0 0 0 10px rgba(139, 92, 246, 0.1)',
      '0 0 0 20px rgba(139, 92, 246, 0.05)',
      '0 0 0 30px rgba(139, 92, 246, 0)'
    ],
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};