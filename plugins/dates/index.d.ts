import nlp from 'compromise'
type View = ReturnType<typeof nlp>

export interface DateOptions {
  /** the timezone to compute dates in, like 'Canada/Eastern' - defaults to the system timezone */
  timezone?: string
  /** the implicit, or reference moment for 'now' - an iso-string, epoch-number, or Date */
  today?: string | number | Date | object
  /** the implied duration to use for 'after june 2nd' - defaults to { weeks: 2 } */
  punt?: Record<string, number>
  /** the default start of a day, like '8:00am' */
  dayStart?: string
  /** the default end of a day, like '5:00pm' */
  dayEnd?: string
  /** assume day-month-year format for ambiguous dates, like '01/02/2020' */
  dmy?: boolean
}
/** @deprecated - use DateOptions */
export type dateOptions = DateOptions

export interface DateJSON {
  start: string | null
  end: string | null
  timezone: string | null
  duration: {
    years?: number
    months?: number
    days?: number
    hours?: number
    minutes?: number
  }
  /** the span of the date, like 'day' or 'time' */
  unit?: string
  /** set for repeating dates, like 'every tuesday' */
  repeat?: {
    interval: Record<string, number>
    filter?: { weekDays?: Record<string, boolean> }
    choose?: 'AND' | 'OR' | null
    time?: string | null
  }
}

export interface TimeJSON {
  time: string | null
  '24h': string | null
  hour?: number
  minute?: number
}

export type DurationJSON = Record<string, number>

interface DateView extends View {
  /** replace date-terms with a formatted date (a spacetime format string) */
  format(fmt: string): DateView
  /** get parsed date metadata */
  get(): DateJSON[]
  get(n: number): DateJSON | undefined
  /** keep only dates before the given date */
  isBefore(date: string | number | Date): DateView
  /** keep only dates after the given date */
  isAfter(date: string | number | Date): DateView
  /** keep only dates in the same unit as the given date */
  isSame(unit: string, date: string | number | Date): DateView
}

interface TimeView extends View {
  /** replace time-terms with a formatted time - '24h' or a spacetime format string */
  format(fmt: string): TimeView
  /** get parsed time metadata */
  get(): TimeJSON[]
  get(n: number): TimeJSON | undefined
}

interface DurationView extends View {
  /** get parsed duration metadata */
  get(): DurationJSON[]
  get(n: number): DurationJSON | undefined
}

export interface DatesMethods {
  /** match all date-phrases */
  dates(opts?: DateOptions): DateView
  /** match time-of-day phrases, like '2:30pm' - n selects the nth match */
  times(n?: number): TimeView
  /** match lengths-of-time, like '2 weeks' - n selects the nth match */
  durations(n?: number): DurationView
}

/** extended compromise lib **/
declare const nlpDates: nlp.TypedPlugin<DatesMethods>

export default nlpDates
