// src/components/LanguageSelector.tsx
import React, {useRef} from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import type { Language } from '../types';
import styles from './LanguageSelector.module.scss'; // Create this SCSS module

interface LanguageSelectorProps {
  onClose: () => void;
  onSelect: () => void;
  onCompletelyClosed: () => void;
  absoluteOrigin: { x: number; y: number, w: number, h:number } | null;
}

const availableLanguages: { id: Language; name: string }[] = [
  { id: 'japanese', name: 'Japanese' },
  { id: 'swedish', name: 'Swedish' },
  // Add more languages here as needed
];

function LanguageSelector({ onClose, onSelect, onCompletelyClosed, absoluteOrigin }: LanguageSelectorProps) {
  const { targetLanguage, setTargetLanguage } = useLanguage();

  const popupRef = useRef<HTMLDivElement>(null); // Ref to the popup div

  const handleClose = () => {
    onClose();
    onSelect();
  }

  const handleLanguageChange = (lang: Language) => {
    setTargetLanguage(lang);
    handleClose();
  };

  const handleOnAnimationEnd = (state: str) => {
    if(state === 'exit'){
      onCompletelyClosed();
    }
  }

  const rTop = absoluteOrigin.y; 
  const rRight = absoluteOrigin.x + absoluteOrigin.w; 
  const rBot = absoluteOrigin.y + absoluteOrigin.h; 
  const rLeft = absoluteOrigin.x; 

// Define animation variants for the popup
  const popupVariants = {
    hidden: {
      clipPath: `rect(${rTop}px ${rRight}px ${rBot}px ${rLeft}px round 16px)`,
    },
    visible: {
      clipPath: 'rect(0px 100% 100% 0px)',
      transition: {
        type: "ease-in",
        duration: 0.3,
        staggerChildren: 0.05,
        when: 'beforeChildren'
      },
    },
    exit: {
      clipPath: `rect(${rTop}px ${rRight}px ${rBot}px ${rLeft}px round 16px)`,
      transition: {
        type: "ease-out",
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };

  const popupVariantsInner = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={styles.overlay}
      onClick={handleClose}
      initial={{backgroundColor: 'rgba(0,0,0,0)'}}
      animate={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      exit={{backgroundColor: 'rgba(0,0,0,0)'}}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={popupRef} // Attach ref to the popup div
        className={styles.popup}
        onClick={(e) => e.stopPropagation()}
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          position: 'fixed', 
        }}
        layout
        onAnimationComplete={handleOnAnimationEnd}
      >
        <motion.div
          className={styles.popupContent}
        >
          <motion.div
            variants={popupVariantsInner}
          >
            <h1>Select Target Language</h1>
          </motion.div>
          {availableLanguages.map((lang) => (
            <motion.div
              key={lang.id}
              variants={popupVariantsInner}
              className={`${styles.languageButton} ${targetLanguage === lang.id ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.id)}
            >
              <h2>
                {lang.name}
              </h2>
            </motion.div>
          ))}
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default LanguageSelector;
