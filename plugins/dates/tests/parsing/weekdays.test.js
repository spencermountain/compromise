import test from 'tape'
import nlp from '../_lib.js'
import { checkEnds, checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/parsing/weekdays] '

const january = 0
const february = 1
const march = 2
const april = 3
const may = 4
const june = 5
const september = 8
const october = 9

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['tuesday march 22nd', [2016, march, 22]],
    ['tuesday march 22nd, 2016', [2016, march, 22]],
    ['tuesday, april the 1st', [2016, april, 1]],
    ['tuesday april 1st, 2016', [2016, april, 1]],
    ['next monday', [2016, february, 15]],
    ['last friday', [2016, february, 5]],
    ['this monday', [2016, february, 15]],
    ['this friday', [2016, february, 12]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 10], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 10], timezone: 'Canada/Eastern' }
  const rows = [
    ['friday the 6th', [2016, march, 6]],
    ['friday on the 6th', [2016, march, 6]],
    // ['6th on friday', [2016, february, 12]],
    // ['6th this friday', [2016, february, 12]],
    // ['6 on friday', [2016, february, 12]],
    // ['6 this friday', [2016, february, 12]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2011, march, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2011, march, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['this past monday', [2011, march, 21]],
    ['this past friday', [2011, march, 25]],
    ['next monday', [2011, april, 4]],
    ['next mon', [2011, april, 4]],
    // ['4 mondays from now', [2011, april, 25]],
    // ['4 mondays from today', [2011, april, 25]],
    // ['six mondays ago', [2011, february, 21]],
    ['last monday', [2011, march, 21]],
    ['last mon', [2011, march, 21]],
    // ['this past mon', [2011, march, 21]],
    ['this coming mon', [2011, april, 4]],
    ['this upcoming mon', [2011, april, 4]],
    // ['next thurs', [2011, april, 7]],
    // ['tues this week', [2011, march, 29]],
    // ['tuesday this week', [2011, march, 29]],
    // ['tuesday next week', [2011, april, 5]],
    // ['the saturday after next', [2011, april, 16]],
    // ['the monday after next', [2011, april, 11]],
    // ['the monday after next monday', [2011, april, 14]],
    // ['the monday before May 25', [2011, june, 23]],
    // ['the 2nd monday before May 25', [2011, june, 16]],
    // ['3 mondays after May 25', [2011, july, 13]],
    // ['tuesday before last', [2011, march, 15]],
    ['a week after this friday', [2011, april, 8]],
    ['a week from this friday', [2011, april, 8]],
    ['two weeks from this friday', [2011, april, 15]],
    //     // ['the second week after this friday', [2011, april, 15]],
    // ['A week on tuesday', [2011, april, 5]],
    // ['first monday in 1 month', [2011, april, 4]],
    // ['first monday of month in 1 month', [2011, april, 4]],
    // ['first monday of 1 month', [2011, april, 4]],
    // ['first monday in 2 months', [2011, may, 2]],
    // ['first monday of 2 months', [2011, may, 2]],
    // ['first monday of month 2 months', [2011, may, 2]],
    // ['first monday of month in 2 months', [2011, may, 2]],
    // ['first monday in 3 months', [2011, june, 6]],
    // ['first monday of 3 months', [2011, june, 6]],
    // ['first monday of month in 3 months', [2011, june, 6]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 5], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 5], timezone: 'Canada/Eastern' }
  const rows = [
    // //referenced nearby days
    ['this saturday', [2016, february, 6]], //tomorrow
    ['sunday', [2016, february, 7]],
    ['mon', [2016, february, 8]],
    ['tuesday', [2016, february, 9]],
    // ['next wed', [2016, february, 10]],
    // ['this thurs', [2016, february, 11]],
    // ['this friday', [2016, february, 12]], //not today
    ['next friday', [2016, february, 12]], //not today
    // ['friday', [2016, february, 12]], //not today
    //punted weeks with days
    ['this monday', [2016, february, 8]],
    // ['two mondays from now', [2016, february, 22]],
    // ['3 mondays from now', [2016, february, 29]],
    // ['three sundays from now', [2016, february, 28]],
    // ['four mondays from now', [2016, march, 22]], //todo: bug
    // ['next monday', [2016, february, 8]],
    // ['monday next week', [2016, february, 8]],
    // ['the monday after next', [2016, february, 15]],
    // ['the tuesday after next', [2016, february, 16]],
    // ['three thursdays from now', [2016, february, 25]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['thursday the 12th', [2016, may, 12]],
    ['this friday', [2016, may, 13]],
    // ['this wednesday', [2016, may, 18]],
    // ['next tuesday', [2016, may, 17]],
    // ['two days after next tuesday', [2016, may, 19]],
    // ['next thursday', [2016, may, 19]],
    // ['next tuesday', [2016, may, 17]],
    ['wednesday', [2016, may, 11]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['saturday early in the day', [2016, october, 29]],
    ['saturday am', [2016, october, 29]],
    ['saturday pm', [2016, october, 29]],
    ['last sunday', [2016, october, 23]],
    ['this sunday', [2016, october, 30]],
    ['next monday', [2016, october, 31]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 4], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 4], timezone: 'Canada/Eastern' }
  const rows = [
    //(implicit)
    ['wednesday', [2016, october, 5]],
    ['thurs', [2016, october, 6]],
    ['fri', [2016, october, 7]],
    ['on sat', [2016, october, 8]],
    ['sunday', [2016, october, 9]],
    ['monday', [2016, october, 10]],
    ['tuesday', [2016, october, 4]],
    //this
    ['this wednesday', [2016, october, 5]],
    ['this thurs', [2016, october, 6]],
    ['this friday', [2016, october, 7]],
    ['this saturday', [2016, october, 8]],
    ['this sunday', [2016, october, 9]],
    ['this monday', [2016, october, 10]],
    ['this tuesday', [2016, october, 4]],
    ['this past wednesday', [2016, september, 28]],
    ['this coming wednesday', [2016, october, 12]],
    ['this upcoming wednesday', [2016, october, 12]],
    //next
    ['next wednesday', [2016, october, 12]],
    ['next thurs', [2016, october, 13]],
    ['next friday', [2016, october, 14]],
    ['next saturday', [2016, october, 15]],
    // ['next sunday', [2016, october, 9]], //this=next here
    // ['next monday', [2016, october, 10]],
    ['next tuesday', [2016, october, 11]], //this=next here
    //last
    ['last wednesday', [2016, september, 28]],
    ['last thurs', [2016, september, 29]],
    ['last friday', [2016, september, 30]],
    ['last saturday', [2016, october, 1]],
    ['last sunday', [2016, october, 2]],
    ['last monday', [2016, september, 26]],
    ['last tuesday', [2016, september, 27]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }
  const rows = [
    ['next saturday', [2017, october, 14]],
    ['last saturday', [2017, september, 30]],
    ['this saturday', [2017, october, 7]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'inclusive end dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Pacific' }
  const rows = [
    ['on tuesday march 22nd', [2016, march, 22]],
    ['on tuesday january 22nd, 2016', [2016, january, 22]],
    ['on tuesday, april the 1st', [2016, april, 1]],
    ['on tuesday april 1st, 2016', [2016, april, 1]],
    ['on wednesday may 5th', [2016, may, 5]],
    ['on tuesday, june the 1st', [2016, june, 1]],
    ['on tuesday june 1st, 2016', [2016, june, 1]],
    ['on monday', [2016, february, 15]],
    ['on next monday', [2016, february, 15]],
    ['on this friday', [2016, february, 12]],
    ['on next tuesday', [2016, february, 16]],
    ['on last friday', [2016, february, 5]],
    ['on this monday', [2016, february, 15]],
    ['on next wednesday', [2016, february, 17]],
  ]
  checkEnds(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 7, 13], timezone: 'Canada/Pacific' }
  const rows = [
    ['monday', 'on Mon, Aug 15th'],
    ['next monday', 'on Mon, Aug 15th'],
    ['last monday', 'on Mon, Aug 1st'],
    ['this monday', 'on Mon, Aug 15th'],
    ['next friday', 'on Fri, Aug 19th'],
    ['this friday', 'on Fri, Aug 19th'],
    ['last friday', 'on Fri, Aug 5th'],
    ['next tuesday', 'on Tues, Aug 16th'],
    ['this tuesday', 'on Tues, Aug 16th'],
    ['sunday', 'on Sun, Aug 14th'],
    ['saturday', 'on Sat, Aug 13th'],
    ['this past monday', 'on Mon, Aug 8th'],
    ['this past friday', 'on Fri, Aug 12th'],
    ['this coming monday', 'on Mon, Aug 15th'],
    ['this upcoming tuesday', 'on Tues, Aug 16th'],
    ['next thursday', 'on Thurs, Aug 18th'],
    ['this thursday', 'on Thurs, Aug 18th'],
    ['next saturday', 'on Sat, Aug 20th'],
    ['last saturday', 'on Sat, Aug 6th'],
    ['this saturday', 'on Sat, Aug 13th'],
    ['next sunday', 'on Sun, Aug 21st'],
    ['last sunday', 'on Sun, Aug 7th'],
    ['this sunday', 'on Sun, Aug 14th'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    ['Sunday, March 6, 2016', 'Mar 6 2016'],
    ['Sunday 12/7/2014', 'Dec 7 2014 to Dec 7 2014'],
    // ['two sundays from now', 'Dec 4th 2016'],
    // ['two mondays from now', 'Dec 5th 2016'],
    ['Tuesday, 10 January', 'Jan 10 2017'],
    ['Monday - Wednesday', 'Nov 28 - Nov 30'],
    ['Tuesday 20/3/2015', 'march 20 2015'],
    // ['this past mon', 'nov 21'],
    // ['two mondays from now', 'dec 5 - dec 5'],
    ['this wednesday', 'Nov 23 2016'],
    ['next wednesday', 'Nov 30 2016'],
    ['last wednesday', 'Nov 16 2016'],
    ['ash wednesday 2017', 'mar 1 2017'],
    ['this past monday', 'Nov 21 2016'],
    ['this past friday', 'Nov 18 2016'],
    ['this upcoming monday', 'Nov 28 2016'],
    ['last tuesday', 'Nov 15 2016'],
    ['next thursday', 'Dec 1 2016'],
    ['last thursday', 'Nov 17 2016'],
    ['next saturday', 'Dec 3 2016'],
    ['last saturday', 'Nov 19 2016'],
    ['this saturday', 'Nov 26 2016'],
    ['next sunday', 'Dec 4 2016'],
    ['last sunday', 'Nov 20 2016'],
    ['this sunday', 'Nov 27 2016'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2017, 0, 1], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2017, 0, 1], timezone: 'Canada/Pacific' }
  const rows = [
    ['this past monday', 'dec 26 2016'],
    ['this past friday', 'dec 30 2016'],
    ['this coming friday', 'jan 6 2017'],
    ['this upcoming monday', 'jan 2 2017'],
    ['next thursday', 'jan 5 2017'],
    ['this thursday', 'jan 5 2017'],
    ['next saturday', 'jan 7 2017'],
    ['this saturday', 'jan 7 2017'],
    ['next sunday', 'jan 8 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [
    [`tues march 2`, '2020-03-02T00:00:00.000-08:00'],
    ['this fri, monday', 'fri jan 24 and mon jan 27'],
    ['next friday, this monday', 'fri jan 31 and mon jan 27'],

    // day of the week
    [`next monday`, '2020-01-27'],
    [`next tuesday`, '2020-01-28'],
    [`last sunday`, '2020-01-19'],
    [`last wednesday`, '2020-01-15'],
    [`last saturday`, '2020-01-18'],
    [`wed march 4`, '2020-03-04T00:00:00.000-08:00'],
    ['this fri, next monday', 'fri jan 24 and mon jan 31'],
    ['next friday, next monday', 'fri jan 31 and mon jan 31'],

    // additional day of the week
    [`last monday`, '2020-01-13'],
    [`last tuesday`, '2020-01-14'],
    [`last friday`, '2020-01-17'],
    [`this monday`, `2020-01-27`],
    [`this wednesday`, `2020-01-22`],
    [`this thursday`, `2020-01-23`],
    [`this friday`, `2020-01-24`],
    [`this saturday`, `2020-01-25`],
    [`this sunday`, `2020-01-26`],
    [`next wednesday`, `2020-01-29`],
    [`next thursday`, `2020-01-30`],
    [`next friday`, `2020-01-31`],
    [`next saturday`, `2020-02-01`],
    [`next sunday`, `2020-02-02`],
    [`last thursday`, `2020-01-16`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'nth weekday of month', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  const ctx = { today: '2021-01-01', timezone: 'America/New_York' }
  t.equal(getStart('the second monday of february', ctx), '2021-02-08T00:00:00.000-05:00', '2nd monday')
  t.equal(getStart('first monday of february', ctx), '2021-02-01T00:00:00.000-05:00', 'first monday')
  t.equal(getStart('last monday of february', ctx), '2021-02-22T00:00:00.000-05:00', 'last monday')
  const jan = { today: '2026-01-11', timezone: 'America/New_York' }
  t.equal(getStart('2nd weekend of june', jan), '2026-06-13T00:00:00.000-04:00', '2nd weekend')
  t.end()
})
