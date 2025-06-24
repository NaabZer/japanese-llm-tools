// src/components/HoverRadialFill.tsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HoverRadialFill.module.scss';

interface HoverRadialFillProps {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
  duration?: number;
  // New: Color for the text when it's "filled"
  filledTextColor?: string;
}

function HoverRadialFill({
  children,
  className,
  fillColor = 'var(--color-primary)',
  duration = 0.5,
  filledTextColor = 'var(--color-background)', // Default to background color for contrast
}: HoverRadialFillProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.radialFillContainer} ${className || ''}`}
      onMouseMove={handleMouseMove}
      // Set CSS variables for the gradient origin and fill color
      style={{
        '--mouse-x': `${mousePosition.x * 100}%`,
        '--mouse-y': `${mousePosition.y * 100}%`,
        '--fill-color': fillColor,
        '--filled-text-color': filledTextColor, // Pass filled text color as a CSS variable
      } as React.CSSProperties}

      // Animate the gradient size on hover
      initial={{ '--gradient-size': '0%' }}
      whileHover={{ '--gradient-size': '200%' }}
      transition={{ duration: duration, ease: "easeOut" }}
    >
      {/* Layer 1: The default text content */}
      <div className={styles.contentDefault}>
        {children}
      </div>

      {/* Layer 2: The text content that will be "filled" and change color */}
      <div className={styles.contentFilled}>
        {children}
      </div>
    </motion.div>
  );
}

export default HoverRadialFill;
