import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/times/spoken-times] '

test(here + 'quarter-to times', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('quarter to five'), '2026-07-11T16:45:00.000-04:00', 'quarter to five')
  t.equal(getStart('at quarter to five'), '2026-07-11T16:45:00.000-04:00', 'at quarter to five')
  t.equal(getStart('at ten to 4'), '2026-07-11T15:50:00.000-04:00', 'at ten to 4')
  t.end()
})
