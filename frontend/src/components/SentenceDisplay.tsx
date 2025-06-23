// src/components/SentenceDisplay.tsx
import type { SentenceData } from '../types';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remarkGfm (optional, but good practice)
import styles from './SentenceDisplay.module.scss';

interface SentenceDisplayProps {
  sentenceData: SentenceData | null;
}

function SentenceDisplay({ sentenceData }: SentenceDisplayProps) {
  if (!sentenceData) {
    return null;
  }
  const customComponents = {
    // Map the 'strong' Markdown element to the 'b' HTML tag
    strong: ({ node, ...props }: any) => <b {...props} />,
    // You can add other mappings here if needed, e.g., for emphasis (italics)
    // em: ({ node, ...props }: any) => <i {...props} />,
  };

  return (
    <div>
      <h3>Example Sentence:</h3>
      <div className={styles.sentEntry}>
        <strong>Japanese:</strong>{' '}
        <div className={styles.hiddenPunct}>。</div>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={customComponents}
        >
          {sentenceData.japanese}
        </ReactMarkdown>
      </div>
      <div className={styles.sentEntry}>
        <strong>English:</strong>{' '}
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={customComponents}
        >
          {sentenceData.english}
        </ReactMarkdown>
        </div>
      </div>
      );
}

export default SentenceDisplay;
