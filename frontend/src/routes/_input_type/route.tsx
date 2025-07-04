import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { useMediaQuery } from 'usehooks-ts'
import { createFileRoute, Outlet, useNavigate, useRouter } from '@tanstack/react-router'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import { useExampleSentenceSearch } from 'hooks/useExampleSentenceSearch';
import LanguageSelector from 'components/LanguageSelector';
import AppTitle from 'components/AppTitle';

const inputSearchSchema = z.object({
  ShowLangSelect: fallback(z.boolean(), false).default(false)
})

export const Route = createFileRoute('/_input_type')({
  component: InputTypeComponent,
  validateSearch: zodValidator(inputSearchSchema)
})


function InputTypeComponent() {
  const [isLanguageSelectorShowing, setIsLanguageSelectorShowing] = useState(false);

  const { clearResults } = useExampleSentenceSearch();

  // TODO: Make into a hook or something
  const [clickAbsoluteOrigin, setClickAbsoluteOrigin] = useState<{ x: number; y: number, w: number, h:number } | null>(null);

  const isDesktop = useMediaQuery('(min-width: 576px)')

  const { ShowLangSelect } = Route.useSearch();
  const navigate = useNavigate({from: Route.fullPath});
  const router = useRouter();

  const handleLanguageToggleClick = useCallback((compX: number, compY: number, compW: number, compH: number) => {
    setClickAbsoluteOrigin({ x: compX, y: compY, w: compW, h: compH }); // Save absolute click position
    navigate({
      search: (prev) => ({...prev, ShowLangSelect: true}),
    })
    setIsLanguageSelectorShowing(true);
  }, [navigate]);

  const handleCloseLanguageSelector = useCallback(() => {
    router.history.back();
    //navigate({
    //  history: 'back'
    //})
  }, [router]);

  const handleModalCompletelyClosed = useCallback(() => {
    setIsLanguageSelectorShowing(false);
    //setClickAbsoluteOrigin(null); // Clear origin on close
  }, []);

  return (
    <>
      <AppTitle
        onLanguageToggleClick={handleLanguageToggleClick}
        isLanguageSelectorOpen={isDesktop ? isLanguageSelectorShowing : ShowLangSelect}
      />
      <AnimatePresence>
        {ShowLangSelect && (
          <LanguageSelector 
            onClose={handleCloseLanguageSelector} 
            onSelect={clearResults}
            onCompletelyClosed={handleModalCompletelyClosed}
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
