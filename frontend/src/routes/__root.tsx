import React, {useState} from 'react';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'usehooks-ts'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { useExampleSentenceSearch } from '../hooks/useExampleSentenceSearch';
import SearchForm from '../components/SearchForm';
import ResultDisplay from '../components/ResultDisplay';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import AppTitle from '../components/AppTitle';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import '../App.scss';

function AppContent() {
  const { targetLanguage } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isLanguageSelectorShowing, setIsLanguageSelectorShowing] = useState(false);

  const { sentenceData, isLoading, error, searchSentence, clearResults } = useExampleSentenceSearch();


  const handleSearch = (word: string) => {
    searchSentence(word, targetLanguage);
  };

  const [clickAbsoluteOrigin, setClickAbsoluteOrigin] = useState<{ x: number; y: number, w: number, h:number } | null>(null);

  const handleLanguageToggleClick = (compX: number, compY: number, compW: number, compH: number) => {
    setClickAbsoluteOrigin({ x: compX, y: compY, w: compW, h: compH }); // Save absolute click position
    setShowLanguageSelector(true); // Open the modal
    setIsLanguageSelectorShowing(true);
  };

  const handleCloseLanguageSelector = () => {
    setShowLanguageSelector(false);
    setClickAbsoluteOrigin(null); // Clear origin on close
  };

  const placeholderText = targetLanguage === "japanese"? 'Enter a Japanese word (e.g., こんにちは)' : 'Enter a Swedish word (e.g., Hej)';

  const isDesktop = useMediaQuery('(min-width: 576px)')

  return (
    <div className="App">
      <Link to='/'> Sentences </Link>
      <AppTitle
        onLanguageToggleClick={handleLanguageToggleClick}
        isLanguageSelectorOpen={isDesktop ? isLanguageSelectorShowing : showLanguageSelector}
      />
      <ThemeToggle /> {/* Place the toggle here */}


      <div className='content-gutter'>
        <Outlet />
        <SearchForm 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          placeholder={placeholderText}
          buttonText='Get Example Sentence'
          buttonLoadingText='Generating...'
        />

        <ResultDisplay
          sentenceData={sentenceData}
          isLoading={isLoading}
          error={error}
        />

        <AnimatePresence>
          {showLanguageSelector && (
            <LanguageSelector 
              onClose={handleCloseLanguageSelector} 
              onSelect={() => clearResults()}
              onCompletelyClosed={() => setIsLanguageSelectorShowing(false)}
              absoluteOrigin={clickAbsoluteOrigin} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
//
// Wrapper component to provide the LanguageContext
function App() {
  return (
    <>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: App
})
