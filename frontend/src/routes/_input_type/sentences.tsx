import { createFileRoute } from '@tanstack/react-router'
import { useExampleSentenceSearch } from 'hooks/useExampleSentenceSearch';
import SearchForm from 'components/SearchForm';
import ResultDisplay from 'components/ResultDisplay';
import { useLanguage } from 'context/LanguageContext';

export const Route = createFileRoute('/_input_type/sentences')({
  component: Sentences,
})

function Sentences() {
  const { targetLanguage } = useLanguage();

  const { sentenceData, isLoading, error, searchSentence } = useExampleSentenceSearch();

  const placeholderText = targetLanguage === "japanese"? 'Enter a Japanese word (e.g., こんにちは)' : 'Enter a Swedish word (e.g., Hej)';


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
    </>
  );
}
