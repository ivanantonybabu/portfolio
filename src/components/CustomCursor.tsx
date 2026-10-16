import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop/laptop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive-hover') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full border border-white mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 18),
          y: mousePosition.y - (isHovered ? 28 : 18),
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Center Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-white mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          width: isHovered ? 6 : 6,
          height: isHovered ? 6 : 6,
        }}
        transition={{
          type: 'spring',
          damping: 45,
          stiffness: 450,
          mass: 0.1,
        }}
      />
    </>
  );
};
