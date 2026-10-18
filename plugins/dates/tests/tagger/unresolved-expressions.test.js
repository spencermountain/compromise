import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/tagger/unresolved-expressions] '

test(here + 'invalid or unresolved expressions — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'invalid or unresolved expressions': [
    // Reject invalid concrete dates rather than clamp or silently discard the time.
    ['eventually', null],
    ['whenever you are ready', null],
    ['after the meeting', null],
    ['before her birthday', null],
    ['at the usual time', null],
    ['next time', null],
    ['32:14pm', null],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
