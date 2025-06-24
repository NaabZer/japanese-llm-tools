import React, { useRef, useState } from 'react';
import type { SentenceData } from '../types';
import SentenceDisplay from './SentenceDisplay';
import styles from './ResultDisplay.module.scss';
import { motion } from 'motion/react';

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
    return <p key='loading' className={styles.loadingMessage}>Loading example sentence...</p>;
  }

  if (error) {
    return <p key='error' className={styles.errorMessage}>{error}</p>;
  }

  if (sentenceData) {
    return <SentenceDisplay key= 'sentence' sentenceData={sentenceData} />;
  }

  return <p key='inital' className={styles.initialMessage}>Enter a word and click "Get Example Sentence" to begin.</p>;
};


function ResultDisplay(props: ResultDisplayProps) { // Pass all props to the component
  const myElementRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number | null>(null);

  let key = 'inital';
  if(props.isLoading) {
    key = 'loading';
  } else if(props.error) {
    key = 'error';
  } else if(props.sentenceData) {
    key = 'sentence';
  }
  const contentVariants = {
    initial: {height: height},
    animate: {height: 'auto'},
  };

  const setCurrentHeight = () => {
    if (myElementRef.current) {
      // Access the DOM element via .current and get its offsetHeight
      const measuredHeight = myElementRef.current.offsetHeight;
      setHeight(measuredHeight);
      console.log('Measured height:', measuredHeight, 'px');
    }
  };

  return (
    <div
      className={styles.resultContainer}
    >
      <motion.div 
        ref={myElementRef}
        key={key}
        className={styles.resultInner}
        layout // <--- Tell Framer Motion to animate layout changes (including height)
        initial="initial" // Apply initial state from variants
        animate="animate" // Apply animate state from variants
        variants={contentVariants} // Use the variants defined above
        transition={{ type: "spring", stiffness: 400, damping: 30 }} // Transition for layout and opacity
        onAnimationComplete={setCurrentHeight}
      >
        {renderContent(props)} {/* Call the helper function with all props */}
      </motion.div>
    </div>
  );
}

export default ResultDisplay;
