import test from 'tape'
import nlp from '../_lib.js'

const here = '[plugins/dates/fractional-language] '
const options = { today: '2026-01-15T10:20:00', timezone: 'UTC' }

test(here + 'calendar expressions resolve to dates', t => {
  const cases = [
    ['in one and a half years', '2027-07-15'],
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
    ['three and a half days from now', '2026-01-18T22:20:00.000Z'],
  ]
  cases.forEach(([input, expected]) => {
    const dates = nlp(input).dates(options).get()
    t.equal(dates.length, 1, input + ': one date')
    t.equal(dates[0]?.start, expected, input)
  })
  t.end()
})
