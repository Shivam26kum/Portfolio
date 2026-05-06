import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Smooth spring physics for the "Liquid" feel
  const config = { stiffness: 150, damping: 20, mass: 0.5 };
  const mouseX = useSpring(0, config);
  const mouseY = useSpring(0, config);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      // Detect clickable elements to trigger blob expansion
      const isClickable = target.closest('button, a, input, textarea, select, .group, [class*="swiper-button"]') || 
                          window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    // Z-index lowered so it stays BEHIND the actual system cursor
    <div className="fixed inset-0 pointer-events-none z-[99] hidden md:block">
      
      {/* 1. The Dynamic "Blob" Trailer */}
      <motion.div
        className="absolute top-0 left-0 rounded-full blur-[2px]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          // Using a softer gradient for a professional trailer look
          background: isHovered 
            ? `radial-gradient(circle, var(--accent) 0%, transparent 80%)`
            : `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
          opacity: isHovered ? 0.6 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      {/* 2. Optional: Subtle "Ghost" Speed Trail */}
      <motion.div
        className="absolute top-0 left-0 w-3 h-3 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--accent)',
          filter: 'blur(10px)',
          opacity: 0.6
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </div>
  );
};

export default Cursor;