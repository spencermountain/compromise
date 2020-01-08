import nlp from 'compromise'

declare class Sentences {
  /** overloaded output with sentence metadata **/
  json(n?: number): any
  /** return the main noun of each sentence **/
  subjects(): nlp.Document
  /** `he walks` -> `he walked` **/
  toPastTense(): nlp.Document
  /** `he walked` -> `he walks` **/
  toPresentTense(): nlp.Document
  /** `he walks` -> `he will walk` **/
  toFutureTense(): nlp.Document
  /** `he walks` -> `he didn't walk` **/
  toNegative(): nlp.Document
  /** `he doesn't walk` -> `he walks` **/
  toPositive(): nlp.Document

  /** return only sentences with a passive-voice **/
  isPassive(): nlp.Document
  /** return questions with a `?` **/
  isQuestion(): nlp.Document
  /** return sentences with a `!` **/
  isExclamation(): nlp.Document
  /** return sentences without `?` or `!` **/
  isStatement(): nlp.Document

  /**  smarter prepend that repairs whitespace + titlecasing **/
  prepend(): nlp.Document
  /** smarter append that repairs sentence punctuation **/
  append(): nlp.Document
  /** end sentence with a `!` **/
  toExclamation(): nlp.Document
  /** end sentence with a `?` **/
  toQuestion(): nlp.Document
  /** end sentence with a `.` **/
  toStatement(): nlp.Document
}

/** return sentence objects with additional methods **/
declare const nlpSentences: nlp.Plugin<{ sentences(n?: number): Sentences }, {}>

export default nlpSentences
