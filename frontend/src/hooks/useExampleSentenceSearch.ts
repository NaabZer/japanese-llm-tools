import { useState, useCallback } from 'react';
import { fetchExampleSentence } from '../api/exampleSentenceApi';
import type { SentenceData, Language } from '../types'; 

interface UseExampleSentenceSearchReturn {
  sentenceData: SentenceData | null;
  isLoading: boolean;
  error: string | null;
    searchSentence: (word: string, targetLanguage: Language) => Promise<void>; // Function to trigger the search
  clearResults: () => void; // Function to clear results and errors
}

export function useExampleSentenceSearch(): UseExampleSentenceSearchReturn {
  const [sentenceData, setSentenceData] = useState<SentenceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback memoizes the function, preventing unnecessary re-renders
  // and ensuring it's stable across component renders.
  const searchSentence = useCallback(async (word: string, targetLanguage: Language) => {
    setIsLoading(true);
    setError(null);
    setSentenceData(null); // Clear previous data before new search

    try {
      const result = await fetchExampleSentence(word, targetLanguage);
      setSentenceData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during search.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  const clearResults = useCallback(() => {
    setSentenceData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { sentenceData, isLoading, error, searchSentence, clearResults };
}
