// src/components/AppTitle.tsx
import React from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage hook
import styles from './AppTitle.module.scss'; // Create this SCSS module

// Define props for the AppTitle component
interface AppTitleProps {
  onLanguageToggleClick: () => void; // Callback for when the language text is clicked
}

function AppTitle({ onLanguageToggleClick }: AppTitleProps) {
  const { targetLanguage } = useLanguage(); // Get the current target language from context

  return (
    <motion.h1
      className={styles.appTitle} // Apply module SCSS class
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      <span
        onClick={onLanguageToggleClick} // Use the passed-in callback
        className={styles.languageToggleText} // Apply module SCSS class
      >
        {targetLanguage === 'japanese' ? 'Japanese' : 'Swedish'}
      </span>{' '}
      Sentence Generator
    </motion.h1>
  );
}

export default AppTitle;
