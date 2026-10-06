import test from 'tape'
import nlp from './_lib.js'

const here = '[plugins/dates/arithmetic] '
const options = { today: '2020-06-01', timezone: 'UTC' }

// Expectations are written from the public API, independently of the implementation.
test(here + 'written date styles', t => {
  const cases = [
    ['it was june 5th 2020', 2, 'day', 'it was june 7th 2020'],
    ['it was june 5th 2020', 2, 'days', 'it was june 7th 2020'],
    ['June 5 2020', 2, 'days', 'June 7 2020'],
    ['JUNE 5TH 2020', 2, 'days', 'JUNE 7TH 2020'],
    ['June 5th, 2020', 2, 'days', 'June 7th, 2020'],
    ['Jun 5th 2020', 2, 'days', 'Jun 7th 2020'],
    ['Jun. 5th 2020', 2, 'days', 'Jun. 7th 2020'],
    ['5 June 2020', 2, 'days', '7 June 2020'],
    ['5th June 2020', 2, 'days', '7th June 2020'],
    ['5th of June 2020', 2, 'days', '7th of June 2020'],
    ['June 1st 2020', 1, 'day', 'June 2nd 2020'],
    ['June 2nd 2020', 1, 'day', 'June 3rd 2020'],
    ['June 3rd 2020', 1, 'day', 'June 4th 2020'],
    ['June 10th 2020', 1, 'day', 'June 11th 2020'],
    ['June 11th 2020', 1, 'day', 'June 12th 2020'],
    ['June 12th 2020', 1, 'day', 'June 13th 2020'],
    ['June 20th 2020', 1, 'day', 'June 21st 2020'],
    ['June 21st 2020', 1, 'day', 'June 22nd 2020'],
    ['June 22nd 2020', 1, 'day', 'June 23rd 2020'],
    ['June 30th 2020', 1, 'day', 'July 1st 2020'],
    ['2020-06-05', 2, 'days', '2020-06-07'],
    ['06/05/2020', 2, 'days', '06/07/2020'],
    ['6/5/2020', 2, 'days', '6/7/2020'],
    ['on June 5, 2020, we met.', 2, 'days', 'on June 7, 2020, we met.'],
    ['We met (June 5th 2020).', 2, 'days', 'We met (June 7th 2020).'],
    ['June 5 2020. Then June 9 2020.', 2, 'days', 'June 7 2020. Then June 11 2020.'],
  ]
  cases.forEach(([input, amount, unit, expected]) => {
    const doc = nlp(input)
    doc.dates(options).add(amount, unit)
    t.equal(doc.text(), expected, input)
  })
  t.end()
})

test(here + 'calendar boundaries and signed arithmetic', t => {
  const cases = [
    ['January 31st 2020', 1, 'day', '2020-02-01'],
    ['February 28th 2020', 1, 'day', '2020-02-29'],
    ['February 28th 2021', 1, 'day', '2021-03-01'],
    ['February 29th 2020', 1, 'day', '2020-03-01'],
    ['March 1st 2020', -1, 'day', '2020-02-29'],
    ['March 1st 2021', -1, 'day', '2021-02-28'],
    ['December 31st 2020', 1, 'day', '2021-01-01'],
    ['January 1st 2020', -1, 'day', '2019-12-31'],
    ['January 31st 2020', 1, 'month', '2020-02-29'],
    ['January 31st 2021', 1, 'month', '2021-02-28'],
    ['March 31st 2020', -1, 'month', '2020-02-29'],
    ['March 31st 2021', -1, 'month', '2021-02-28'],
    ['August 31st 2020', 1, 'month', '2020-09-30'],
    ['February 29th 2020', 1, 'year', '2021-02-28'],
    ['February 29th 2020', -1, 'year', '2019-02-28'],
    ['February 29th 2020', 4, 'years', '2024-02-29'],
    ['February 28th 1900', 1, 'day', '1900-03-01'],
    ['February 28th 2000', 1, 'day', '2000-02-29'],
    ['February 28th 2100', 1, 'day', '2100-03-01'],
    ['June 5th 2020', 1, 'week', '2020-06-12'],
    ['June 5th 2020', 2, 'weeks', '2020-06-19'],
    ['June 5th 2020', -2, 'weeks', '2020-05-22'],
    ['June 5th 2020', 1, 'fortnight', '2020-06-19'],
    ['June 5th 2020', 1, 'quarter', '2020-09-05'],
    ['June 5th 2020', 1, 'decade', '2030-06-05'],
    ['June 5th 2020', 1, 'century', '2120-06-05'],
    ['June 5th 2020', 1, 'centuries', '2120-06-05'],
    ['June 5th 2020', 12, 'months', '2021-06-05'],
    ['June 5th 2020', 365, 'days', '2021-06-05'],
  ]
  cases.forEach(([input, amount, unit, expected]) => {
    const added = nlp(input).dates(options).add(amount, unit)
    const subtracted = nlp(input).dates(options).subtract(-amount, unit)
    t.equal(added.get(0)?.start?.slice(0, 10), expected, `${input} add ${amount} ${unit}`)
    t.equal(subtracted.get(0)?.start?.slice(0, 10), expected, `${input} subtract ${-amount} ${unit}`)
  })
  t.end()
})

