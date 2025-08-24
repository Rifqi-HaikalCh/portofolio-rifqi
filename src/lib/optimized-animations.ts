// Optimized Animation Library for 60fps Performance
// Hardware acceleration focused with transform and opacity only

import { Variants } from 'framer-motion';

// Optimized easing curves for smooth 60fps animations
export const premiumEasing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  power: [0.77, 0, 0.175, 1],
  expo: [0.19, 1, 0.22, 1]
} as const;

// Hardware accelerated fade animations
export const optimizedFadeIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    transform: 'translateZ(0)' // Force hardware acceleration
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: premiumEasing.smooth,
      staggerChildren: 0.1
    }
  }
};

// Optimized slide animations
export const optimizedSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEasing.power,
      type: "spring",
      stiffness: 120,
      damping: 20
    }
  }
};

// Premium stagger container
export const premiumStagger: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.6,
      ease: premiumEasing.smooth
    }
  }
};

// Optimized hover effects
export const premiumHover = {
  scale: 1.05,
  y: -8,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.8
  }
};

export const subtleHover = {
  scale: 1.02,
  y: -4,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20
  }
};

// Magnetic button effect
export const magneticEffect = {
  scale: 1.1,
  rotate: [0, -1, 1, 0],
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 15
  }
};

// Floating animation for elements
export const floatingAnimation = {
  y: [-10, 10, -10],
  rotate: [-2, 2, -2],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Optimized entrance animations for sections
export const sectionEntrance: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden'
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: premiumEasing.expo,
      type: "spring",
      stiffness: 100,
      damping: 25
    }
  }
};

// Glow effect animation
export const glowPulse = {
  boxShadow: [
    "0 0 20px rgba(16, 185, 129, 0.3)",
    "0 0 40px rgba(16, 185, 129, 0.6)", 
    "0 0 20px rgba(16, 185, 129, 0.3)"
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Card reveal animation
export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -90,
    transformPerspective: 1000,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden'
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: premiumEasing.bounce,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

// Optimized text reveal
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    skewY: 10,
    willChange: 'transform, opacity'
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.6,
      ease: premiumEasing.power
    }
  }
};

// Navigation transition
export const navTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8
};

// Modal animations
export const modalOverlay: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    willChange: 'opacity, backdrop-filter'
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: {
      duration: 0.3,
      ease: premiumEasing.smooth
    }
  }
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 100,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden'
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEasing.bounce,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

// Performance optimized transition defaults
export const optimizedTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
  mass: 1
};

// Viewport settings for performance
export const optimizedViewport = {
  once: true,
  amount: 0.3,
  margin: "-100px"
};

// Helper function for creating optimized motion props
export const createOptimizedMotion = (animation: Variants, delay = 0) => ({
  variants: animation,
  initial: "hidden",
  whileInView: "visible",
  viewport: optimizedViewport,
  transition: {
    ...optimizedTransition,
    delay
  }
});