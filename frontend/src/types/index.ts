// src/types/index.ts

// This interface defines the structure of the data we want to use in our components
// after processing the API response.
export interface SentenceData {
  japanese: string;
  english: string;
}

export interface JapaneseApiResponse {
  target_word: string;
  target_sentence: string;
  translated_sentence: string;
}
