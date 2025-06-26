import React, {useState} from 'react';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'usehooks-ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { useExampleSentenceSearch } from 'hooks/useExampleSentenceSearch';
import SearchForm from 'components/SearchForm';
import ResultDisplay from 'components/ResultDisplay';
import LanguageSelector from 'components/LanguageSelector';
import AppTitle from 'components/AppTitle';
import { useLanguage } from 'context/LanguageContext';
import 'src/App.scss';

export const Route = createFileRoute('/_input_type')({
  component: InputTypeComponent,
})

function InputTypeComponent() {
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
    <>
      <AppTitle
        onLanguageToggleClick={handleLanguageToggleClick}
        isLanguageSelectorOpen={isDesktop ? isLanguageSelectorShowing : showLanguageSelector}
      />

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
    </>
  );
}
