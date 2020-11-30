const test = require('tape')
const nlp = require('./_lib')
const spacetime = require('spacetime')

const fmt = (iso) => (iso ? spacetime(iso).format('{iso-short}') : '-')

test('this monday', function (t) {
  let arr = [
    ['2020-12-7', '2020-12-07'], //mon (itself)
    ['2020-12-8', '2020-12-14'], //tues
    ['2020-12-9', '2020-12-14'], //wed
    ['2020-12-10', '2020-12-14'], //thu
    ['2020-12-11', '2020-12-14'], //fri
    ['2020-12-12', '2020-12-14'], //sat
    ['2020-12-13', '2020-12-14'], //sun
  ]
  arr.forEach((a) => {
    let doc = nlp('this monday')
    let found = doc.dates({ today: a[0] }).json()[0]
    t.equal(fmt(found.date.start), a[1], 'monday-start')
    t.equal(fmt(found.date.end), a[1], 'monday-end')
  })
  t.end()
})

// test('last monday', function (t) {
//   let arr = [
//     ['2020-12-7', '2020-11-30'], //mon (obvious)
//     ['2020-12-8', '2020-11-30'], //tues
//     ['2020-12-9', '2020-11-30'], //wed
//     ['2020-12-10', '2020-11-30'], //thu
//     ['2020-12-11', '2020-11-30'], //fri
//     ['2020-12-12', '2020-11-30'], //sat
//     ['2020-12-13', '2020-11-30'], //sun
//   ]
//   arr.forEach((a) => {
//     let doc = nlp('last monday')
//     let found = doc.dates({ today: a[0] }).json()[0]
//     t.equal(fmt(found.date.start), a[1], 'last-monday-start')
//     t.equal(fmt(found.date.end), a[1], 'last-monday-end')
//   })
//   t.end()
// })
