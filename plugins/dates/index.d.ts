import nlp from 'compromise'

export interface DatesMethods {
  /** match all date-phrases */
  dates(): any
  /** match time-of-day phrases */
  times(): any
  /** match lengths of time, like '2 weeks' */
  durations(): any
}

/** extended compromise lib **/
declare const nlpSpeed: nlp.TypedPlugin<DatesMethods>

export default nlpSpeed
