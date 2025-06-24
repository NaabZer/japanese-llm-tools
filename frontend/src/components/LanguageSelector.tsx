// src/components/LanguageSelector.tsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types';
import styles from './LanguageSelector.module.scss'; // Create this SCSS module

interface LanguageSelectorProps {
  onClose: () => void; // Callback to close the popup
  onClick: () => void;
}

const availableLanguages: { id: Language; name: string }[] = [
  { id: 'japanese', name: 'Japanese' },
  { id: 'swedish', name: 'Swedish' },
  // Add more languages here as needed
];

function LanguageSelector({ onClose, onClick }: LanguageSelectorProps) {
  const { targetLanguage, setTargetLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setTargetLanguage(lang);
    onClick();
    onClose(); // Close the popup after selection
  };

  return (
    <div className={styles.overlay} onClick={onClose}> {/* Click overlay to close */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <h3>Select Target Language</h3>
        <div className={styles.languageList}>
          {availableLanguages.map((lang) => (
            <button
              key={lang.id}
              className={`${styles.languageButton} ${targetLanguage === lang.id ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.id)}
            >
              {lang.name}
            </button>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* HTML entity for multiplication sign (a common close icon) */}
        </button>
      </div>
    </div>
  );
}

export default LanguageSelector;
