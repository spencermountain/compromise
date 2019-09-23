export as namespace nlp

declare function nlp(text: string, options?: any): nlp.Document

declare module nlp {
  export const version: string

  export function tokenize(text: string, options?: any): nlp.Document

  class Document {
    /**guess the title of the page from the first-sentence */
    text(str?: string): string

    /**the page this redirects to */
    random(): Document
  }
}

export default nlp
