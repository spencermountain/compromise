import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/api/units] '

test(here + 'units', function (t) {
  const arr = [
    ['2020', 'year'],
    ['jan 1 to dec 31', 'year'],
    ['jan 1 2020 to dec 31 2020', 'year'],
    ['next year', 'year'],
    // months
    // ['june - july', 'months'],
    // ['sept 2020 - july 2021', 'months'],
    ['june 2012', 'month'],
    ['april 1st-30th', 'month'],
    ['next month', 'month'],
    ['next week', 'week'],
    ['june 9th 2012', 'day'],
    ['june 9th', 'day'],
    ['tomorrow', 'day'],
    ['wednesday', 'day'],
    ['next tuesday', 'day'],
    ['next tuesday at 3pm', 'time'],
    ['3:30pm', 'time'],
    // ['3:30pm-5pm', 'time'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    const found = doc.dates({ today: '2020-06-15', timezone: 'UTC' }).get(0)
    t.equal(found?.unit, a[1], '[unit] ' + a[0])
  })
  t.end()
})

test(here + 'unit field', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const res = nlp('june 9th 2012').dates(context).get()[0]
  t.equal(res.unit, 'day', 'june 9th is a day')
  const range = nlp('jan 1 to dec 31').dates(context).get()[0]
  t.equal(range.unit, 'year', 'jan 1 to dec 31 is a year')
  t.end()
})
