// src/App.tsx
import { useState } from 'react';
import { fetchJapaneseSentence } from './api/japaneseSentenceApi'; // Import the new API function
import SentenceDisplay from './components/SentenceDisplay';
import type { SentenceData } from './types'; // Import TEST_VALUE here
import './App.css';

function App() {
  const [word, setWord] = useState<string>('');
  const [sentenceData, setSentenceData] = useState<SentenceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!word.trim()) {
      setError('Please enter a Japanese word.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSentenceData(null); // Clear previous data

    try {
      // Call our new, centralized API function!
      const result = await fetchJapaneseSentence(word);
      setSentenceData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error('Error fetching sentence in App component:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Japanese Word Lookup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Japanese word (e.g., こんにちは)"
          value={word}
          onChange={handleWordChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Get Example Sentence'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

    {isLoading && <p className="loading-message">Loading example sentence...</p>}

    <SentenceDisplay sentenceData={sentenceData} />
  </div>
  );
}

export default App;
