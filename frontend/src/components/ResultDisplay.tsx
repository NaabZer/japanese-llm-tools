import React from 'react';
import type { SentenceData } from '../types';
import SentenceDisplay from './SentenceDisplay'; // Re-use your existing SentenceDisplay

interface ResultDisplayProps {
  sentenceData: SentenceData | null;
  isLoading: boolean;
  error: string | null;
}

function ResultDisplay({ sentenceData, isLoading, error }: ResultDisplayProps) {
  if (isLoading) {
    return <p className="loading-message">Loading example sentence...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (sentenceData) {
    return <SentenceDisplay sentenceData={sentenceData} />;
  }

  // Default message when nothing is loaded yet
  return <p>Enter a word and click "Get Example Sentence" to begin.</p>;
}

export default ResultDisplay;
