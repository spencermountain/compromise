import test from 'tape'
import nlp from './_lib.js'
import spacetime from 'spacetime'
//single-date tests

//yep,
const january = 0
const february = 1
const march = 2
const april = 3
const may = 4
const june = 5
const july = 6
const august = 7
const september = 8
const october = 9
const november = 10
const december = 11

const tests = [
  {
    today: [2016, february, 11], //thursday
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
      // ['sometime tomorrow before 3', [2016, february, 12]],
      ['on 1999/12/25', [1999, december, 25]],
      ['on 4:23am july 5th ', [2016, july, 5]],
      ['@ 5pm march 2nd', [2016, march, 2]],
      // ['on 5 pacific time march 2nd', [2016, march, 2]],
      ['around 1pm pacific time, july 5th', [2016, july, 5]],
      // ['on the day after next', [2016, february, 13]],
      // ['the last weekend in october', [2016, october, 30]],
      // ['the last weekend this month', [2016, february, 27]],
      ['between monday and tuesday', [2016, february, 15]], //'exclusive' between
    ],
  },
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

test('end dates', (t) => {
  Object.keys(tests).forEach((k) => {
    const context = {
      today: tests[k].today,
      timezone: 'Canada/Pacific',
    }
    const today = tests[k].today.join('-')
    tests[k].tests.forEach((a) => {
      const want = spacetime(a[1], context.timezone).endOf('day').iso()
      const json = nlp(a[0]).dates(context).json()[0] || { dates: {} }
      t.equal(json.dates.end, want, `[${today}] ${a[0]}`)
    })
  })
  t.end()
})
