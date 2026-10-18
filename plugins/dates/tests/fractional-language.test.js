import test from 'tape'
import nlp from './_lib.js'

const here = '[plugins/dates/fractional-language] '
const options = { today: '2026-01-15T10:20:00', timezone: 'UTC' }

test(here + 'calendar expressions resolve to dates', t => {
  const cases = [
    ['in half a year', '2026-07-15'],
    ['half a year ago', '2025-07-15'],
    ['in half a month', '2026-01-30'],
    ['six months from now', '2026-07-15'],
    ['in 1.5 years', '2027-07-15'],
    ["We'll review the project in half a year.", '2026-07-15'],
  ]
  cases.forEach(([input, expected]) => {
    const dates = nlp(input).dates(options).get()
    t.equal(dates.length, 1, input + ': one date')
    t.equal(dates[0]?.start, expected + 'T00:00:00.000Z', input + ': start of day')
    t.equal(dates[0]?.end, expected + 'T23:59:59.999Z', input + ': end of day')
  })
  t.end()
})

test(here + 'short durations preserve the reference clock time', t => {
  const cases = [
    ['in half a week', '2026-01-18T22:20:00.000Z'],
    ['in half a day', '2026-01-15T22:20:00.000Z'],
    ['in half an hour', '2026-01-15T10:50:00.000Z'],
    ['in an hour and a half', '2026-01-15T11:50:00.000Z'],
    ['in 1.5 hours', '2026-01-15T11:50:00.000Z'],
    ['The delivery will arrive in half a day.', '2026-01-15T22:20:00.000Z'],
    ['Remind me in half an hour.', '2026-01-15T10:50:00.000Z'],
  ]
  cases.forEach(([input, expected]) => {
    const dates = nlp(input).dates(options).get()
    t.equal(dates.length, 1, input + ': one date')
    t.equal(dates[0]?.start, expected, input)
  })
  const precise = { ...options, today: '2026-01-15T10:20:37.250' }
  t.equal(nlp('Remind me in half an hour.').dates(precise).get(0)?.start,
    '2026-01-15T10:50:37.250Z', 'retain seconds and milliseconds in a reminder')
  t.end()
})

test(here + 'moving an appointment uses rounded fractional shifts', t => {
  const input = 'My appointment is January 15th 2026 at 10:20am.'
  const cases = [
    [0.5, 'year', '2026-07-17T00:00:00.000Z'],
    [0.5, 'month', '2026-01-29T00:00:00.000Z'],
    [0.5, 'day', '2026-01-15T22:00:00.000Z'],
    [0.5, 'hour', '2026-01-15T10:50:00.000Z'],
    [6, 'months', '2026-07-15T10:20:00.000Z'],
  ]
  cases.forEach(([amount, unit, expected]) => {
    const doc = nlp(input)
    const dates = doc.dates(options).add(amount, unit)
    t.equal(dates.get(0)?.start, expected, `move appointment by ${amount} ${unit}`)
    t.equal(doc.dates(options).get(0)?.start, dates.get(0)?.start, 'fresh selection agrees')
    t.ok(doc.text().startsWith('My appointment is '), 'preserve surrounding sentence')
  })
  t.end()
})

test(here + 'spoken half-year and fractional arithmetic have distinct semantics', t => {
  const parsed = nlp('in half a year').dates(options).get(0)?.start
  const calendar = nlp('January 15th 2026').dates(options).add(6, 'months').get(0)?.start
  const shifted = nlp('January 15th 2026').dates(options).add(0.5, 'year').get(0)?.start
  t.equal(calendar, parsed, 'spoken half-year means six calendar months')
  t.equal(shifted, '2026-07-16T00:00:00.000Z', 'fractional year uses spacetime duration and rounding')
  t.end()
})
