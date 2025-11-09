"use client";

import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import Image from 'next/image';
import './FallingSkillCards.css';

interface Skill {
  name: string;
  image: string;
}

interface FallingSkillCardsProps {
  skills: Skill[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  delay?: number; // Delay sebelum animasi falling dimulai (ms)
}

const FallingSkillCards: React.FC<FallingSkillCardsProps> = ({
  skills,
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.8,
  mouseConstraintStiffness = 0.9,
  delay = 2000 // Default 2 detik setelah cards muncul
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  // Set cards as loaded after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsLoaded(true);
    }, 500); // Cards muncul dulu
    return () => clearTimeout(timer);
  }, []);

  // Trigger falling effect after delay
  useEffect(() => {
    if (!cardsLoaded) return;

    if (trigger === 'auto') {
      const timer = setTimeout(() => {
        setEffectStarted(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setEffectStarted(true);
            }, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, cardsLoaded, delay]);

  // Matter.js physics simulation
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current || !cardsContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    // Timing untuk smooth animation
    engine.timing.timeScale = 1; // Normal speed
    engine.positionIterations = 10; // Tingkatkan untuk collision lebih akurat
    engine.velocityIterations = 8; // Tingkatkan untuk movement lebih smooth

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    // Boundaries - dinding tepat di tepi container agar card tidak tertutup
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const wallThickness = 50;
    const padding = 10; // Padding dari tepi container

    // Floor di bagian bawah container
    const floor = Bodies.rectangle(width / 2, height - padding, width, wallThickness, boundaryOptions);
    // Ceiling di bagian atas container
    const ceiling = Bodies.rectangle(width / 2, padding, width, wallThickness, boundaryOptions);
    // Left wall di sisi kiri
    const leftWall = Bodies.rectangle(padding, height / 2, wallThickness, height, boundaryOptions);
    // Right wall di sisi kanan
    const rightWall = Bodies.rectangle(width - padding, height / 2, wallThickness, height, boundaryOptions);

    // Create physics bodies for each card
    const cardElements = cardsContainerRef.current.querySelectorAll<HTMLDivElement>('.falling-skill-card');
    const cardBodies = Array.from(cardElements).map((elem, index) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      // Dapatkan ukuran card yang sebenarnya (fixed size)
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      const body = Bodies.rectangle(x, y, cardWidth, cardHeight, {
        render: { fillStyle: 'transparent' },
        restitution: 0.4, // Kurangi bouncing agar lebih smooth
        frictionAir: 0.05, // Tingkatkan air friction untuk gerakan lebih smooth
        friction: 0.5, // Tingkatkan friction agar tidak terlalu licin
        density: 0.03, // Kurangi density agar lebih ringan
        chamfer: { radius: 10 } // Rounded corners untuk collision lebih smooth
      });

      // Add random initial velocity yang lebih lembut
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5, // Kurangi kecepatan horizontal
        y: Math.random() * 1 // Kurangi kecepatan vertikal
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05); // Kurangi rotasi

      return { elem, body, cardWidth, cardHeight, initialIndex: index };
    });

    // Position elements absolutely dengan ukuran tetap
    cardBodies.forEach(({ elem, body, cardWidth, cardHeight }) => {
      elem.style.position = 'absolute';
      elem.style.width = `${cardWidth}px`;
      elem.style.height = `${cardHeight}px`;
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = 'translate(-50%, -50%)';
    });

    // Mouse interaction
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, ceiling, leftWall, rightWall, mouseConstraint, ...cardBodies.map(cb => cb.body)]);

    const runner = Runner.create({
      delta: 1000 / 60, // 60 FPS untuk smooth animation
      isFixed: true
    });
    Runner.run(runner, engine);
    Render.run(render);

    // Update loop dengan z-index dinamis dan interpolation untuk smooth movement
    let lastTime = performance.now();
    const updateLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Sort cards berdasarkan posisi Y (cards di bawah memiliki z-index lebih tinggi)
      const sortedBodies = [...cardBodies].sort((a, b) => b.body.position.y - a.body.position.y);

      sortedBodies.forEach(({ body, elem }, index) => {
        const { x, y } = body.position;

        // Smooth interpolation untuk posisi dan rotasi
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        elem.style.transition = 'none'; // Disable CSS transition untuk physics control

        // Z-index lebih tinggi untuk card yang lebih di bawah (menumpuk ke atas)
        elem.style.zIndex = `${1000 + index}`;
      });

      requestAnimationFrame(updateLoop);
    };
    requestAnimationFrame(updateLoop);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="falling-skills-container"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={cardsContainerRef}
        className={`falling-skills-grid ${cardsLoaded ? 'loaded' : ''}`}
      >
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="falling-skill-card"
            style={{
              animationDelay: `${index * 0.05}s`
            }}
          >
            <div className="card-inner">
              <Image
                src={skill.image}
                alt={`${skill.name} logo`}
                width={60}
                height={60}
                className="skill-logo"
                loading="lazy"
              />
              <p className="skill-name">{skill.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div ref={canvasContainerRef} className="falling-skills-canvas" />
    </div>
  );
};

export default FallingSkillCards;
