import test from 'tape'
import nlp from './_lib.js'

const here = '[plugins/dates/arithmetic-roundtrip] '
const options = { today: '2020-06-01', timezone: 'UTC' }

test(here + 'calendar dates return to their original date', t => {
  const dates = ['June 15th 2020', 'January 1st 2020', 'December 15th 2020', '2020-03-10']
  const units = ['day', 'days', 'week', 'weeks', 'month', 'months', 'quarter', 'year', 'years']
  const amounts = [1, 2, -1, -2]
  dates.forEach(input => {
    units.forEach(unit => {
      amounts.forEach(amount => {
        const doc = nlp(input)
        const selection = doc.dates(options)
        const before = selection.get()
        const after = selection.add(amount, unit).subtract(amount, unit)
        t.deepEqual(after.get(), before, `${input}: add/subtract ${amount} ${unit}`)
        t.deepEqual(doc.dates(options).get(), before, 'fresh selection agrees')
        const reverse = nlp(input).dates(options).subtract(amount, unit).add(amount, unit)
        t.deepEqual(reverse.get(), before, `${input}: subtract/add ${amount} ${unit}`)
      })
    })
  })
  t.end()
})

test(here + 'precise moments retain their instant', t => {
  const inputs = ['2020-06-05T12:30:45.123Z', '2020-12-31T23:59:59.999Z']
  const shifts = [[1, 'millisecond'], [1234, 'milliseconds'], [1, 'second'], [90, 'minutes'],
    [25, 'hours'], [-25, 'hours'], [1.5, 'hours'], [0.5, 'minutes'], [2, 'days'], [3, 'months']]
  inputs.forEach(input => {
    shifts.forEach(([amount, unit]) => {
      const dates = nlp(input).dates(options)
      const before = dates.get(0)
      const after = dates.add(amount, unit).subtract(amount, unit).get(0)
      t.equal(after?.start, before?.start, `${input}: ${amount} ${unit}`)
      t.equal(after?.end, before?.end, 'precise end survives')
    })
  })
  t.end()
})

test(here + 'ranges, lists and whole periods', t => {
  const inputs = ['June 5 to June 7 2020', 'June 5 or 8', 'June 2020', '2020',
    'June 5 2020 from 3pm to 5pm', 'June 5 2020 from 11pm to 2am']
  const shifts = [[2, 'days'], [1, 'year'], [-1, 'year']]
  inputs.forEach(input => {
    shifts.forEach(([amount, unit]) => {
      const doc = nlp(input)
      const dates = doc.dates(options)
      const bounds = view => view.get().map(d => [d.start, d.end])
      const before = bounds(dates)
      const after = dates.add(amount, unit).subtract(amount, unit)
      t.deepEqual(bounds(after), before, `${input}: ${amount} ${unit}`)
      t.deepEqual(bounds(doc.dates(options)), before, 'fresh range selection agrees')
    })
  })
  t.end()
})

test(here + 'daylight saving round trips retain the named zone', t => {
  const opts = { ...options, timezone: 'America/New_York' }
  const inputs = ['March 7th 2020 at 3pm', 'October 31st 2020 at 3pm',
    'March 7th 2020 from 3pm to 5pm', 'October 31st 2020 from 3pm to 5pm']
  const shifts = [[2, 'days'], [48, 'hours'], [-2, 'days']]
  inputs.forEach(input => {
    shifts.forEach(([amount, unit]) => {
      const dates = nlp(input).dates(opts)
      const before = dates.get(0)
      const after = dates.add(amount, unit).subtract(amount, unit).get(0)
      t.equal(after?.start, before?.start, `${input}: ${amount} ${unit}, start`)
      t.equal(after?.end, before?.end, 'end restored')
      t.equal(after?.timezone, before?.timezone, 'named zone restored')
    })
  })
  t.end()
})

test(here + 'relative dates use the same reference throughout a chain', t => {
  const inputs = ['today', 'tomorrow', 'yesterday', 'next Friday', 'Christmas 2020']
  inputs.forEach(input => {
    const dates = nlp(input).dates(options)
    const before = dates.get(0)?.start
    t.equal(dates.add(10, 'days').subtract(10, 'days').get(0)?.start, before, input)
  })
  t.end()
})

test(here + 'fractional weeks preserve the partial day', t => {
  const cases = [
    [0.5, 'week', '2020-06-18T12:00:00.000Z'],
    [1.5, 'weeks', '2020-06-25T12:00:00.000Z'],
    [-0.5, 'week', '2020-06-11T12:00:00.000Z'],
    [0.25, 'weeks', '2020-06-16T18:00:00.000Z'],
    [0.25, 'fortnight', '2020-06-18T12:00:00.000Z'],
  ]
  cases.forEach(([amount, unit, expected]) => {
    const doc = nlp('June 15th 2020')
    const shifted = doc.dates(options).add(amount, unit)
    t.equal(shifted.get(0)?.start, expected, `${amount} ${unit}: preserve time`)
    t.equal(doc.dates(options).get(0)?.start, expected, 'fresh selection retains time')
    t.equal(shifted.subtract(amount, unit).get(0)?.start, '2020-06-15T00:00:00.000Z', 'round trip restores midnight')
    const reverse = nlp('June 15th 2020').dates(options).subtract(amount, unit).add(amount, unit)
    t.equal(reverse.get(0)?.start, '2020-06-15T00:00:00.000Z', 'reverse round trip restores midnight')
  })
  t.end()
})

test(here + 'month-end clamping is deliberately not reversible', t => {
  const cases = [
    ['January 31st 2020', 'add', 'subtract', 1, 'month', '2020-01-29'],
    ['January 31st 2021', 'add', 'subtract', 1, 'month', '2021-01-28'],
    ['March 31st 2020', 'subtract', 'add', 1, 'month', '2020-03-29'],
    ['February 29th 2020', 'add', 'subtract', 1, 'year', '2020-02-28'],
  ]
  cases.forEach(([input, first, second, amount, unit, expected]) => {
    const dates = nlp(input).dates(options)[first](amount, unit)[second](amount, unit)
    t.equal(dates.get(0)?.start?.slice(0, 10), expected, input)
  })
  t.end()
})
