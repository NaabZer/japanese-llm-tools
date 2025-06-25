// src/components/HoverRadialFill.tsx
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import styles from './HoverRadialFill.module.scss';

interface HoverRadialFillProps {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
  duration?: number;
  filledTextColor?: string;
  // New: Callback for click event, passing mouse coordinates
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  // New: Boolean to indicate if the fill should stay active (e.g., when modal opens)
  isActive?: boolean;
  // New: Color to transition to when active/clicked
  activeFillColor?: string;
}

function HoverRadialFill({
  children,
  className,
  fillColor = 'var(--color-primary)',
  duration = 0.5,
  filledTextColor = 'var(--color-background)',
  onClick,
  isActive = false, // Default to not active
  activeFillColor = 'var(--color-primary)', // Default to background color
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
      onClick={onClick}
      // Set CSS variables for the gradient origin and fill color
      style={{
        '--mouse-x': `${mousePosition.x * 100}%`,
        '--mouse-y': `${mousePosition.y * 100}%`,
        '--fill-color': fillColor,
        '--filled-text-color': filledTextColor,
        '--active-fill-color': activeFillColor, // New CSS variable for active state
      } as React.CSSProperties}

      // Animate the gradient size on hover AND when active
      initial={{ '--gradient-size': '0%' }}
      whileHover={{ '--gradient-size': '200%' }}
      // When isActive is true, set gradient-size to 1000% and change fill color
      animate={isActive ? { '--gradient-size': '100%', '--fill-color': 'var(--active-fill-color)' } : {}}
      transition={{ duration: duration, ease: "easeOut" }}
    >
      <div className={styles.contentDefault}>
        {children}
      </div>
      <div className={styles.contentFilled}>
        {children}
      </div>
    </motion.div>
  );
}

export default HoverRadialFill;
