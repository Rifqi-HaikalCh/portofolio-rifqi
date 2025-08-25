'use client';

import { useState, useEffect } from 'react';

interface DeviceSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useDeviceSize = (): DeviceSize => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateDeviceSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Set initial size
    updateDeviceSize();

    // Add event listener
    window.addEventListener('resize', updateDeviceSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateDeviceSize);
  }, []);

  return deviceSize;
};