import test from 'tape'
import spacetime from 'spacetime'
import nlp from '../_lib.js'
const here = '[dates/parsing/range-order] '

test(here + 'range start precedes its end', (t) => {
  const context = {
    today: 'january 5 2018',
  }
  const arr = ['eat eggs june 5th to june 7th', 'eat eggs june 5th to 7th', 'eat eggs june 7th to june 5th']
  arr.forEach((str) => {
    const json = nlp(str).dates(context).json()[0] || {}
    const start = spacetime(json.dates.start)
    const end = spacetime(json.dates.end)
    t.equal(start.isBefore(end), true, str)
  })
  t.end()
})

test(here + 'between-ranges are forward-ordered', (t) => {
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
  // was: a reversed range with negative duration
  t.equal(getStart('between friday and sunday'), '2026-07-17T00:00:00.000-04:00', 'starts friday')
  t.equal(getEnd('between friday and sunday'), '2026-07-18T23:59:59.999-04:00', 'ends before sunday')
  // 'between june 2nd and 5th' - inherit the month
  t.equal(getStart('between june 2nd and 5th'), '2027-06-02T00:00:00.000-04:00', 'shared-month start')
  t.equal(getEnd('between june 2nd and 5th'), '2027-06-04T23:59:59.999-04:00', 'shared-month end')
  t.end()
})
