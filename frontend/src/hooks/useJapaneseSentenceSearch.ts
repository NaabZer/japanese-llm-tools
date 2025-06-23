import { useState, useCallback } from 'react';
import { fetchJapaneseSentence } from '../api/japaneseSentenceApi';
import type { SentenceData } from '../types'; 

interface UseJapaneseSentenceSearchReturn {
  sentenceData: SentenceData | null;
  isLoading: boolean;
  error: string | null;
  searchSentence: (word: string) => Promise<void>; // Function to trigger the search
  clearResults: () => void; // Function to clear results and errors
}

export function useJapaneseSentenceSearch(): UseJapaneseSentenceSearchReturn {
  const [sentenceData, setSentenceData] = useState<SentenceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback memoizes the function, preventing unnecessary re-renders
  // and ensuring it's stable across component renders.
  const searchSentence = useCallback(async (word: string) => {
    setIsLoading(true);
    setError(null);
    setSentenceData(null); // Clear previous data before new search

    try {
      const result = await fetchJapaneseSentence(word);
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
