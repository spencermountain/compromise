import nlp from 'compromise'

export type Freq = [word: string, freq: number]

type Gram = { size: number, count: number, normal: string }
type Opts = { min?: number, max?: number, size?: number }
type TfidfOptions = { form?: string }
type IdfOptions = TfidfOptions & { min?: number }
type IdfModel = Record<string, number | string>

export interface StatsMethods {
  /** list all repeating sub-phrases, by word-count*/
  ngrams(options?: Opts): Gram[]
  /** n-grams with one word*/
  unigrams(): Gram[]
  unigrams(index: number): Gram | undefined
  unigrams(index?: number): Gram[] | Gram | undefined
  /** n-grams with two words*/
  bigrams(): Gram[]
  bigrams(index: number): Gram | undefined
  bigrams(index?: number): Gram[] | Gram | undefined
  /** n-grams with three words*/
  trigrams(): Gram[]
  trigrams(index: number): Gram | undefined
  trigrams(index?: number): Gram[] | Gram | undefined
  /** n-grams including the first term of a phrase*/
  startgrams(options?: Opts): Gram[]
  /** n-grams including the last term of a phrase*/
  endgrams(options?: Opts): Gram[]
  /** n-grams including the first or last term of a phrase*/
  edgegrams(options?: Opts): Gram[]

  /** compute word-importance in this document */
  tfidf(options?: TfidfOptions, model?: IdfModel): Freq[]
  /** build word-rarity weights from this view */
  buildIDF(options?: IdfOptions): Record<string, string>

  nGrams: StatsMethods['ngrams']
  ngram: StatsMethods['ngrams']
  uniGrams: StatsMethods['unigrams']
  biGrams: StatsMethods['bigrams']
  triGrams: StatsMethods['trigrams']
  startGrams: StatsMethods['startgrams']
  endGrams: StatsMethods['endgrams']
  edgeGrams: StatsMethods['edgegrams']
}

/** extended compromise lib **/
declare const nlpStats: nlp.TypedPlugin<StatsMethods> & { version: string }

export default nlpStats