test(here + 'clock arithmetic and fractional elapsed time', t => {
  const cases = [
    ['June 5 2020', 25, 'hours', '2020-06-06T01:00:00.000Z'],
    ['June 5 2020', -1, 'hour', '2020-06-04T23:00:00.000Z'],
    ['June 5 2020 at 11pm', 2, 'hours', '2020-06-06T01:00:00.000Z'],
    ['June 5 2020 at 3pm', 90, 'minutes', '2020-06-05T16:30:00.000Z'],
    ['June 5 2020 at 3pm', -90, 'minutes', '2020-06-05T13:30:00.000Z'],
    ['June 5 2020 at 3pm', 1.5, 'hours', '2020-06-05T16:30:00.000Z'],
    ['June 5 2020 at 3pm', 0.5, 'minutes', '2020-06-05T15:00:30.000Z'],
    ['2020-06-05T23:59:59.000Z', 1, 'second', '2020-06-06T00:00:00.000Z'],
    ['2020-06-05T23:59:59.999Z', 1, 'millisecond', '2020-06-06T00:00:00.000Z'],
    ['2020-06-05T00:00:00.000Z', -1, 'millisecond', '2020-06-04T23:59:59.999Z'],
    ['2020-06-05T12:30:45.123Z', 2, 'days', '2020-06-07T12:30:45.123Z'],
    ['2020-06-05T12:30:45.123Z', 10, 'milliseconds', '2020-06-05T12:30:45.133Z'],
  ]
  cases.forEach(([input, amount, unit, expected]) => {
    const dates = nlp(input).dates(options).add(amount, unit)
    t.equal(dates.get(0)?.start, expected, `${input} + ${amount} ${unit}`)
  })
  t.end()
})

test(here + 'ranges and whole calendar periods', t => {
  const cases = [
    ['June 5 to June 7 2020', 2, 'days', '2020-06-07T00:00:00.000Z', '2020-06-09T23:59:59.999Z'],
    ['June 5 to June 7 2020', -7, 'days', '2020-05-29T00:00:00.000Z', '2020-05-31T23:59:59.999Z'],
    ['June 30 to July 2 2020', 1, 'month', '2020-07-30T00:00:00.000Z', '2020-08-02T23:59:59.999Z'],
    ['January 30 to January 31 2020', 1, 'month', '2020-02-29T00:00:00.000Z', '2020-02-29T23:59:59.999Z'],
    ['June 2020', 1, 'month', '2020-07-01T00:00:00.000Z', '2020-07-31T23:59:59.999Z'],
    ['January 2020', 1, 'month', '2020-02-01T00:00:00.000Z', '2020-02-29T23:59:59.999Z'],
    ['February 2020', 1, 'year', '2021-02-01T00:00:00.000Z', '2021-02-28T23:59:59.999Z'],
    ['December 2020', 1, 'month', '2021-01-01T00:00:00.000Z', '2021-01-31T23:59:59.999Z'],
    ['June 2020', 2, 'days', '2020-06-03T00:00:00.000Z', '2020-07-02T23:59:59.999Z'],
    ['2020', 1, 'year', '2021-01-01T00:00:00.000Z', '2021-12-31T23:59:59.999Z'],
    ['June 5 2020 from 3pm to 5pm', 2, 'days', '2020-06-07T15:00:00.000Z', '2020-06-07T17:00:00.000Z'],
    ['June 5 2020 from 3pm to 5pm', 10, 'hours', '2020-06-06T01:00:00.000Z', '2020-06-06T03:00:00.000Z'],
    ['June 5 2020 from 11pm to 2am', 1, 'day', '2020-06-06T23:00:00.000Z', '2020-06-07T02:00:00.000Z'],
  ]
  cases.forEach(([input, amount, unit, start, end]) => {
    const dates = nlp(input).dates(options).add(amount, unit)
    t.equal(dates.get(0)?.start, start, `${input}: start`)
    t.equal(dates.get(0)?.end, end, `${input}: end`)
  })
  t.end()
})

