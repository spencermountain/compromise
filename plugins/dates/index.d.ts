import nlp from 'compromise'
type View = ReturnType<typeof nlp>

interface DateView extends View {
  /** convert parsed dates to a date format */
  format(fmt: string): View
  /** get parsed date metadata */
  get(): object[]
}

interface TimeView extends View {
  /** convert parsed dates to a time format */
  format(fmt: string): View
  /** get parsed time metadata */
  get(): object[]
}

export interface DatesMethods {
  /** match all date-phrases */
  dates(): DateView
  /** match time-of-day phrases */
  times(): TimeView
  /** match lengths of time, like '2 weeks' */
  durations(): View
}

/** extended compromise lib **/
declare const nlpDates: nlp.TypedPlugin<DatesMethods>

export default nlpDates
