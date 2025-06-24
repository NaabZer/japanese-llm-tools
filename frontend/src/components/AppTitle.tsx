// src/components/AppTitle.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion for animations
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage hook
import styles from './AppTitle.module.scss'; // Create this SCSS module

// Define props for the AppTitle component
interface AppTitleProps {
  onLanguageToggleClick: () => void; // Callback for when the language text is clicked
}

function AppTitle({ onLanguageToggleClick }: AppTitleProps) {
  const { targetLanguage } = useLanguage();
  const targetLangStr = targetLanguage === 'japanese' ? 'Japanese' : 'Swedish';
  const key = "AppTitle"+targetLangStr;

  return (
    <motion.div
      className={styles.appTitle}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.3 }}
      layout
    >
      <AnimatePresence mode='wait'>
        <motion.h1
          onClick={onLanguageToggleClick}
          className={styles.languageToggleText}
          initial={{ opacity: 0, y: '-50px' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '50px' }}
          key={key}
        >
          {targetLangStr}
        </motion.h1>
      </AnimatePresence>
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
