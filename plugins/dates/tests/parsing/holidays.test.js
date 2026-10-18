import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
import { checkEnds, checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/parsing/holidays] '

const january = 0
const february = 1
const march = 2
const april = 3
const may = 4
const june = 5
const july = 6
const august = 7
const october = 9
const november = 10
const december = 11

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['april fools', [2016, april, 1]],
    ['april fools at 5pm', [2016, april, 1]],
    ['april fools, 2016', [2016, april, 1]],
    ['halloween', [2016, october, 31]],
    ['halloween 2018', [2018, october, 31]],
    ['independence day', [2016, july, 4]],
    ['easter', [2016, march, 27]],
    ['easter 2017', [2017, april, 16]],
    ['mlk day', [2017, january, 16]],
    ['black friday', [2016, november, 25]],
    ['boxing day', [2016, december, 26]],
    ['groundhog day', [2017, february, 2]],
    ['juneteenth', [2016, june, 19]],
    ['cinco de mayo', [2016, may, 5]],
    ['xmas', [2016, december, 25]],
    ['christmas eve', [2016, december, 24]],
    ['veterans day', [2016, november, 11]],
    ['veterans day 2015', [2015, november, 11]],
    ['presidents day', [2016, february, 15]],
    ['mothers day', [2016, may, 8]],
    ['fathers day', [2016, june, 19]],
    ['halloween at 8pm', [2016, october, 31]],
    ['two days before halloween', [2016, october, 29]],
    ['the day after christmas', [2016, december, 26]],
    ['day after christmas', [2016, december, 26]],
    ['one week before christmas', [2016, december, 18]],
    ['tax day', [2016, april, 15]],
    ['armistice day', [2016, november, 11]],
    ['australia day', [2017, january, 26]],
    ['bastille day', [2016, july, 14]],
    ['canada day', [2016, july, 1]],
    ['victoria day', [2016, may, 23]],
    ['harvey milk day', [2016, may, 22]],
    ['purple heart day', [2016, august, 7]],
    ['national freedom day', [2017, february, 1]],
    ['womens equality day', [2016, august, 26]],
    ['all hallows eve', [2016, october, 31]],
    ['all saints day', [2016, november, 1]],
    ['kwanzaa', [2016, december, 26]],
    ['indigenous peoples day', [2016, october, 10]],
    ['columbus day', [2016, october, 10]],
    ['inauguration day', [2017, january, 20]],
    ['vernal equinox', [2016, march, 20]],
    ['summer solstice', [2016, june, 20]],
    ['winter solstice', [2016, december, 21]],
    ['ramadan', [2016, june, 7]], // tabular civil calendar, not local moon sightings
    ['christmas 2015', [2015, december, 25]],
    ['one day before independence day', [2016, july, 3]],
    ['a week after easter', [2016, april, 3]],
    ['three days before boxing day', [2016, december, 23]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2011, march, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2011, march, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['easter sunday', [2011, april, 24]],
    ['good friday', [2011, april, 22]],
    ['pentecost', [2011, june, 12]],
    ['whit sunday', [2011, june, 12]],
    ['palm sunday', [2011, april, 17]],
    ['maundy thursday', [2011, april, 21]],
    ['holy saturday', [2011, april, 23]],
    ['easter monday', [2011, april, 25]],
    // ['orthodox easter', [2011, april, 24]], // unsupported by spacetime-holiday 0.4.0
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, april, 19], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, april, 19], timezone: 'Canada/Eastern' }
  const rows = [
    ['black friday 2016', [2016, november, 25]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['thanksgiving 2018', [2018, november, 22]],
    ['two weeks after thanksgiving, 2018', [2018, december, 6]],
    ['two days before christmas', [2016, december, 23]],
    ['christmas', [2016, december, 25]],
    ['black friday 2017', [2017, november, 24]],
    ['two days before christmas', [2016, december, 23]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2017, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2017, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['thanksgiving', [2017, november, 23]],
    ['two weeks after thanksgiving', [2017, december, 7]],
    ['this thanksgiving', [2017, november, 23]],
    ['canadian thanksgiving', [2017, october, 9]],
    ['canadian thanksgiving 2018', [2018, october, 8]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['halloween morning', [2016, october, 31]],
    ['halloween night', [2016, october, 31]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 15], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 15], timezone: 'Canada/Eastern' }
  const rows = [
    ['april fools 2019', [2019, april, 1]],
    // ['april fools next year', [2017, april, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'inclusive end dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Pacific' }
  const rows = [
    ['on april fools', [2016, april, 1]],
    ['on april fools, 2016', [2016, april, 1]],
    ['on halloween', [2016, october, 31]],
    ['on christmas', [2016, december, 25]],
    ['on independence day', [2016, july, 4]],
    ['on easter', [2016, march, 27]],
    ['on thanksgiving', [2016, november, 24]],
    ['on mothers day', [2016, may, 8]],
    ['on black friday', [2016, november, 25]],
    ['by christmas', [2016, december, 24]],
    ['by halloween', [2016, october, 30]],
    ['by easter', [2016, march, 26]],
    ['by thanksgiving', [2016, november, 23]],
    ['before christmas', [2016, december, 24]],
    ['before halloween', [2016, october, 30]],
    ['before easter', [2016, march, 26]],
    ['before thanksgiving', [2016, november, 23]],
    ['by mothers day', [2016, may, 7]],
    ['by black friday', [2016, november, 24]],
    ['by independence day', [2016, july, 3]],
    ['by april fools', [2016, march, 31]],
  ]
  checkEnds(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 7, 13], timezone: 'Canada/Pacific' }
  const rows = [
    ['on april fools', 'on Sat, Apr 1st, 2017'],
    ['before christmas', 'by Sun, Dec 25th'],
    // ['after christmas', 'Dec 25th 2016 - Jan 8th 2017'],
    ['on april fools 2020', 'on Wed, Apr 1st, 2020'],
    ['halloween', 'on Mon, Oct 31st'],
    ['christmas', 'on Sun, Dec 25th'],
    ['christmas eve', 'on Sat, Dec 24th'],
    ['thanksgiving', 'on Thurs, Nov 24th'],
    ['independence day', 'on Mon, Jul 4th, 2017'],
    ['easter', 'on Sun, Apr 16th, 2017'],
    ['black friday', 'on Fri, Nov 25th'],
    ['mothers day', 'on Sun, May 14th, 2017'],
    ['fathers day', 'on Sun, Jun 18th, 2017'],
    ['two days before christmas', 'on Fri, Dec 23rd'],
    ['a week after thanksgiving', 'Dec 1st'],
    ['cinco de mayo', 'on Thu, May 5th, 2017'],
    ['juneteenth', 'on Mon, Jun 19th, 2017'],
    ['groundhog day', 'on Thu, Feb 2nd, 2017'],
    ['presidents day', 'on Mon, Feb 20th, 2017'],
    ['veterans day', 'on Fri, Nov 11th'],
    ['boxing day', 'on Mon, Dec 26th'],
    ['april fools', 'on Sat, Apr 1st, 2017'],
    ['by christmas', 'by Sun, Dec 25th'],
    ['tax day', 'on Sat, Apr 15th, 2017'],
    ['armistice day', 'on Fri, Nov 11th'],
    ['bastille day', 'on Fri, Jul 14th, 2017'],
    ['canada day', 'on Sat, Jul 1st, 2017'],
    ['victoria day', 'on Mon, May 22nd, 2017'],
    ['kwanzaa', 'on Mon, Dec 26th'],
    ['all saints day', 'on Tue, Nov 1st'],
    ['all hallows eve', 'on Mon, Oct 31st'],
    ['mlk day', 'on Mon, Jan 16th, 2017'],
    ['one week before christmas', 'on Sun, Dec 18th'],
    ['two days after easter', 'on Tue, Apr 18th, 2017'],
    ['a week after easter', 'on Sun, Apr 23rd, 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    ['on april fools 2020', 'Wed, Apr 1st, 2020'],
    ['april fools at 5pm', 'Wed, Apr 1st, 2017 at 5:00pm'],
    ['thanksgiving 2018', 'nov 22 2018'],
    ['halloween', 'Oct 31 2016'],
    ['christmas', 'Dec 25 2016'],
    ['thanksgiving', 'Nov 24 2016'],
    ['canadian thanksgiving 2016', 'Oct 10 2016'],
    ['cinco de mayo 2017', 'may 5 2017'],
    ['independence day 2017', 'jul 4 2017'],
    ['halloween 2016', 'Oct 31 2016'],
    ['xmas', 'Dec 25 2016'],
    ['christmas eve', 'Dec 24 2016'],
    ['pentecost 2017', 'jun 4 2017'],
    ['black friday 2016', 'Nov 25 2016'],
    ['easter 2017', 'apr 16 2017'],
    ['good friday 2017', 'apr 14 2017'],
    ['presidents day 2017', 'feb 20 2017'],
    ['mlk day 2017', 'jan 16 2017'],
    ['bastille day 2017', 'jul 14 2017'],
    ['canada day 2017', 'jul 1 2017'],
    ['groundhog day 2017', 'feb 2 2017'],
    ['one week before christmas', 'dec 18 2016'],
    ['two weeks after thanksgiving', 'dec 8 2016'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2017, 0, 1], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2017, 0, 1], timezone: 'Canada/Pacific' }
  const rows = [
    ['christmas 2017', 'dec 25 2017'],
    ['thanksgiving 2017', 'nov 23 2017'],
    ['halloween 2017', 'oct 31 2017'],
    ['black friday 2017', 'nov 24 2017'],
    ['one week before christmas', 'dec 18 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [
    ['until christmas', '2020-01-21 to 2020-12-25'],
    ['until next christmas', '2020-01-21 to 2021-12-25'],
    [`until easter`, `2020-01-21 to 2020-04-12`],
    [`until halloween`, `2020-01-21 to 2020-10-31`],
    [`christmas`, `2020-12-25`],
    [`christmas 2020`, `2020-12-25`],
    [`xmas`, `2020-12-25`],
    [`halloween`, `2020-10-31`],
    [`thanksgiving`, `2020-11-26`],
    [`thanksgiving 2020`, `2020-11-26`],
    [`independence day`, `2020-07-04`],
    [`easter`, `2020-04-12`],
    [`easter sunday`, `2020-04-12`],
    [`good friday`, `2020-04-10`],
    [`presidents day`, `2020-02-17`],
    [`mothers day`, `2020-05-10`],
    [`fathers day`, `2020-06-21`],
    [`black friday`, `2020-11-27`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'named holidays — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'named holidays': [
    ['Christmas 2026', '2026-12-25'],
    ['Christmas Eve 2026', '2026-12-24'],
    ['Halloween 2026', '2026-10-31'],
    ['Christmas morning 2026 at 9am', '2026-12-25T09:00:00'],
    ['from Christmas Eve to Boxing Day 2026', '2026-12-24', '2026-12-26'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'holidays honor an explicit year', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  // easter 2026 already happened - but the year is explicit
  t.equal(getStart('easter 2026'), '2026-04-05T00:00:00.000-04:00', 'easter 2026')
  t.equal(getStart('easter 2030'), '2030-04-21T00:00:00.000-04:00', 'easter 2030')
  t.equal(getStart('thanksgiving 2021'), '2021-11-25T00:00:00.000-05:00', 'thanksgiving 2021')
  // asking on the day itself, in the afternoon
  const xmas = { today: '2026-12-25T13:00:00', timezone: 'America/New_York' }
  t.equal(getStart('christmas', xmas), '2026-12-25T00:00:00.000-05:00', 'christmas on christmas-day')
  t.end()
})
