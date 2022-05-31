import nlp from 'compromise'

export type Freq = [word: string, freq: number]

export interface StatsMethods {
  /** list all repeating sub-phrases, by word-count*/
  ngrams(options?: any): any
  /** n-grams with one word*/
  unigrams(index?: number): any
  /** n-grams with two words*/
  bigrams(index?: number): any
  /** n-grams with three words*/
  trigrams(index?: number): any
  /** n-grams including the first term of a phrase*/
  startgrams(options?: any): any
  /** n-grams including the last term of a phrase*/
  endgrams(options?: any): any
  /** n-grams including the first or last term of a phrase*/
  edgegrams(options?: any): any

  /** compute word-importance in this document */
  tfidf(): Freq[]
}

/** extended compromise lib **/
declare const nlpStats: nlp.TypedPlugin<StatsMethods, {}>

export default nlpStats
