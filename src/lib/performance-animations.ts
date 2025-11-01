import React from 'react';

/**
 * Performance-Optimized Animation Variants
 * Menggunakan transform dan opacity untuk hardware acceleration
 * Avoiding layout thrashing dengan will-change
 */

export const performanceVariants = {
  // Fade In Optimized
  fadeIn: {
    hidden: {
      opacity: 0,
      willChange: 'opacity'
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      },
      transitionEnd: {
        willChange: 'auto'
      }
    }
  },

  // Slide In From Bottom - Optimized
  slideInBottom: {
    hidden: {
      opacity: 0,
      y: 30,
      willChange: 'transform, opacity'
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      },
      transitionEnd: {
        willChange: 'auto'
      }
    }
  },

  // Scale In - Optimized
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.9,
      willChange: 'transform, opacity'
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      },
      transitionEnd: {
        willChange: 'auto'
      }
    }
  },

  // Stagger Children - Optimized
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },

  // Card Hover - Hardware Accelerated
  cardHover: {
    rest: {
      scale: 1,
      y: 0,
      willChange: 'auto'
    },
    hover: {
      scale: 1.03,
      y: -8,
      willChange: 'transform',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  },

  // Smooth Entrance
  smoothEntrance: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      willChange: 'transform, opacity'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
      transitionEnd: {
        willChange: 'auto'
      }
    }
  }
};

/**
 * Optimized Viewport Config
 * Menggunakan root margin untuk preload content sebelum terlihat
 */
export const optimizedViewport = {
  once: true,
  amount: 0.3,
  margin: '0px 0px -100px 0px' // Preload 100px sebelum element visible
};

/**
 * Reduced Motion Support
 * Respek preference user untuk reduced motion
 */
export const respectReducedMotion = (variants: any) => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.1 } }
    };
  }
  return variants;
};

/**
 * Debounce utility untuk scroll events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Intersection Observer Hook untuk Lazy Loading
 */
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};
