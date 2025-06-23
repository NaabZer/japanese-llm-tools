import React from 'react';
import type { SentenceData } from '../types';
import SentenceDisplay from './SentenceDisplay';
import styles from './ResultDisplay.module.scss';

interface ResultDisplayProps {
  sentenceData: SentenceData | null;
  isLoading: boolean;
  error: string | null;
  // Add more potential props here, e.g.:
  // otherResultData: OtherDataType | null;
  // anotherState: boolean;
}

const renderContent = (props: ResultDisplayProps) => {
  const { sentenceData, isLoading, error } = props;

  if (isLoading) {
    return <p className={styles.loadingMessage}>Loading example sentence...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  if (sentenceData) {
    return <SentenceDisplay sentenceData={sentenceData} />;
  }

  return <p className={styles.initialMessage}>Enter a word and click "Get Example Sentence" to begin.</p>;
};


function ResultDisplay(props: ResultDisplayProps) { // Pass all props to the component
  return (
    <div className={styles.resultContainer}>
      {renderContent(props)} {/* Call the helper function with all props */}
    </div>
  );
}

export default ResultDisplay;
