import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/parsing/approximate-dates] '

test(here + 'approximate language — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'soft ranges and approximate language
    ['sometime in October 2026', '2026-10-01', '2026-10-31'],
    ['at some point next week', '2026-09-14', '2026-09-20'],
  
    // Approximate points retain their stated center; no invented tolerance.
    ['around September 20, 2026', '2026-09-20'],
    ['on or about September 20, 2026', '2026-09-20'],
    ['roughly two weeks from today', '2026-09-24'],
    ['tomorrow at about 3pm', '2026-09-11T15:00:00'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
