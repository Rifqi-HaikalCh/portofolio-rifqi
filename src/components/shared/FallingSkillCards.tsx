"use client";

import { useRef, useState, useEffect } from 'react';
import Matter, { Bodies } from 'matter-js';
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

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

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

    // Boundaries - positioned to keep cards within safe zone
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    // Floor positioned to prevent cards from falling too far and colliding with next section
    const floor = Bodies.rectangle(width / 2, height + 80, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2 + 40, 50, height * 1.8, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2 + 40, 50, height * 1.8, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // Create physics bodies for each card
    const cardElements = cardsContainerRef.current.querySelectorAll<HTMLDivElement>('.falling-skill-card');
    const cardBodies = Array.from(cardElements).map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });

    cardBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...cardBodies.map(cb => cb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      cardBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

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
