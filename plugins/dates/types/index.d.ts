import nlp from 'compromise'

declare class Dates {
  /** overloaded output with date metadata **/
  json(n?: number): any
  /** convert the dates to specific formats **/
  format(fmt?: string): nlp.Document
  /** convert 'Wednesday' to 'Wed', etc */
  toShortForm(): nlp.Document
  /** convert 'Feb' to 'February', etc */
  toLongForm(): nlp.Document
}

/**  **/
declare const nlpDates: nlp.Plugin<{ dates(n?: number): Dates }, {}>

export default nlpDates
