import nlp from 'compromise'

declare class Numbers {
  /** overloaded output with number metadata */
  json(n?: number): object | object[]
  /** retrive the parsed number */
  get(n?: number): number | number[]
  /** grab 'kilos' from `25 kilos' */
  units(): nlp.Document
  /** things like `1/3rd` */
  fractions(): nlp.Document
  /** convert number to `five` or `fifth` */
  toText(): nlp.Document
  /** convert number to `5` or `5th` */
  toNumber(): nlp.Document
  /** convert number to `fifth` or `5th` */
  toOrdinal(): nlp.Document
  /** convert number to `five` or `5` */
  toCardinal(): nlp.Document
  /** set number to n */
  set(n: number): nlp.Document
  /** increase number by n */
  add(n: number): nlp.Document
  /** decrease number by n*/
  subtract(n: number): nlp.Document
  /** increase number by 1 */
  increment(): nlp.Document
  /** decrease number by 1*/
  decrement(): nlp.Document
  /** return numbers with this value */
  isEqual(): nlp.Document
  /** return numbers bigger than n */
  greaterThan(min: number): nlp.Document
  /** return numbers smaller than n */
  lessThan(max: number): nlp.Document
  /**  return numbers between min and max */
  between(min: number, max: number): nlp.Document
  /** return only ordinal numbers */
  isOrdinal(): nlp.Document
  /** return only cardinal numbers */
  isCardinal(): nlp.Document
  /** add commas, or nicer formatting for numbers */
  toLocaleString(): nlp.Document
}

/** grab all written and numeric values */
declare const nlpNumbers: nlp.Plugin<{ numbers(n?: number): Numbers }, {}>

export default nlpNumbers
