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
  // 'near weekdays' - 'this coming' is the next occurrence, 'a week friday' is friday week
  ['this coming friday', '2026-11-06'],
  ['a week friday', '2026-11-13'],
  ['a week wednesday', '2026-11-11'],

  // 'fuzzy positions in a month' - future bias, halves split after the 15th
  ['first half of march', '2027-03-01', '2027-03-15'],
  ['second half of march', '2027-03-16', '2027-03-31'],
  ['mid june', '2027-06-10', '2027-06-20'],
  ['week of march 1', '2027-03-01', '2027-03-07'],
  ['the week of june 5th', '2027-05-31', '2027-06-06'],

  // 'ranges' - 'from .. until' is not reversed; a backwards month-range crosses the year
  ['from September 10 until September 12, 2026', '2026-09-10', '2026-09-12'],
  ['aug to june 1999', '1998-08-01', '1999-06-30'],
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
  ['12 noon', '2026-11-04T12:00:00'],
  ["5 o'clock", '2026-11-04T17:00:00'],
  ['saturday late night', '2026-11-07T23:00:00'],
  ['last night', '2026-11-03T21:00:00', '2026-11-04T06:00:00'],
  ['all day tomorrow', '2026-11-05'],
]

test(here + 'dates', t => {
  arr.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

// one repeat per phrase, with every listed weekday in its filter
test(here + 'repeating dates', t => {
  const rows = [
    ['every monday and wednesday', { monday: true, wednesday: true }],
    ['tuesdays and thursdays', { tuesday: true, thursday: true }],
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

// written-out and single-word durations
test(here + 'durations', t => {
  const rows = [
    ['a fortnight', { week: 2 }],
    ['half an hour', { minute: 30 }],
    ['a decade', { decade: 1 }],
    ['a week and a half', { week: 1.5 }],
    ['2 quarters', { quarter: 2 }],
  ]
  rows.forEach(([text, want]) => {
    t.deepEqual(nlp(text).durations().get(0) || {}, want, text)
  })
  t.end()
})
