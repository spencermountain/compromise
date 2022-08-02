import nlp from 'compromise'

export type Freq = [word: string, freq: number]

type Gram = { size: number, count: number, normal: string }
type Opts = { min: number, max: number } | { size: number }

export interface StatsMethods {
  /** list all repeating sub-phrases, by word-count*/
  ngrams(options?: Opts): Gram[]
  /** n-grams with one word*/
  unigrams(index?: number): Gram[]
  /** n-grams with two words*/
  bigrams(index?: number): Gram[]
  /** n-grams with three words*/
  trigrams(index?: number): Gram[]
  /** n-grams including the first term of a phrase*/
  startgrams(options?: Opts): Gram[]
  /** n-grams including the last term of a phrase*/
  endgrams(options?: Opts): Gram[]
  /** n-grams including the first or last term of a phrase*/
  edgegrams(options?: Opts): Gram[]

  /** compute word-importance in this document */
  tfidf(): Freq[]
}

/** extended compromise lib **/
declare const nlpStats: nlp.TypedPlugin<StatsMethods>

export default nlpStats
