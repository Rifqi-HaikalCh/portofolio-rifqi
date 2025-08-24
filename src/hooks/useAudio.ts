"use client";

import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseAudioOptions {
  volume?: number;
  loop?: boolean;
  preload?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  onEnded?: () => void;
}

export interface UseAudioReturn {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  isLoaded: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  error: string | null;
}

export const useAudio = (src: string, options: UseAudioOptions = {}): UseAudioReturn => {
  const {
    volume: initialVolume = 0.7,
    loop = false,
    preload = true,
    onLoad,
    onError,
    onEnded
  } = options;

  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeUpdateInterval = useRef<NodeJS.Timeout>();

  // Initialize audio element
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Create audio element
        audioRef.current = new Audio(src);
        audioRef.current.preload = preload ? 'auto' : 'none';
        audioRef.current.loop = loop;
        audioRef.current.volume = volume;

        // Event handlers
        const handleLoadedData = () => {
          setIsLoaded(true);
          setDuration(audioRef.current?.duration || 0);
          setError(null);
          onLoad?.();
        };

        const handleError = (e: Event) => {
          const errorMessage = `Failed to load audio: ${src}`;
          setError(errorMessage);
          setIsLoaded(false);
          console.warn(errorMessage);
          onError?.();
        };

        const handleEnded = () => {
          setIsPlaying(false);
          setCurrentTime(0);
          onEnded?.();
        };

        const handleTimeUpdate = () => {
          setCurrentTime(audioRef.current?.currentTime || 0);
        };

        // Add event listeners
        audioRef.current.addEventListener('loadeddata', handleLoadedData);
        audioRef.current.addEventListener('error', handleError);
        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener('loadeddata', handleLoadedData);
            audioRef.current.removeEventListener('error', handleError);
            audioRef.current.removeEventListener('ended', handleEnded);
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          }
        };
      } catch (err) {
        setError(`Audio initialization failed: ${err}`);
        setIsLoaded(false);
      }
    };

    initializeAudio();

    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, loop, preload, volume, onLoad, onError, onEnded]);

  // Play function with error handling
  const play = useCallback(async (): Promise<void> => {
    if (!audioRef.current || !isLoaded) {
      console.warn('Audio not ready for playback');
      return;
    }

    try {
      // Reset to beginning if at end
      if (audioRef.current.ended) {
        audioRef.current.currentTime = 0;
      }

      await audioRef.current.play();
      setIsPlaying(true);
      setError(null);

      // Start time updates
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
      timeUpdateInterval.current = setInterval(() => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      }, 100);

    } catch (err) {
      const errorMessage = `Playback failed: ${err}`;
      setError(errorMessage);
      setIsPlaying(false);
      
      // Handle autoplay restrictions gracefully
      if (err instanceof Error && err.name === 'NotAllowedError') {
        console.info('Audio playback prevented by browser policy - user interaction required');
      } else {
        console.error(errorMessage);
      }
    }
  }, [isLoaded]);

  // Pause function
  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    }
  }, [isPlaying]);

  // Stop function
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    }
  }, []);

  // Volume control
  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clampedVolume;
    }
  }, [isMuted]);

  // Mute control
  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume]);

  return {
    play,
    pause,
    stop,
    setVolume,
    setMuted,
    isLoaded,
    isPlaying,
    isMuted,
    volume,
    duration,
    currentTime,
    error
  };
};

export default useAudio;