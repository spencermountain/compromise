import test from 'tape'
import nlp from './_lib.js'

test('units', function (t) {
  let arr = [
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
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let found = doc.dates({ today: a[0] }).get(0)
    if (!found) {
      console.log(a[0])
    }
    t.equal(found.unit, a[1], '[unit] ' + a[0])
  })
  t.end()
})
