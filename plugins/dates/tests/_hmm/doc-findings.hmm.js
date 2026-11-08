import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[plugins/dates/doc-findings] '

// Forms that parsed wrong, or not at all, while generating docs/dates.md.
// Expectations, not snapshots. Wednesday, November 4, 2026 at 10am.
// Same row format and policies as missing-forms.hmm.js.
const context = {
  today: '2026-11-04T10:00:00',
  timezone: 'Etc/UTC',
}

const arr = [
  // 'near weekdays' - 'this coming' is the next occurrence
  ['this coming friday', '2026-11-06'],

  // 'fuzzy positions in a month' - future bias, halves split after the 15th
  ['first half of march', '2027-03-01', '2027-03-15'],
  ['second half of march', '2027-03-16', '2027-03-31'],
  ['mid june', '2027-06-10', '2027-06-20'],
  ['week of march 1', '2027-03-01', '2027-03-07'],
  ['the week of june 5th', '2027-05-31', '2027-06-06'],

  // 'ranges'
  ['jan 5th 2008 to Jan 6th the following year', '2008-01-05', '2009-01-06'],
  ['between june and july', '2027-06-01'],
  ['through march 1', '2026-11-04', '2027-03-01'],
  ['since 2020', '2020-01-01', '2026-11-04'],

  // 'rolling windows'
  ['the next 3 days', '2026-11-05', '2026-11-07'],
  ['the last 3 days', '2026-11-01', '2026-11-03'],
  ['within 2 weeks', '2026-11-04', '2026-11-18'],

  // 'holidays' - 'next' is the next occurrence, not the one after
  ['next halloween', '2027-10-31'],
  ['labor day', '2027-09-06'],

  // 'times and dayparts'
  ['breakfast time', '2026-11-04T08:00:00'],
  ['saturday late night', '2026-11-07T23:00:00'],
  ['last night', '2026-11-03T21:00:00', '2026-11-04T06:00:00'],
  ['all day tomorrow', '2026-11-05'],
]

test(here + 'dates', t => {
  arr.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

// bare frequency words
test(here + 'repeating dates', t => {
  const rows = [
    ['daily', {}],
    ['weekly', {}],
    ['every morning', {}],
  ]
  rows.forEach(([text, weekDays]) => {
    const res = nlp(text).dates(context).get()
    t.equal(res.length, 1, text + ': one result')
    t.ok(res[0]?.repeat, text + ': is a repeat')
    t.deepEqual(res[0]?.repeat?.filter?.weekDays || {}, weekDays, text + ': weekdays')
  })
  t.end()
})

// plural quarters are not a duration unit
test(here + 'durations', t => {
  const rows = [
    ['2 quarters', { quarter: 2 }],
  ]
  rows.forEach(([text, want]) => {
    t.deepEqual(nlp(text).durations().get(0) || {}, want, text)
  })
  t.end()
})
