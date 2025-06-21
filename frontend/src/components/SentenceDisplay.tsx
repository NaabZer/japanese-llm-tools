// src/components/SentenceDisplay.tsx
import React from 'react';
import type { SentenceData } from '../types';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remarkGfm (optional, but good practice)

interface SentenceDisplayProps {
  sentenceData: SentenceData | null;
}

function SentenceDisplay({ sentenceData }: SentenceDisplayProps) {
  if (!sentenceData) {
    return null;
  }

  return (
    <div className="result-box">
      <h3>Example Sentence:</h3>
      <div>
        <strong>Japanese:</strong>{' '}
          <div class='hidden-punct'>。
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {sentenceData.japanese}
          </ReactMarkdown>
        </div>
        <div>
          <strong>English:</strong>{' '}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {sentenceData.english}
            </ReactMarkdown>
          </div>
        </div>
      );
}

export default SentenceDisplay;
