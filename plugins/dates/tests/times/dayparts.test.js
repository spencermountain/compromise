import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/times/dayparts] '

test(here + 'eod is end-of-day', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('due eod'), '2026-07-11T22:00:00.000-04:00', 'due eod')
  t.end()
})
