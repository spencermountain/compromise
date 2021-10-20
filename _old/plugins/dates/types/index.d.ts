import nlp from 'compromise'

declare namespace nlp {
  export class Dates {
    get(): nlp.Date[]
    get(n: number): nlp.Date | undefined
    /** overloaded output with date metadata */
    json(n?: number): any
    /** convert the dates to specific formats */
    format(fmt?: string): nlp.Document
    /** convert 'Wednesday' to 'Wed', etc */
    toShortForm(): nlp.Document
    /** convert 'Feb' to 'February', etc */
    toLongForm(): nlp.Document
  }
  export interface Date {
    start: string
    end: string
    tz: string
    repeat?: {
      interval: { [unit: string]: any }
      unit: string
      time?: any
      filter?: any
    }
  }
}

declare const nlpDates: nlp.Plugin<{ dates(n?: number): nlp.Dates }, {}>

export default nlpDates
