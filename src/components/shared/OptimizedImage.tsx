'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, HTMLMotionProps } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  // Motion props
  motion?: boolean;
  motionProps?: Omit<HTMLMotionProps<'div'>, 'children'>;
  // Custom responsive breakpoints
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * OptimizedImage Component
 *
 * Features:
 * 1. WebP/AVIF automatic conversion via Next.js Image optimization
 * 2. Lazy loading with intersection observer
 * 3. Responsive srcset generation
 * 4. Blur placeholder support
 * 5. Framer Motion animation support
 * 6. Progressive loading indicator
 *
 * @example
 * // Basic usage
 * <OptimizedImage src="/assets/image.png" alt="Description" width={800} height={600} />
 *
 * // With fill and responsive sizes
 * <OptimizedImage
 *   src="/assets/image.png"
 *   alt="Description"
 *   fill
 *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 * />
 *
 * // With motion animation
 * <OptimizedImage
 *   src="/assets/image.png"
 *   alt="Description"
 *   width={800}
 *   height={600}
 *   motion
 *   motionProps={{
 *     whileHover: { scale: 1.05 },
 *     transition: { duration: 0.3 }
 *   }}
 * />
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  loading = 'lazy',
  motion: enableMotion = false,
  motionProps = {},
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, loading]);

  // Generate responsive sizes string if not provided
  const responsiveSizes = sizes || (fill
    ? `(max-width: ${breakpoints.sm}px) 100vw, (max-width: ${breakpoints.md}px) 50vw, (max-width: ${breakpoints.lg}px) 33vw, 25vw`
    : undefined
  );

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Determine if image should use WebP/AVIF
  // Next.js automatically serves WebP/AVIF if browser supports it
  const imageFormat = src.startsWith('http') ? src : src;

  const imageProps = {
    src: imageFormat,
    alt,
    quality,
    onLoad: handleLoad,
    className: `transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`,
    ...(fill
      ? {
          fill: true,
          sizes: responsiveSizes,
          style: {
            objectFit,
            objectPosition,
          }
        }
      : {
          width,
          height,
          ...(responsiveSizes && { sizes: responsiveSizes })
        }
    ),
    ...(priority && { priority: true }),
    ...(placeholder === 'blur' && blurDataURL && {
      placeholder: 'blur' as const,
      blurDataURL
    }),
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div
      className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );

  const ImageContent = () => (
    <div ref={imgRef} className={`relative ${fill ? '' : 'inline-block'}`}>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>

      {!isLoaded && <LoadingSkeleton />}

      {isInView && <Image {...imageProps} />}
    </div>
  );

  // Wrap with motion if enabled
  if (enableMotion) {
    return (
      <motion.div
        className={fill ? 'relative w-full h-full' : 'relative inline-block'}
        {...motionProps}
      >
        <ImageContent />
      </motion.div>
    );
  }

  return <ImageContent />;
};

/**
 * Utility function to generate blur placeholder data URL
 * This creates a tiny base64 encoded version for blur effect
 */
export const generateBlurDataURL = (width: number = 10, height: number = 10, color: string = '#e5e7eb'): string => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};

/**
 * Helper function to get optimized image path
 * Converts image path to WebP version if available
 */
export const getOptimizedImagePath = (src: string, format: 'webp' | 'avif' = 'webp'): string => {
  if (src.startsWith('http')) return src;

  const extension = src.split('.').pop();
  const basePath = src.substring(0, src.lastIndexOf('.'));

  return `${basePath}.${format}`;
};

/**
 * Hook to detect WebP support
 */
export const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  return supportsWebP;
};

export default OptimizedImage;