test(here + 'relative dates and day-first input', t => {
  const cases = [
    ['today', 2, '2020-06-03'],
    ['tomorrow', 2, '2020-06-04'],
    ['yesterday', 2, '2020-06-02'],
    ['in two days', 7, '2020-06-10'],
    ['Christmas 2020', 1, '2020-12-26'],
    ['December 31st', 1, '2021-01-01'],
  ]
  cases.forEach(([input, amount, expected]) => {
    const dates = nlp(input).dates(options).add(amount, 'days')
    t.equal(dates.get(0)?.start?.slice(0, 10), expected, input)
  })
  const weekday = nlp('next Friday').dates(options)
  const before = weekday.get(0)?.start
  const after = weekday.add(7, 'days').get(0)?.start
  t.equal(Date.parse(after) - Date.parse(before), 7 * 86400000, 'shift the resolved weekday by seven days')

  const dates = nlp('05/06/2020')
    .dates({ ...options, dmy: true })
    .add(2, 'days')
  t.equal(dates.text(), '07/06/2020', 'retain day-first format')
  t.equal(dates.get(0)?.start, '2020-06-07T00:00:00.000Z', 'retain day-first options')
  dates.subtract(1, 'day')
  t.equal(dates.get(0)?.start, '2020-06-06T00:00:00.000Z', 'day-first subtraction')
  t.end()
})

test(here + 'timezone and daylight-saving boundaries', t => {
  const cases = [
    ['March 7th 2020 at 3pm', 1, 'day', 'America/New_York', '2020-03-08T15:00:00.000-04:00'],
    ['March 7th 2020 at 3pm', 24, 'hours', 'America/New_York', '2020-03-08T16:00:00.000-04:00'],
    ['October 31st 2020 at 3pm', 1, 'day', 'America/New_York', '2020-11-01T15:00:00.000-05:00'],
    ['October 31st 2020 at 3pm', 24, 'hours', 'America/New_York', '2020-11-01T14:00:00.000-05:00'],
    ['March 8th 2020 at 3pm', -1, 'day', 'America/New_York', '2020-03-07T15:00:00.000-05:00'],
    ['March 28th 2020 at 3pm', 1, 'day', 'Europe/London', '2020-03-29T15:00:00.000+01:00'],
    ['June 5th 2020 at 11pm', 2, 'hours', 'Asia/Kolkata', '2020-06-06T01:00:00.000+05:30'],
    ['June 5th 2020 at 11pm', 2, 'hours', 'Asia/Kathmandu', '2020-06-06T01:00:00.000+05:45'],
  ]
  cases.forEach(([input, amount, unit, timezone, expected]) => {
    const dates = nlp(input)
      .dates({ ...options, timezone })
      .add(amount, unit)
    t.equal(dates.get(0)?.start, expected, `${timezone}: ${input} + ${amount} ${unit}`)
  })
  const opts = { ...options, timezone: 'America/New_York' }
  const single = nlp('March 6th 2020 at 3pm').dates(opts).add(1, 'day').add(2, 'days')
  t.equal(single.get(0)?.start, '2020-03-09T15:00:00.000-04:00', 'chained dates retain named timezone')

  const range = nlp('March 6th 2020 from 3pm to 5pm').dates(opts).add(1, 'day').add(2, 'days')
  t.equal(range.get(0)?.start, '2020-03-09T15:00:00.000-04:00', 'chained range start retains named timezone')
  t.equal(range.get(0)?.end, '2020-03-09T17:00:00.000-04:00', 'chained range end retains named timezone')

  const precise = nlp('March 6th 2020 at 3pm').dates(opts).add(1, 'second').add(3, 'days')
  t.equal(precise.get(0)?.start, '2020-03-09T15:00:01.000-04:00', 'sub-minute precision retains named timezone')
  t.end()
})

