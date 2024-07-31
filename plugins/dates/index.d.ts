import nlp from 'compromise'
type View = ReturnType<typeof nlp>

export interface dateOptions {
  /** the default timezone is 'ETC/UTC' */
  timezone?: string,
  /** the implicit, or reference moment for 'now'*/
  today: '2020-02-20',
  /** the implied duration to use for 'after june 2nd' */
  punt: { weeks: 2 },
  /** the default beginning of a day, like '8:00am'*/
  dayStart: string,
  /** the default beginning of a day, like '5:00pm'*/
  dayEnd: string,
  /** whether to assume british-format dates, when unclear*/
  dmy: boolean
}

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
  dates(opts?: dateOptions): DateView
  /** match time-of-day phrases */
  times(opts?: dateOptions): TimeView
  /** match lengths of time, like '2 weeks' */
  durations(): View
}

/** extended compromise lib **/
declare const nlpDates: nlp.TypedPlugin<DatesMethods>

export default nlpDates
