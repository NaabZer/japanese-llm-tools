import { createFileRoute } from '@tanstack/react-router'
import { useExampleSentenceSearch } from 'hooks/useExampleSentenceSearch';
import SearchForm from 'components/SearchForm';
import ResultDisplay from 'components/ResultDisplay';
import LanguageSelector from 'components/LanguageSelector';
import AppTitle from 'components/AppTitle';
import { LanguageProvider, useLanguage } from 'context/LanguageContext';
import 'src/App.scss';

export const Route = createFileRoute('/_input_type/sentences')({
  component: Sentences,
})

function Sentences() {
  const { targetLanguage } = useLanguage();

  const { sentenceData, isLoading, error, searchSentence, clearResults } = useExampleSentenceSearch();

  const handleSearch = (word: string) => {
    searchSentence(word, targetLanguage);
  };

  return (
    <>
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
    </>
  );
}
