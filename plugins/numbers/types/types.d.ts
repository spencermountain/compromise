import compromise from 'compromise'

export as namespace nlpNumbers

declare function nlpNumbers(text: string): nlpNumbers.Document

declare module nlpNumbers {
  class Document extends compromise.Document {
    numbers(n?: Number): Numbers
  }
  class Numbers {
    json(n?: Number): Document
    fractions(): Document
    toText(): Document
    toNumber(): Document
    toOrdinal(): Document
    toCardinal(): Document
    add(n: Number): Document
    subtract(n: Number): Document
    increment(): Document
    decrement(): Document
    isEqual(): Document
    greaterThan(min: Number): Document
    lessThan(max: Number): Document
    between(min: Number, max: Number): Document
    isOrdinal(): Document
    isCardinal(): Document
    toLocaleString(): Document
  }
}

export default nlpNumbers
