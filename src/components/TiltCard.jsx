import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0); 
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden group"
      >
        {children}
        
        {/* Safe dynamic gradient background for the shine effect */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            translateX: useTransform(xSpring, [-0.5, 0.5], ["100px", "-100px"]),
            translateY: useTransform(ySpring, [-0.5, 0.5], ["100px", "-100px"]),
            opacity: isHovered ? 0.3 : 0,
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)'
          }}
          className="absolute -inset-10 blur-2xl group-hover:block transition-opacity pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;