const test = require('tape')
const nlp = require('./_lib')
const spacetime = require('spacetime')
//single-date tests

//yep,
let january = 0
let february = 1
let march = 2
let april = 3
let may = 4
let june = 5
let july = 6
let august = 7
let september = 8
let october = 9
let november = 10
let december = 11

const tests = [
  {
    today: [2016, february, 11],
    tests: [
      ['on october 2nd', [2016, october, 2]],
      ['on 2nd of march', [2016, march, 2]],
      ['on 2nd of march, 2016', [2016, march, 2]],
      ['on may 22nd', [2016, may, 22]],
      ['on tuesday march 22nd', [2016, march, 22]],
      ['on tuesday january 22nd, 2016', [2016, january, 22]],
      ['on 22 april 2016', [2016, april, 22]],
      ['on april 22nd', [2016, april, 22]],
      ['on 22nd of april', [2016, april, 22]],
      ['on the 22nd of april, 2016', [2016, april, 22]],
      ['on april 1st, 2016', [2016, april, 1]],
      ['on april 1st', [2016, april, 1]],
      ['on tuesday, april the 1st', [2016, april, 1]],
      ['on tuesday april 1st, 2016', [2016, april, 1]],
      ['on june 2nd', [2016, june, 2]],
      ['4:32 on march 2nd', [2016, march, 2]],
      ['at 2 oclock march 2nd', [2016, march, 2]],
      ['sometime tomorrow before 3', [2016, february, 12]],
      ['on 1999/12/25', [1999, december, 25]],
      ['on 4:23am july 5th ', [2016, july, 5]],

      ['@ 5pm march 2nd', [2016, march, 2]],
      // ['on 5 pacific time march 2nd', [2016, march, 2]],
      // ['on the day after next', [2016, february, 13]],
      // ['the last weekend in october', [2016, october, 30]],
      // ['the last weekend this month', [2016, february, 27]],
      // ['around 1pm pacific time, july 5th ', [2016, july, 5]],
    ],
  },
]

test('end dates', (t) => {
  Object.keys(tests).forEach((k) => {
    const context = {
      today: tests[k].today,
      timezone: 'Canada/Pacific',
    }
    tests[k].tests.forEach((a) => {
      let want = spacetime(a[1], context.timezone).endOf('day').iso()
      let json = nlp(a[0]).dates(context).json()[0]
      let end = json.date.end
      t.equal(end, want, a[0])
    })
  })
  t.end()
})
