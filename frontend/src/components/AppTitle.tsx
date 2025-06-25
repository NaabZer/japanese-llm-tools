// src/components/AppTitle.tsx
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './AppTitle.module.scss';
import HoverRadialFill from '../components/HoverRadialFill';

// Define props for the AppTitle component
interface AppTitleProps {
  onLanguageToggleClick: (x: number, y: number, w: number, h: number) => void; // Pass click coordinates
  isLanguageSelectorOpen: boolean; // New prop to indicate if modal is open
}

function AppTitle({ onLanguageToggleClick, isLanguageSelectorOpen }: AppTitleProps) {
  const titleLangRef = useRef<HTMLHeadingElement>(null); // Ref to the popup div
  const { targetLanguage } = useLanguage();
  const targetLangStr = targetLanguage === 'japanese' ? 'Japanese' : 'Swedish';
  const key = "AppTitle"+targetLangStr;

  const handleLanguageToggleAreaClick = () => {
    const {x, y, width, height} = titleLangRef.current.getBoundingClientRect();
    onLanguageToggleClick(x, y, width, height);
  };

  return (
    <motion.div
      className={styles.appTitle}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.3 }}
      layout
    >
      <HoverRadialFill 
        className={styles.languageToggleTextWrapper}
        onClick={handleLanguageToggleAreaClick} // Pass the click handler
        isActive={isLanguageSelectorOpen} // Tell HoverRadialFill if modal is open
        fillColor="var(--color-primary)"
        filledTextColor="#fff"
        activeFillColor="var(--color-primary)"
        duration={0.4}
      >
        <AnimatePresence mode='wait'>
          <h1
            onClick={onLanguageToggleClick}
            className={styles.languageToggleText}
            ref={titleLangRef}
          >
            {targetLangStr}
          </h1>
        </AnimatePresence>
      </HoverRadialFill>
      <h1>
        Sentence
      </h1>
      <h1>
        Generator
      </h1>
    </motion.div>
  );
}

export default AppTitle;
