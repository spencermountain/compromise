import parseDates from '../parse/index.js'
import { calendarFormat, explicitFormat, preciseFormat } from './_lib.js'

const units = new Set(['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'fortnight', 'month', 'quarter', 'season', 'year', 'decade', 'century'])
const clockUnits = new Set(['millisecond', 'second', 'minute', 'hour'])
const milliseconds = { millisecond: 1, second: 1000, minute: 60000, hour: 3600000 }

const shiftRange = (range, amount, unit, text, opts) => {
  const start = range.start.d
  const shifted = start.add(amount, unit)
  const end = range.end?.d.add(amount, unit)
  if (!shifted.isValid() || (end && !end.isValid())) {
    return null
  }
  // Fractional calendar shifts can introduce a time even on a date-only input.
  const time = range.unit === 'time' || clockUnits.has(unit) ||
    (!Number.isInteger(amount) && shifted.epoch !== shifted.startOf('day').epoch) ||
    (!range.unit && (start.epoch !== start.startOf('day').epoch ||
      (range.end && range.end.d.epoch !== range.end.d.endOf('day').epoch)))
  if (range.unit === 'day' && !time) {
    return calendarFormat(text, start, shifted, opts) || explicitFormat(shifted, false)
  }
  if (range.unit === 'time' && (!range.end ||
    range.end.d.epoch === range.start.clone().end().d.epoch)) {
    return explicitFormat(shifted, true)
  }
  // A calendar period shifted by whole calendar units keeps its full span.
  if (['month', 'year'].includes(range.unit) && end &&
    Number.isInteger(amount) && ['month', 'quarter', 'season', 'year', 'decade', 'century'].includes(unit) &&
    shifted.epoch === shifted.startOf(range.unit).epoch) {
    return shifted.format(range.unit === 'month' ? '{month} {year}' : 'year')
  }
  if (range.unit === 'day') {
    return explicitFormat(shifted, time)
  }
  let str = explicitFormat(shifted, time)
  if (!time && end && shifted.isSame(end, 'day')) {
    return str
  }
  if (end && shifted.epoch !== end.epoch) {
    // ISO endpoints avoid the parser extending a written end-time to midnight.
    if (time) {
      return preciseFormat(shifted) + ' to ' + preciseFormat(end)
    }
    str += ' to ' + explicitFormat(end, time)
  }
  return str
}

const arithmetic = (view, amount, unit) => {
  if (!Number.isFinite(amount) || amount === 0 || typeof unit !== 'string') {
    return view
  }
  unit = unit.toLowerCase().trim().replace(/ies$/, 'y').replace(/s$/, '')
  if (!units.has(unit)) {
    return view
  }
  // Spacetime rounds fractional clock units; use their exact elapsed duration.
  if (clockUnits.has(unit) && !Number.isInteger(amount)) {
    amount *= milliseconds[unit]
    unit = 'millisecond'
  }
  return view.map(m => {
    const ranges = parseDates(m, view.opts)
    // Recurrences and unparsed dates have no unambiguous shifted expression.
    if (!ranges.length || ranges.some(r => !r.start || r.repeat)) {
      return m
    }
    const original = m.text()
    const prefix = original.match(/^(on|in|at|during)\s+/i)?.[0] || ''
    const text = original.slice(prefix.length).replace(/\b[,.!?]+$/, '')
    if (ranges.length === 1 && ranges[0].unit === 'day' && /\b(and|or)\b/i.test(text)) {
      return m
    }
    const results = ranges.map(r => {
      // Fully qualified ISO dates keep shared-month lists unambiguous.
      const model = ranges.length > 1 ? r.start.d.format('iso-short') : text
      return shiftRange(r, amount, unit, model, view.opts)
    })
    if (results.every(str => str !== null)) {
      const join = /\bor\b/i.test(text) ? ' or ' : ' and '
      m.replaceWith(prefix + results.join(join))
      m.compute(['postTagger', 'dates'])
      return m.dates(view.opts)
    }
    return m
  })
}

export default arithmetic
