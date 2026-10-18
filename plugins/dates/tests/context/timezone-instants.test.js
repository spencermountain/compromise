import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/context/timezone-instants] '

test(here + 'explicit timezone instants — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'explicit timezone instants': [
    // Timestamp expectations are normalized to UTC, including date rollovers.
    ['2026-09-10T16:00:00+02:00', '2026-09-10T14:00:00'],
    ['2026-09-10T16:00:00-04:00', '2026-09-10T20:00:00'],
    ['2026-09-10T00:30:00+02:00', '2026-09-09T22:30:00'],
    ['2026-09-10T23:30:00-04:00', '2026-09-11T03:30:00'],
    ['September 10, 2026 at 4pm UTC', '2026-09-10T16:00:00'],
    ['September 10, 2026 at 4pm GMT', '2026-09-10T16:00:00'],
    ['September 10, 2026 at 4pm GMT+2', '2026-09-10T14:00:00'],
    ['September 10, 2026 at 4pm EDT', '2026-09-10T20:00:00'],
    ['September 10, 2026 at 4pm PDT', '2026-09-10T23:00:00'],
    ['September 10, 2026 at 4pm Asia/Kolkata', '2026-09-10T10:30:00'],
    ['January 10, 2027 at 4pm America/New_York', '2027-01-10T21:00:00'],
    ['July 10, 2027 at 4pm America/New_York', '2027-07-10T20:00:00'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
