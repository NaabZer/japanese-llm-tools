import React, { useState } from 'react';
import styles from './SearchForm.module.scss';
import { motion } from 'motion/react';

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
    <motion.form
      initial={{opacity: 0, y: -50 }}
      animate={{opacity: 1, y: 0}}
      transition={{ type: "spring" , bounce: 0.3, delay: 0.05}}
      onSubmit={handleSubmit}
      className={styles.searchForm}
    >
      <input
        className={styles.formInput}
        type="text"
        placeholder={placeholder}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        disabled={isLoading} // Disable input while loading
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? buttonLoadingText : buttonText}
      </button>
    </motion.form>
  );
}

export default SearchForm;
