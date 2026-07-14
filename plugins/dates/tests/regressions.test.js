import test from 'tape'
import nlp from './_lib.js'

const context = {
  today: '2026-07-11', //saturday
  timezone: 'America/New_York',
}
const getStart = (str, ctx = context) => {
  const res = nlp(str).dates(ctx).get()[0]
  return res ? res.start : null
}
const getEnd = (str, ctx = context) => {
  const res = nlp(str).dates(ctx).get()[0]
  return res ? res.end : null
}

test('holidays honor an explicit year', (t) => {
  // easter 2026 already happened - but the year is explicit
  t.equal(getStart('easter 2026'), '2026-04-05T00:00:00.000-04:00', 'easter 2026')
  t.equal(getStart('easter 2030'), '2030-04-21T00:00:00.000-04:00', 'easter 2030')
  t.equal(getStart('thanksgiving 2021'), '2021-11-25T00:00:00.000-05:00', 'thanksgiving 2021')
  // asking on the day itself, in the afternoon
  const xmas = { today: '2026-12-25T13:00:00', timezone: 'America/New_York' }
  t.equal(getStart('christmas', xmas), '2026-12-25T00:00:00.000-05:00', 'christmas on christmas-day')
  t.end()
})

test('overnight time-ranges cross midnight', (t) => {
  t.equal(getStart('from 10pm to 2am'), '2026-07-11T22:00:00.000-04:00', '10pm-2am start')
  t.equal(getEnd('from 10pm to 2am'), '2026-07-12T02:00:00.000-04:00', '10pm-2am end')
  // explicit 'am' should not become pm
  t.equal(getStart('11pm to 2am january 5th'), '2027-01-05T23:00:00.000-05:00', 'explicit-am start')
  t.equal(getEnd('11pm to 2am january 5th'), '2027-01-06T02:00:00.000-05:00', 'explicit-am end')
  t.end()
})

test('between-ranges are forward-ordered', (t) => {
  // was: a reversed range with negative duration
  t.equal(getStart('between friday and sunday'), '2026-07-17T00:00:00.000-04:00', 'starts friday')
  t.equal(getEnd('between friday and sunday'), '2026-07-18T23:59:59.999-04:00', 'ends before sunday')
  // 'between june 2nd and 5th' - inherit the month
  t.equal(getStart('between june 2nd and 5th'), '2027-06-02T00:00:00.000-04:00', 'shared-month start')
  t.equal(getEnd('between june 2nd and 5th'), '2027-06-04T23:59:59.999-04:00', 'shared-month end')
  t.end()
})

test('end of the month', (t) => {
  t.equal(getStart('end of the month'), '2026-07-31T23:59:59.999-04:00', 'end of the month')
  t.equal(getStart('start of the month'), '2026-07-01T00:00:00.000-04:00', 'start of the month')
  t.equal(getStart('end of the year'), '2026-12-31T23:59:59.999-05:00', 'end of the year')
  t.end()
})

test('day after next', (t) => {
  t.equal(getStart('day after next'), '2026-07-13T00:00:00.000-04:00', 'day after next')
  t.equal(getStart('the week after next'), '2026-07-20T00:00:00.000-04:00', 'week after next')
  t.equal(getStart('the weekend after next'), '2026-07-25T00:00:00.000-04:00', 'weekend after next')
  const wed = { today: '2026-07-08', timezone: 'America/New_York' }
  t.equal(getStart('the saturday after next', wed), '2026-07-18T00:00:00.000-04:00', 'saturday after next')
  t.end()
})

test('next-month wraps the year', (t) => {
  const dec = { today: '2026-12-10', timezone: 'America/New_York' }
  t.equal(getStart('the 5th of next month', dec), '2027-01-05T00:00:00.000-05:00', 'next month in december')
  const jan = { today: '2026-01-10', timezone: 'America/New_York' }
  t.equal(getStart('the 5th of last month', jan), '2025-12-05T00:00:00.000-05:00', 'last month in january')
  t.end()
})

test('relative shifts', (t) => {
  t.equal(getStart('two weeks hence'), '2026-07-25T00:00:00.000-04:00', 'hence is the future')
  t.equal(getStart('in a few weeks'), '2026-08-01T00:00:00.000-04:00', 'a few is 3')
  t.equal(getStart('in a couple of weeks'), '2026-07-25T00:00:00.000-04:00', 'a couple of')
  t.equal(getStart('a few days ago'), '2026-07-08T00:00:00.000-04:00', 'a few days ago')
  const noon = { today: '2026-07-11T12:00:00', timezone: 'America/New_York' }
  t.equal(getStart('in half an hour', noon), '2026-07-11T12:30:00.000-04:00', 'half an hour is 30min')
  t.equal(getStart('half an hour ago', noon), '2026-07-11T11:30:00.000-04:00', 'half an hour ago')
  t.equal(getStart('2 years, 4 months, and 5 days ago'), '2024-03-06T00:00:00.000-05:00', 'multi-unit shift')
  t.equal(getStart('a week and a half before'), '2026-06-30T12:00:00.000-04:00', 'a week and a half')
  t.equal(getStart('in a year and a half'), '2028-01-11T00:00:00.000-05:00', 'in a year and a half')
  t.end()
})

