import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/parsing/sentences] '

test(here + 'dates inside sentences — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'dates inside ordinary sentences'
    ['May I book a table for tomorrow?', '2026-09-11'],
    ['May will join us on September 12, 2026.', '2026-09-12'],
    ['March the band onto the field tomorrow.', '2026-09-11'],
    ['Order 4 pizzas for Friday at 6pm.', '2026-09-11T18:00:00'],
    ['Room 12 is booked for tomorrow at 3pm.', '2026-09-11T15:00:00'],
    ['Flight 2026 leaves on September 12 at 9am.', '2026-09-12T09:00:00'],
    ['Version 3.10 ships on October 1, 2026.', '2026-10-01'],
    ['I paid $10.50 yesterday.', '2026-09-09'],
    ['It takes 30 minutes; meet me tomorrow at noon.', '2026-09-11T12:00:00'],
    ['On September 10, 2026, I bought 20 books.', '2026-09-10'],
    ['The deadline is September 30, 2026 (not a price).', '2026-09-30'],
    ['See you tomorrow!', '2026-09-11'],
    ['Can we meet\ntomorrow at 4pm?', '2026-09-11T16:00:00'],
    ['Meet me on September\t12, 2026.', '2026-09-12'],
    ['I will visit on May 5.', '2027-05-05'],
    ['We will meet in March.', '2027-03-01', '2027-03-31'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'spelled-out 22nd and 32nd — today=2026-01-01, timezone=Etc/UTC', t => {
  const context = { today: '2026-01-01', timezone: 'Etc/UTC' }
  const rows = [
    ['We fly out on May twenty-second.', '2026-05-22'],
    ['The party is on June twenty second.', '2026-06-22'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
