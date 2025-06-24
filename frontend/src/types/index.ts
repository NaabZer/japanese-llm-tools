export type Language = 'japanese' | 'swedish';

export interface SentenceData {
  target: string;
  translated: string;
}

export interface SentenceApiResponse {
  target_word: string;
  target_sentence: string;
  translated_sentence: string;
}