test('nth weekday of month', (t) => {
  const ctx = { today: '2021-01-01', timezone: 'America/New_York' }
  t.equal(getStart('the second monday of february', ctx), '2021-02-08T00:00:00.000-05:00', '2nd monday')
  t.equal(getStart('first monday of february', ctx), '2021-02-01T00:00:00.000-05:00', 'first monday')
  t.equal(getStart('last monday of february', ctx), '2021-02-22T00:00:00.000-05:00', 'last monday')
  const jan = { today: '2026-01-11', timezone: 'America/New_York' }
  t.equal(getStart('2nd weekend of june', jan), '2026-06-13T00:00:00.000-04:00', '2nd weekend')
  t.end()
})

test('march/may as verbs', (t) => {
  t.equal(getStart('the soldiers march tomorrow'), '2026-07-12T00:00:00.000-04:00', 'march tomorrow → tomorrow')
  t.equal(getStart('you may tomorrow find peace'), '2026-07-12T00:00:00.000-04:00', 'may tomorrow → tomorrow')
  t.equal(getStart('may 2020'), '2020-05-01T00:00:00.000-04:00', 'may 2020 still works')
  t.equal(getStart('march 5th'), '2027-03-05T00:00:00.000-05:00', 'march 5th still works')
  t.end()
})

test('quarter-to times', (t) => {
  t.equal(getStart('quarter to five'), '2026-07-11T16:45:00.000-04:00', 'quarter to five')
  t.equal(getStart('at quarter to five'), '2026-07-11T16:45:00.000-04:00', 'at quarter to five')
  t.equal(getStart('at ten to 4'), '2026-07-11T15:50:00.000-04:00', 'at ten to 4')
  t.end()
})

test('year windows', (t) => {
  t.equal(getStart('2030'), '2030-01-01T00:00:00.000-05:00', 'bare 2030')
  t.equal(getStart('2045'), '2045-01-01T00:00:00.000-05:00', 'bare 2045')
  t.equal(getStart(`june of '98`), '1998-06-01T00:00:00.000-04:00', `june of '98`)
  t.equal(getStart(`summer of '69`), '1969-06-01T00:00:00.000-04:00', `summer of '69`)
  t.equal(getStart('may 97'), '1997-05-01T00:00:00.000-04:00', 'may 97')
  t.end()
})

test('timezone handling', (t) => {
  t.equal(getStart('4pm JST'), '2026-07-11T16:00:00.000+09:00', 'jst resolves')
  t.equal(getStart('4pm SGT'), '2026-07-11T16:00:00.000+08:00', 'sgt resolves')
  t.equal(getStart('4pm GMT+9'), '2026-07-11T16:00:00.000+09:00', 'gmt+9 is utc+9')
  t.equal(getStart('3pm utc-5'), '2026-07-11T15:00:00.000-05:00', 'utc-5')
  t.equal(getStart('5pm utc+13'), '2026-07-11T17:00:00.000+13:00', 'utc+13')
  // an unknown zone should not kill the parse
  t.equal(getStart('4pm XQZT'), '2026-07-11T16:00:00.000-04:00', 'unknown zone is non-fatal')
  t.equal(getStart('3pm cst'), '2026-07-11T15:00:00.000-05:00', 'cst is chicago')
  t.equal(getStart('3pm central time'), '2026-07-11T15:00:00.000-05:00', 'central time')
  const notMidnight = { today: '2026-07-11T15:00:00', timezone: 'America/New_York' }
  t.equal(getStart('now pst', notMidnight), '2026-07-11T15:00:00.000-07:00', 'now pst keeps the time')
  t.end()
})

test('repeating dates surface in json', (t) => {
  const res = nlp('every tuesday').dates(context).get()
  t.equal(res.length, 1, 'every tuesday found')
  t.ok(res[0].repeat, 'has repeat info')
  t.ok(res[0].repeat.filter.weekDays.tuesday, 'tuesday filter')
  const july = nlp('weekends in july').dates(context).get()[0]
  t.ok(july.repeat && july.repeat.filter.weekDays.saturday, 'weekends in july')
  t.equal(july.start, '2026-07-01T00:00:00.000-04:00', 'july range start')
  t.end()
})

test('unit field', (t) => {
  const res = nlp('june 9th 2012').dates(context).get()[0]
  t.equal(res.unit, 'day', 'june 9th is a day')
  const range = nlp('jan 1 to dec 31').dates(context).get()[0]
  t.equal(range.unit, 'year', 'jan 1 to dec 31 is a year')
  t.end()
})

test('times api shape', (t) => {
  t.deepEqual(nlp('hello world').times().get(), [], 'empty is an array')
  const one = nlp('at 4:30pm').times().get(0)
  t.equal(one.time, '4:30pm', 'get(0) is an object')
  t.end()
})

test('eod is end-of-day', (t) => {
  t.equal(getStart('due eod'), '2026-07-11T22:00:00.000-04:00', 'due eod')
  t.end()
})

test('a range does not stop other dates from splitting', (t) => {
  const res = nlp('it runs between june and july. see me june 5, june 10').dates(context).get()
  t.equal(res.length, 3, 'three dates found')
  t.end()
})
