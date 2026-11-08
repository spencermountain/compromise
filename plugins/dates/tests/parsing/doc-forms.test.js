import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/parsing/doc-forms] '

// forms found missing while writing docs/dates.md - Wednesday, November 4, 2026
const context = { today: '2026-11-04T10:00:00', timezone: 'Etc/UTC' }

test(here + 'weekday idioms', t => {
  const rows = [
    ['a week friday', '2026-11-13'],
    ['a week wednesday', '2026-11-11'],
    ['a week from friday', '2026-11-13'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'ranges', t => {
  const rows = [
    ['from September 10 until September 12, 2026', '2026-09-10', '2026-09-12'],
    ['from june 5 until june 7', '2027-06-05', '2027-06-07'],
    ['aug to june 1999', '1998-08-01', '1999-06-30'],
    ['may to january 2020', '2019-05-01', '2020-01-31'],
    ['january to march 2027', '2027-01-01', '2027-03-31'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'times', t => {
  const rows = [
    ['12 noon', '2026-11-04T12:00:00'],
    ['12 midnight', '2026-11-04T00:00:00'],
    ['tomorrow at 12 noon', '2026-11-05T12:00:00'],
    ['june 12 noon', '2027-06-12T12:00:00'],
    ["5 o'clock", '2026-11-04T17:00:00'],
    ["at 5 o'clock pm", '2026-11-04T17:00:00'],
    ["single o'clock", null],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'repeating dates with several weekdays', t => {
  const rows = [
    ['every monday and wednesday', { monday: true, wednesday: true }, 'AND'],
    ['any tuesday or thursday', { tuesday: true, thursday: true }, 'OR'],
    ['tuesdays and thursdays', { tuesday: true, thursday: true }, 'OR'],
    ['every tuesday', { tuesday: true }, 'AND'],
  ]
  rows.forEach(([text, weekDays, choose]) => {
    const res = nlp(text).dates(context).get()
    t.equal(res.length, 1, text + ': one result')
    t.deepEqual(res[0]?.repeat?.filter?.weekDays, weekDays, text + ': weekdays')
    t.equal(res[0]?.repeat?.choose, choose, text + ': choose')
  })
  t.end()
})

test(here + 'written-out durations', t => {
  const rows = [
    ['a fortnight', { week: 2 }],
    ['half an hour', { hour: 0.5 }],
    ['a decade', { decade: 1 }],
    ['a week and a half', { week: 1.5 }],
    ['an hour', { hour: 1 }],
    ['two hours and 8 mins', { hour: 2, minute: 8 }],
  ]
  rows.forEach(([text, want]) => {
    t.deepEqual(nlp(text).durations().get(0) || {}, want, text)
  })
  t.end()
})
