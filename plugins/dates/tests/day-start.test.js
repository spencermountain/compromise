const test = require('tape')
const spacetime = require('spacetime')
const nlp = require('./_lib')

let arr = [
  'next tuesday',
  'june 5th',
  'in 2020',
  'in august',
  'tomorrow',
  'q2 1999',
  'between june and july',
  'between tuesday and wednesday',
  'june 2nd to 5th 2020',
  'the 5th of august',
  'the 5th to 7th of august',
]

test('day start', function (t) {
  const startTime = '5:30am'
  arr.forEach((str) => {
    let doc = nlp(str)
    let date = doc.dates({ dayStart: startTime }).get(0)
    let have = spacetime(date.start).time()
    t.equal(have, startTime, str)
  })
  t.end()
})

test('day end', function (t) {
  const endTime = '8:30pm'
  arr.forEach((str) => {
    let doc = nlp(str)
    let date = doc.dates({ dayEnd: endTime }).get(0)
    let have = spacetime(date.end).time()
    t.equal(have, endTime, str)
  })
  t.end()
})
