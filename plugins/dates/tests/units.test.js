const test = require('tape')
const nlp = require('./_lib')
const spacetime = require('spacetime')

const fmt = (iso) => (iso ? spacetime(iso).format('{iso-short}') : '-')

test('units', function (t) {
  let arr = [
    ['2020', 'year'],
    ['june 2012', 'month'],
    ['june 9th 2012', 'day'],
    ['next month', 'month'],
    ['next week', 'week'],
    ['next year', 'year'],
    ['next tuesday', 'day'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let found = doc.dates({ today: a[0] }).get(0)
    t.equal(fmt(found.unit), a[1], '[unit] ' + a[0])
  })
  t.end()
})
