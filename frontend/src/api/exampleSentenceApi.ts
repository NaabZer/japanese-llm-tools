// src/api/japaneseSentenceApi.ts

import type { SentenceApiResponse, SentenceData, Language} from '../types/index';

// Get the API base URL from environment variables
// Ensure VITE_JAPANESE_API_URL is set in your .env.local file
const API_BASE_URL: string = import.meta.env.VITE_JAPANESE_API_URL || 'http://localhost:8000';

/**
 * Fetches an example Japanese sentence and its translation for a given word.
 * @param word The Japanese word to search for.
 * @returns A Promise that resolves to SentenceData or throws an error.
 */
export async function fetchExampleSentence(word: string, targetLanguage: Language): Promise<SentenceData> {
  if (!word.trim()) {
    throw new Error('Word cannot be empty.');
  }

  const url = `${API_BASE_URL}/sentences/get_example?target_word=${encodeURIComponent(word)}&target_language=${targetLanguage}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Attempt to parse a more specific error message from the API response
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message; // Use API's error message if available
        } else if (errorData && typeof errorData === 'string') {
          errorMessage = errorData; // Sometimes APIs return plain text errors
        }
      } catch (parseError) {
        // If parsing JSON fails, just use the generic HTTP error
        console.warn('Could not parse API error response as JSON:', parseError);
      }
      throw new Error(errorMessage);
    }

    const data: SentenceApiResponse = await response.json();

    // Map the API response structure to our desired SentenceData structure
    // This step is crucial if your API's field names don't directly match your component's needs.
    const sentenceData: SentenceData = {
      target: data.target_sentence, // Adjust 'data.sentence' to match your API's field name
      translated: data.translated_sentence, // Adjust 'data.translation' to match your API's field name
    };

    return sentenceData;

  } catch (error: any) {
    // Re-throw the error so the calling component can handle it
    console.error('Error in fetchExampleSentence:', error);
    throw new Error(`Failed to fetch sentence: ${error.message || 'Unknown error'}`);
  }
}
