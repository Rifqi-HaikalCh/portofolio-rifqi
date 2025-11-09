"use client";
import { useEffect, useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60, // Reduced from 120 for better performance
        interactivity: {
          events: {
            onClick: {
              enable: false, // Disabled for performance
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab", // Changed from repulse (less CPU intensive)
            },
            resize: {
              enable: true,
              delay: 0.5 // Debounce resize
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5
              }
            },
          },
        },
        particles: {
          color: {
            value: "#10B981",
          },
          links: {
            color: "#10B981",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out", // Changed from bounce for performance
            },
            random: false,
            speed: 0.8, // Slightly reduced for smoother performance
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Increased area = fewer particles
            },
            value: 40, // Reduced from 80 for 50% performance improvement
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;