test(here + 'mutation, selections and chaining', t => {
  const doc = nlp('We met June 5th 2020 and left June 9th 2020.')
  const dates = doc.dates(options).add(2, 'days').subtract(1, 'day')
  t.equal(doc.text(), 'We met June 6th 2020 and left June 10th 2020.', 'mutate the original document')
  t.equal(dates.length, 2, 'return both selections')
  t.equal(dates.get(0)?.start, '2020-06-06T00:00:00.000Z', 'first returned date')
  t.equal(dates.get(1)?.start, '2020-06-10T00:00:00.000Z', 'second returned date')
  t.deepEqual(doc.dates(options).get(), dates.get(), 'fresh selection agrees with returned selection')

  const expanded = nlp('today').dates(options).add(25, 'hours').subtract(1, 'hour')
  t.equal(expanded.get(0)?.start, '2020-06-02T00:00:00.000Z', 'longer replacement remains fully selected')

  const formatted = nlp('June 5th 2020').dates(options).add(2, 'days').format('iso-short')
  t.equal(formatted.text(), '2020-06-07', 'format after arithmetic')

  const defaultUnit = nlp('June 5th 2020').dates(options).add(2).subtract(1)
  t.equal(defaultUnit.get(0)?.start, '2020-06-06T00:00:00.000Z', 'default unit is a day')

  const listDoc = nlp('June 5 or 8')
  const list = listDoc.dates(options).add(2, 'days').subtract(1, 'day')
  t.deepEqual(
    list.get().map(d => d.start?.slice(0, 10)),
    ['2020-06-06', '2020-06-09'],
    'shared-month list keeps both dates'
  )
  t.deepEqual(listDoc.dates(options).get(), list.get(), 'list survives reselection')

  const sharedYear = nlp('June 5 or 8 2020').dates(options).add(2, 'days')
  t.deepEqual(
    sharedYear.get().map(d => d.start?.slice(0, 10)),
    ['2020-06-07', '2020-06-10'],
    'shared-year list shifts both dates'
  )

  const selectedDoc = nlp('June 5th 2020. June 9th 2020.')
  selectedDoc.match('June 9th 2020').dates(options).add(1, 'day')
  t.equal(selectedDoc.text(), 'June 5th 2020. June 10th 2020.', 'only mutate selected dates')

  const original = nlp('June 5th 2020')
  original.clone().dates(options).add(1, 'day')
  t.equal(original.text(), 'June 5th 2020', 'arithmetic on clone leaves original alone')
  t.end()
})

test(here + 'no-ops, invalid arguments and recurrences', t => {
  const args = [
    [0, 'day'],
    [-0, 'days'],
    [NaN, 'day'],
    [Infinity, 'day'],
    [-Infinity, 'day'],
    ['2', 'day'],
    [null, 'day'],
    [undefined, 'day'],
    [2, 'nonsense'],
    [2, ''],
    [2, null],
    [2, 7],
    [2, {}],
  ]
  args.forEach(([amount, unit]) => {
    const label = `${String(amount)} ${String(unit)}`
    const doc = nlp('June 5th 2020')
    doc.dates(options).add(amount, unit)
    t.equal(doc.text(), 'June 5th 2020', `add ${label} leaves text alone`)
    doc.dates(options).subtract(amount, unit)
    t.equal(doc.text(), 'June 5th 2020', `subtract ${label} leaves text alone`)
  })
  const unchanged = ['', 'There are no dates here.', 'every Tuesday', 'every other week']
  unchanged.forEach(input => {
    const doc = nlp(input)
    doc.dates(options).add(2, 'days').subtract(1, 'day')
    t.equal(doc.text(), input, `leave ${JSON.stringify(input)} alone`)
  })
  t.equal(
    nlp('June 5th 2020').dates(options).add(2, ' DAYS ').get(0)?.start,
    '2020-06-07T00:00:00.000Z',
    'normalize unit case and whitespace'
  )
  t.end()
})
