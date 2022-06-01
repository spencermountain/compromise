import nlp from 'compromise'

export interface DatesMethods {
  /** match all date-phrases */
  dates(): View
  /** match time-of-day phrases */
  times(): View
  /** match lengths of time, like '2 weeks' */
  durations(): View
}

/** extended compromise lib **/
declare const nlpDates: nlp.TypedPlugin<DatesMethods>

export default nlpDates
