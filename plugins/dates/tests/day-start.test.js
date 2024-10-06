import test from 'tape'
import spacetime from 'spacetime'
import nlp from './_lib.js'

test('day-start edge-cases', function (t) {
  let doc = nlp('in june 2021')
  let date = doc.dates({ dayStart: '8:00am', dayEnd: '6:00pm', timezone: 'Asia/Shanghai' }).get()[0]
  t.equal(date.start, '2021-06-01T08:00:00.000+08:00', 'start')
  t.equal(date.end, '2021-06-30T18:00:00.000+08:00', 'end')
  t.end()
})

let arr = [
  'next tuesday',
  'june 5th',
  'in 2020',
  'in august',
  'tomorrow',
  'q2 1999',
  // 'between june and july',
  'between tuesday and wednesday',
  'june 2nd to 5th 2020',
  'the 5th of august',
  'the 5th to 7th of august',
]

test('day start', function (t) {
  const startTime = '5:30am'
  arr.forEach(str => {
    let doc = nlp(str)
    let date = doc.dates({ dayStart: startTime }).get()[0] || {}
    let have = spacetime(date.start).time()
    t.equal(have, startTime, '[start] ' + str)
  })
  t.end()
})

test('day end', function (t) {
  const endTime = '8:30pm'
  arr.forEach(str => {
    let doc = nlp(str)
    let date = doc.dates({ dayEnd: endTime }).get()[0] || {}
    let have = spacetime(date.end).time()
    t.equal(have, endTime, '[end] ' + str)
  })
  t.end()
})
