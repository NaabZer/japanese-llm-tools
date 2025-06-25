// src/components/LanguageSelector.tsx
import React, {useRef} from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, cubicBezier } from 'motion/react';
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
];

function LanguageSelectorMobile({ onClose, onSelect, onCompletelyClosed, absoluteOrigin }: LanguageSelectorProps) {
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

  const popupVariants = {
    hidden: {
      clipPath: "circle(0 at 50% -10%)",
    },
    visible: {
      clipPath: "circle(140% at 50% -10%)",
      transition: {
        ease: [.23,1.16,.58,.47],
        duration: 0.6,
        staggerChildren: 0.05,
        when: 'beforeChildren'
      },
    },
    exit: {
      clipPath: "circle(0 at 50% -10%)",
      transition: {
        ease: [0.42, 0.53, 0.77, -0.16],
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
        delay: 0.1
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
        type: 'spring',
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        type: 'spring',
        duration: 0.4,
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
          <motion.button 
            variants={popupVariantsInner}
            className={styles.closeButton}
            onClick={handleClose}
          >
            &times;
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default LanguageSelectorMobile;
