import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (word: string) => void; 
  isLoading: boolean;
  placeholder: string;
  buttonText: string;
  initialWord?: string;
}

function SearchForm({ 
  onSearch, 
  isLoading, 
  placeholder = 'Input Text',
  buttonText = 'Press Me',
  buttonLoadingText = 'Loding..',
  initialWord = '' }: SearchFormProps) {
  const [word, setWord] = useState<string>(initialWord);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (word.trim()) {
      onSearch(word.trim()); // Call the passed-in search function
    } else {
      // You could add local validation feedback here if needed
      console.warn('Please enter a word to search.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        disabled={isLoading} // Disable input while loading
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? buttonLoadingText : buttonText}
      </button>
    </form>
  );
}

export default SearchForm;
