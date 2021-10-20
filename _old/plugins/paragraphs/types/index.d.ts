import nlp from 'compromise'

declare class Paragraphs {
  /** overloaded output with paragraph metadata **/
  json(n?: number): any
  /** go back to a regular Doc object **/
  sentences(n?: number): nlp.Document
  /**  **/
  terms(n?: number): nlp.Document
  /** get nth paragraph **/
  eq(n?: number): nlp.Document
  /** get the first paragraph **/
  first(n?: number): nlp.Document
  /** get the last paragraph **/
  last(n?: number): nlp.Document

  /**  **/
  match(match: string): nlp.Document
  /**  **/
  not(match: string): nlp.Document
  /**  **/
  if(match: string): nlp.Document
  /**  **/
  ifNo(match: string): nlp.Document
  /**  **/
  has(match: string): Boolean

  /**  **/
  forEach(fn: Function): nlp.Document
  /**  **/
  map(fn: Function): nlp.Document
  /**  **/
  filter(fn: Function): nlp.Document
}

/**  **/
declare const nlpParagraphs: nlp.Plugin<{ paragraphs(n?: number): Paragraphs }, {}>

export default nlpParagraphs
