import { useEffect, useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, Figma, FileText } from 'lucide-react';
import type { Project } from '../../types';
import './Carousel.css';

export interface CarouselProps {
  items: Project[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  language?: 'en' | 'id';
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function Carousel({
  items,
  baseWidth = 400,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  language = 'en'
}: CarouselProps): React.JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? 'round' : ''}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
            <motion.div
              key={index}
              className={`carousel-item ${round ? 'round' : ''}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : 'auto',
                ...(round && { borderRadius: '50%' })
              }}
              transition={effectiveTransition}
            >
              {/* Project Image */}
              <div className="carousel-item-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="carousel-item-content">
                <h3 className="carousel-item-title">{item.title}</h3>
                <p className="carousel-item-description">
                  {language === 'en' ? item.description : (item.descriptionId || item.description)}
                </p>

                {/* Tech Stack */}
                {item.techStack && (
                  <div className="carousel-tech-stack">
                    {item.techStack.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                    {item.techStack.length > 3 && (
                      <span className="tech-badge-more">
                        +{item.techStack.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Links */}
                <div className="carousel-item-actions">
                  {item.links.demo && (
                    <a
                      href={item.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link action-link-demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {item.links.prototype && (
                    <a
                      href={item.links.prototype}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link action-link-prototype"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Figma size={16} />
                    </a>
                  )}
                  {item.links.github && (
                    <a
                      href={item.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link action-link-github"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {item.links.needToKnow && (
                    <a
                      href={item.links.needToKnow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link action-link-docs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
        ))}
      </motion.div>

      {/* Indicators */}
      <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${currentIndex % items.length === index ? 'active' : 'inactive'}`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
