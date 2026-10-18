import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/times/ranges] '

test(here + 'time ranges and dayparts — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'time ranges and dayparts'
    ['today from 2pm to 4pm', '2026-09-10T14:00:00', '2026-09-10T16:00:00'],
    ['today between 2pm and 4pm', '2026-09-10T14:00:00', '2026-09-10T16:00:00'],
    ['tomorrow 9–11am', '2026-09-11T09:00:00', '2026-09-11T11:00:00'],
    ['tomorrow 2-4pm', '2026-09-11T14:00:00', '2026-09-11T16:00:00'],
    ['tomorrow from 11am to 1pm', '2026-09-11T11:00:00', '2026-09-11T13:00:00'],
    ['tomorrow from 09:30 to 17:45', '2026-09-11T09:30:00', '2026-09-11T17:45:00'],
    ['tonight from 11pm to 1am', '2026-09-10T23:00:00', '2026-09-11T01:00:00'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'overnight time-ranges cross midnight', (t) => {
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
  t.equal(getStart('from 10pm to 2am'), '2026-07-11T22:00:00.000-04:00', '10pm-2am start')
  t.equal(getEnd('from 10pm to 2am'), '2026-07-12T02:00:00.000-04:00', '10pm-2am end')
  // explicit 'am' should not become pm
  t.equal(getStart('11pm to 2am january 5th'), '2027-01-05T23:00:00.000-05:00', 'explicit-am start')
  t.equal(getEnd('11pm to 2am january 5th'), '2027-01-06T02:00:00.000-05:00', 'explicit-am end')
  t.end()
})
