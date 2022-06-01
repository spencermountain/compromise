import nlp from 'compromise'
type View = ReturnType<typeof nlp>

interface DateView extends View {
  /** convert parsed dates to a date format */
  format(fmt: string): View
  /** get parsed date metadata */
  get(): object[]
}

export interface DatesMethods {
  /** match all date-phrases */
  dates(): DateView
  /** match time-of-day phrases */
  times(): View
  /** match lengths of time, like '2 weeks' */
  durations(): View
}

/** extended compromise lib **/
declare const nlpSpeed: nlp.TypedPlugin<DatesMethods>

export default nlpSpeed
