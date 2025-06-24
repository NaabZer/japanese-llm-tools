import React, {useState} from 'react';
import { useExampleSentenceSearch } from './hooks/useExampleSentenceSearch';
import SearchForm from './components/SearchForm';
import ResultDisplay from './components/ResultDisplay';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import AppTitle from './components/AppTitle'; // Import the new AppTitle component
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './App.scss';

function AppContent() {
  const { targetLanguage } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const { sentenceData, isLoading, error, searchSentence, clearResults } = useExampleSentenceSearch();

  const handleSearch = (word: string) => {
    searchSentence(word, targetLanguage);
  };

  const placeholderText = targetLanguage === "japanese"? 'Enter a Japanese word (e.g., こんにちは)' : 'Enter a Swedish word (e.g., Hej)';

  return (
    <div className="App">
      {/* Make the "Japanese" word clickable */}
      <AppTitle onLanguageToggleClick={() => setShowLanguageSelector(true)} />
      <ThemeToggle /> {/* Place the toggle here */}


      <div className='content-gutter'>
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

      {showLanguageSelector && (
        <LanguageSelector 
          onClose={() => setShowLanguageSelector(false)} 
          onClick={() => clearResults()}
        />
      )}
      </div>
    </div>
  );
}
//
// Wrapper component to provide the LanguageContext
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
