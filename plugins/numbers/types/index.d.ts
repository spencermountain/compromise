import nlp from 'compromise'

declare class Numbers {
  json(n?: number): nlp.Document
  fractions(): nlp.Document
  toText(): nlp.Document
  toNumber(): nlp.Document
  toOrdinal(): nlp.Document
  toCardinal(): nlp.Document
  add(n: number): nlp.Document
  subtract(n: number): nlp.Document
  increment(): nlp.Document
  decrement(): nlp.Document
  isEqual(): nlp.Document
  greaterThan(min: number): nlp.Document
  lessThan(max: number): nlp.Document
  between(min: number, max: number): nlp.Document
  isOrdinal(): nlp.Document
  isCardinal(): nlp.Document
  toLocaleString(): nlp.Document
}

type plugin = nlp.Plugin<{ numbers(n?: number): Numbers }, {}>

export default plugin
