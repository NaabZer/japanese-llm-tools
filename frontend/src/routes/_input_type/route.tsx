import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'usehooks-ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { useExampleSentenceSearch } from 'hooks/useExampleSentenceSearch';
import LanguageSelector from 'components/LanguageSelector';
import AppTitle from 'components/AppTitle';

export const Route = createFileRoute('/_input_type')({
  component: InputTypeComponent,
})


function InputTypeComponent() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isLanguageSelectorShowing, setIsLanguageSelectorShowing] = useState(false);

  const { clearResults } = useExampleSentenceSearch();

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

  const isDesktop = useMediaQuery('(min-width: 576px)')

  return (
    <>
      <AppTitle
        onLanguageToggleClick={handleLanguageToggleClick}
        isLanguageSelectorOpen={isDesktop ? isLanguageSelectorShowing : showLanguageSelector}
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

      <div className='content-gutter'>
        <Outlet />
      </div>
    </>
  );
}
