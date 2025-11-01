'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: string;
  showLoader?: boolean;
  loaderColor?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallback = '/assets/placeholder.webp',
  showLoader = true,
  loaderColor = 'from-emerald-500 to-blue-500',
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Loading Skeleton */}
      {isLoading && showLoader && (
        <div className={`absolute inset-0 bg-gradient-to-r ${loaderColor} animate-pulse rounded-lg`} />
      )}

      {/* Optimized Image */}
      <Image
        src={hasError ? fallback : src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        quality={90}
        {...props}
      />
    </div>
  );
};
