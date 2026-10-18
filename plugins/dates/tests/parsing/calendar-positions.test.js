import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/parsing/calendar-positions] '

test(here + 'positions within a calendar — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // positions within a calendar
    ['the first day of next month', '2026-10-01'],
    ['the last day of this month', '2026-09-30'],
    ['the last day of February 2028', '2028-02-29'],
    ['the last day of February 2027', '2027-02-28'],
    ['the first Monday of October 2026', '2026-10-05'],
    ['the second Tuesday of October 2026', '2026-10-13'],
    ['the third Wednesday of October 2026', '2026-10-21'],
    ['the fourth Thursday of November 2026', '2026-11-26'],
    ['the fifth Monday of November 2026', '2026-11-30'],
    ['the last Friday of September 2026', '2026-09-25'],
    ['two days before Christmas 2026', '2026-12-23'],
    ['three days after September 30, 2026', '2026-10-03'],
    ['one week before January 1, 2027', '2026-12-25'],
    ['the day after February 28, 2028', '2028-02-29'],
    ['the day after February 28, 2027', '2027-03-01'],
    ['the day before March 1, 2028', '2028-02-29'],
    ['the day after December 31, 2026', '2027-01-01'],
  
    // Business days exclude weekends only; no locale-specific holiday calendar.
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'next-month wraps the year', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  const dec = { today: '2026-12-10', timezone: 'America/New_York' }
  t.equal(getStart('the 5th of next month', dec), '2027-01-05T00:00:00.000-05:00', 'next month in december')
  const jan = { today: '2026-01-10', timezone: 'America/New_York' }
  t.equal(getStart('the 5th of last month', jan), '2025-12-05T00:00:00.000-05:00', 'last month in january')
  t.end()
})
