const test = require('tape')
const spacetime = require('spacetime')
const nlp = require('./_lib')

let arr = ['next tuesday', 'june 5th', 'in 2020', 'in august', 'tomorrow', 'q2 1999']

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
