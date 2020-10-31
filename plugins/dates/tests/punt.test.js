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
      ['before april the 22nd', [2016, april, 21]],
      ['by march 2nd 2 oclock', [2016, march, 1]],
      ['by august 2nd, 2016', [2016, august, 1]],
      ['by 22 november', [2016, november, 21]],
      ['by march 2nd at 2pm', [2016, march, 1]],
      ['before march 2nd at 2pm', [2016, march, 1]],
      ['before july 5th at 2pm', [2016, july, 4]],
      ['by july 5th, 2:12', [2016, july, 4]],
      ['by september 5th 2pm PST', [2016, september, 4]],
      ['by 1999-12-25', [1999, december, 24]],
      ['before 12/25/1999', [1999, december, 24]],
      ['by tomorrow', [2016, february, 11]],
      // ['by the day after tomorrow', [2016, february, 12]], //by
    ],
  },
]

test('test punt duration', (t) => {
  Object.keys(tests).forEach((k) => {
    const context = {
      today: tests[k].today,
      timezone: 'Canada/Pacific',
      punt: { weeks: 2 },
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
