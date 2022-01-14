import test from 'tape'
import nlp from './_lib.js'
// const spacetime = require('spacetime')

test('date-tokenizer', function (t) {
  let arr = [
    ['june 5th, june 10th', 2],
    ['monday, wednesday', 2],
    ['monday, wednesday, friday', 3],
    ['monday, wednesday, and friday', 3],
    ['between monday and friday', 1],
    ['june to august', 1],
    ['june or august', 1],
    ['june through august', 1],
    ['june 2020 or august', 2],
    ['mon tue fri', 3],
    // 'to'
    ['tuesday to friday', 1],
    ['tuesday upto friday', 1],
    ['tuesday until friday', 1],
    ['tuesday through friday', 1],
    ['tuesday - friday', 1],
    ['tuesday - june 1st', 1],
    ['tuesday, wednesday', 2],
    ['tuesday or wednesday', 2],
    // ---weird--
    ['between tuesday and friday', 1],
    ['tuesday and friday', 2],
    ['between june and august', 1],
    // weird
    ['june and august', 2],
    ['june and august 2020', 1],
    ['june, august 9th', 2],
    ['15 march 16 march', 2],
  ]
  arr.forEach((a) => {
    let dates = nlp(a[0]).dates()
    t.equal(dates.length, a[1], a[0])
  })

  t.end()
})
