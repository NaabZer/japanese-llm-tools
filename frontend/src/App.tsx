import React from 'react';
import { useJapaneseSentenceSearch } from './hooks/useJapaneseSentenceSearch'; // Import the custom hook
import SearchForm from './components/SearchForm'; // Import the new SearchForm component
import ResultDisplay from './components/ResultDisplay'; // Import the new ResultDisplay component
import './App.scss';

function App() {
  const { sentenceData, isLoading, error, searchSentence, clearResults } = useJapaneseSentenceSearch();

  const handleSearch = (word: string) => {
    searchSentence(word);
  };

  return (
    <div className="App">
      <h1>Japanese Sentence Generator</h1>

      <div className='content-gutter'>
        <SearchForm 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          placeholder='Enter a Japanese word (e.g., こんにちは)'
          buttonText='Get Example Sentence'
          buttonLoadingText='Generating...'
        />


        <ResultDisplay
          sentenceData={sentenceData}
          isLoading={isLoading}
          error={error}
        />

        {/* Optional: Add a clear button if you want to reset the display */}
        {(sentenceData || error) && (
          <button onClick={clearResults} disabled={isLoading}>
            Clear Results
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
