import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  targetLanguage: Language;
  setTargetLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // State to hold the current target language
  const [targetLanguage, setTargetLanguage] = useState<Language>('japanese'); // Default to Japanese

  // Memoize the setTargetLanguage function for stability
  const memoizedSetTargetLanguage = useCallback((lang: Language) => {
    setTargetLanguage(lang);
  }, []);

  const contextValue = {
    targetLanguage,
    setTargetLanguage: memoizedSetTargetLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to easily consume the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
