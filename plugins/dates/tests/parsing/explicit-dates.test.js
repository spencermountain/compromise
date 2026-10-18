import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
import { checkEnds, checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/parsing/explicit-dates] '

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

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['march 2nd', [2016, march, 2]],
    ['2 march', [2016, march, 2]],
    ['2 march 2016', [2016, march, 2]],
    ['march 2nd', [2016, march, 2]],
    ['2nd of march', [2016, march, 2]],
    ['2nd of march, 2016', [2016, march, 2]],
    ['march 2nd, 2016', [2016, march, 2]],
    ['march 22nd', [2016, march, 22]],
    ['april the 22nd', [2016, april, 22]],
    ['22 april', [2016, april, 22]],
    ['22 april 2016', [2016, april, 22]],
    ['april 22nd', [2016, april, 22]],
    ['22nd of april', [2016, april, 22]],
    ['the 22nd of april, 2016', [2016, april, 22]],
    ['april 1st, 2016', [2016, april, 1]],
    ['april 1st', [2016, april, 1]],
    ['march 2nd', [2016, march, 2]],
    ['@ march 2nd', [2016, march, 2]],
    ['new years eve', [2016, december, 31]],
    ['valentines day', [2016, february, 14]],
    ['st patricks day', [2016, march, 17]],
    ['saint patricks day', [2016, march, 17]],
    ['feb 29 2016', [2016, february, 29]],
    ['29 february 2016', [2016, february, 29]],
    ['saint valentines day', [2016, february, 14]],
    ['2016-03-02', [2016, march, 2]],
    ['March 2, 2016', [2016, march, 2]],
    ['2 Mar 2016', [2016, march, 2]],
    ['the 2nd of March 2016', [2016, march, 2]],
    ['march second', [2016, march, 2]],
    ['new years 2017', [2017, january, 1]],
    ['new years day', [2017, january, 1]],
    ['1999/12/25', [1999, december, 25]],
    ['1999-12-25', [1999, december, 25]],
    ['12/25/1999', [1999, december, 25]],
    ['12-25-1999', [1999, december, 25]],
    ['25-12-1999', [1999, december, 25]],
    ['2016/03/13', [2016, march, 13]],
    ['2016/13/03', [2016, march, 13]],
    ['13/03/2016 before 11', [2016, march, 13]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 10], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 10], timezone: 'Canada/Eastern' }
  const rows = [
    // last date chunk wins - part 3, arbitrary edition
    ['due on the 6th', [2016, march, 6]],
    ['on the 6th', [2016, march, 6]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2011, march, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2011, march, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['end of april', [2011, april, 30]],
    ['beginning of may', [2011, may, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, april, 19], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, april, 19], timezone: 'Canada/Eastern' }
  const rows = [
    ['03/03/2016', [2016, march, 3]],
    ['june fifth 2016', [2016, june, 5]],
    ['june five 2016', [2016, june, 5]],
    ['new years', [2017, january, 1]],
    ['december 31st', [2016, december, 31]],
    ['dec 31', [2016, december, 31]],
    ['31 dec 2016', [2016, december, 31]],
    ['jan 1 2017', [2017, january, 1]],
    ['april 20th', [2016, april, 20]],
    ['the 20th of april', [2016, april, 20]],
    ['20th april', [2016, april, 20]],
    ['april twentieth', [2016, april, 20]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['on the 18th', [2016, may, 18]],
    ['may 11th', [2016, may, 11]],
    ['may 13', [2016, may, 13]],
    ['may the 17th', [2016, may, 17]],
    ['may 18th', [2016, may, 18]],
    ['may ninth', [2016, may, 9]],
    ['may nineteenth', [2016, may, 19]],
    ['may 24', [2016, may, 24]],
    ['may twenty five', [2016, may, 25]],
    ['may 26th', [2016, may, 26]],
    ['may 12th, 2018', [2018, may, 12]],
    ['may thirty first', [2016, may, 31]],
    ['may 31st', [2016, may, 31]],
    ['june first', [2016, june, 1]],
    ['june 1st', [2016, june, 1]],
    ['first of june', [2016, june, 1]],
    ['july 5th', [2016, july, 5]],
    ['on july 5th', [2016, july, 5]],
    // ['5/25', [2016, may, 25]],
    ['may nineteenth', [2016, may, 19]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 4], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 4], timezone: 'Canada/Eastern' }
  const rows = [
    ['this day', [2016, october, 4]],
    ['last day', [2016, october, 3]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }
  const rows = [
    ['this day', [2017, october, 7]],
    ['dinnertime', [2017, october, 7]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 1], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 1], timezone: 'Canada/Eastern' }
  const rows = [
    ['on the 1st', [2016, october, 1]],
    ['on the 21st', [2016, october, 21]],
    ['on the 2nd', [2016, october, 2]],
    ['on the 22nd', [2016, october, 22]],
    ['on the 3rd', [2016, october, 3]],
    ['on the 23rd', [2016, october, 23]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 15], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 15], timezone: 'Canada/Eastern' }
  const rows = [
    ['on the 1st', [2016, november, 1]],
    ['on the fourteenth', [2016, november, 14]],
    ['on the sixteenth', [2016, october, 16]],
    ['on the 20th', [2016, october, 20]],
    ['on the 30th', [2016, october, 30]],
    ['on the 10th of october', [2016, october, 10]],
    ['on the 10th october', [2016, october, 10]],
    ['on october 10th', [2016, october, 10]],
    ['on october the 10th', [2016, october, 10]],

    ['March 7th-11th 1987', [1987, march, 7]],
    ['June 1st-11th 1999', [1999, june, 1]],
    ['28th of september thru 5th of october 2008', [2008, september, 28]],
    ['3rd - 5th of March 1969', [1969, march, 3]],
    ['november 10th 2017', [2017, november, 10]],
    ['november 10th 2022', [2022, november, 10]],
    ['november 10th 1998', [1998, november, 10]],
    ['nov 10th, 1998', [1998, november, 10]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

// ['in about one week', [2016, november, 20]],

test(here + 'inclusive end dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Pacific' }
  const rows = [
    ['on october 2nd', [2016, october, 2]],
    ['on 2nd of march', [2016, march, 2]],
    ['on 2nd of march, 2016', [2016, march, 2]],
    ['on may 22nd', [2016, may, 22]],
    ['on 22 april 2016', [2016, april, 22]],
    ['on april 22nd', [2016, april, 22]],
    ['on 22nd of april', [2016, april, 22]],
    ['on the 22nd of april, 2016', [2016, april, 22]],
    ['on april 1st, 2016', [2016, april, 1]],
    ['on april 1st', [2016, april, 1]],
    ['on june 2nd', [2016, june, 2]],
    ['on 1999/12/25', [1999, december, 25]],
    // ['on 5 pacific time march 2nd', [2016, march, 2]],
    ['on march 3rd', [2016, march, 3]],
    ['on 3rd of march', [2016, march, 3]],
    ['on march 3rd, 2016', [2016, march, 3]],
    ['on may 5th', [2016, may, 5]],
    ['on 5 may 2016', [2016, may, 5]],
    ['on may 5th, 2016', [2016, may, 5]],
    ['on 5th of may', [2016, may, 5]],
    ['on the 5th of may, 2016', [2016, may, 5]],
    ['on june 1st', [2016, june, 1]],
    ['on june 1st, 2016', [2016, june, 1]],
    ['on july 4th', [2016, july, 4]],
    ['on 4 july 2016', [2016, july, 4]],
    ['on july 4th, 2016', [2016, july, 4]],
    ['on 4th of july', [2016, july, 4]],
    ['on the 4th of july, 2016', [2016, july, 4]],
    ['on august 15th', [2016, august, 15]],
    ['on september 1st', [2016, september, 1]],
    ['on october 31st', [2016, october, 31]],
    ['on november 11th', [2016, november, 11]],
    ['on december 25th', [2016, december, 25]],
    ['on dec 25th', [2016, december, 25]],
    ['on 25 december 2016', [2016, december, 25]],
    ['on 2016-03-02', [2016, march, 2]],
    ['on 03/02/2016', [2016, march, 2]],
    ['on 2 Mar 2016', [2016, march, 2]],
    ['on march second', [2016, march, 2]],
    ['on @ march 2nd', [2016, march, 2]],
    ['on new years eve', [2016, december, 31]],
    ['on valentines day', [2016, february, 14]],
    ['on the 20th', [2016, february, 20]],
    ['on feb 20th', [2016, february, 20]],
    ['on 20th of february', [2016, february, 20]],
    ['on february 20th, 2016', [2016, february, 20]],
    ['on st patricks day', [2016, march, 17]],
  ]
  checkEnds(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 7, 13], timezone: 'Canada/Pacific' }
  const rows = [
    ['september 5th', 'on Mon, Sept 5th'],
    ['december seven', 'on Wed, Dec 7th'],
    ['december seventh', 'on Wed, Dec 7th'],
    ['december 14', 'on Wed, Dec 14th'],
    ['december 14th', 'on Wed, Dec 14th'],
    ['january 5th', 'on Thurs, Jan 5th, 2017'],
    ['september 5th 2018', 'on Wed, Sept 5th, 2018'],
    ['june 5th-7th 2017', 'Jun 5-7, 2017'],
    ['15th - 20th of august', 'Aug 15-20'],
    ['valentines day', 'on Sun, Feb 14th, 2017'],
    ['new years', 'on Sun, Jan 1st, 2017'],
    ['new years eve', 'on Sat, Dec 31st'],
    ['august 20th', 'on Sat, Aug 20th'],
    ['on the 20th', 'on Sat, Aug 20th'],
    ['st patricks day', 'on Fri, Mar 17th, 2017'],
    ['july 4th', 'on Mon, Jul 4th, 2017'],
    ['march 15th 2018', 'on Thurs, Mar 15th, 2018'],
    ['15th of march 2018', 'on Thurs, Mar 15th, 2018'],
    ['mardi gras', 'on Tue, Feb 28th, 2017'],
    ['epiphany', 'on Fri, Jan 6th, 2017'],
    ['saint valentines day', 'on Sun, Feb 14th, 2017'],
    ['aug 13 2016', 'on Sat, Aug 13th'],
    ['13 august 2016', 'on Sat, Aug 13th'],
    ['august thirteenth', 'on Sat, Aug 13th'],
    ['the 13th of august', 'on Sat, Aug 13th'],
    ['2016-08-13', 'on Sat, Aug 13th'],
    ['08/13/2016', 'on Sat, Aug 13th'],
    ['feb 29 2016', 'on Mon, Feb 29th, 2016'],
    ['29 february 2016', 'on Mon, Feb 29th, 2016'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    ['june twenty-first 1992', 'june 21 1992 - june 21 1992'],
    ['on the 18th', 'Sun, Dec 18th'],
    ['10 August 2012', 'Aug 10 2012'],
    ['May eighth, 2010', 'May 8 2010'],
    ['May twenty-fourth, 2010', 'May 24 2010'],
    ['Sept, 2012', 'Sep 1 2012 - Sep 30 2012'],
    ['Sep-2012', 'Sep 1 2012 to Sep 30 2012'],
    ['20/10/2012', 'Oct 20 2012'],
    ['05-25-2015', 'May 25 2015'],
    ['third month of 2019', 'march 1 2019 to march 31th 2019'],
    // ['within two weeks', 'Nov 23 to Dec 8'],
    // ['within a month', 'Nov 23 - Dec 23'],
    // ['within a few months', 'Nov 23 - Jan 23 2017'],
    // ['August 10 - November 12', 'Aug 10 2017 - Nov 12 2017'], //tricky
    // ['August 10 - January 12', 'Aug 10 2017 - Jan 12 2018'], //tricky

    // ['04/2016', 'Apr 4 2016'],
    ['2015.08.13', 'Aug 13 2015'],
    // ['2018 after june', 'jun 1 2018 - jun 15 2018'],
    ['january 1st', 'jan 1 2017'],
    ['december 25th', 'dec 25 2016'],
    ['new years', 'jan 1 2017'],
    ['new years day 2017', 'jan 1 2017'],
    ['feb 14 2017', 'feb 14 2017'],
    ['march 20 2015', 'march 20 2015'],
    ['new years eve', 'Dec 31 2016'],
    ['valentines day 2017', 'feb 14 2017'],
    ['nov 23 2016', 'Nov 23 2016'],
    ['23 november 2016', 'Nov 23 2016'],
    ['november twenty third', 'Nov 23 2016'],
    ['the 23rd of november', 'Nov 23 2016'],
    ['2016-11-23', 'Nov 23 2016'],
    ['11/23/2016', 'Nov 23 2016'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2017, 0, 1], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2017, 0, 1], timezone: 'Canada/Pacific' }
  const rows = [
    ['january 15th', 'jan 15 2017'],
    ['new years day', 'jan 1 2017'],
    ['jan 1 2017', 'jan 1 2017'],
    ['1 january 2017', 'jan 1 2017'],
    ['january first', 'jan 1 2017'],
    ['the 1st of january', 'jan 1 2017'],
    ['2017-01-01', 'jan 1 2017'],
    ['01/01/2017', 'jan 1 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [
    // explicit-dates
    [`march 2nd`, '2020-03-02T00:00:00.000-08:00'],
    [`2 march`, '2020-03-02T00:00:00.000-08:00'],
    [`march the second`, '2020-03-02T00:00:00.000-08:00'],
    [`on the 2nd of march`, '2020-03-02T00:00:00.000-08:00'],

    // numerical-dates
    [`1999/03/02`, 'march 2 1999'],
    [`1999-03-02`, 'march 2 1999'],
    [`03-02-1999`, 'march 2nd 1999'],
    [`03/02`, 'march 2'],
    [`2015.08.13`, 'aug 13 2015'],
    [`aug-20`, '20-aug'],
    ['first half of march', '2020-03-01 to 2020-03-16'],
    ['second half of march', '2020-03-16 to 2020-03-30 '],

    // additional explicit-dates
    [`march 3rd`, '2020-03-03T00:00:00.000-08:00'],
    [`3 march`, '2020-03-03T00:00:00.000-08:00'],
    [`march the third`, '2020-03-03T00:00:00.000-08:00'],
    [`on the 3rd of march`, '2020-03-03T00:00:00.000-08:00'],

    // additional numerical-dates
    [`1999/03/03`, 'march 3 1999'],
    [`1999-03-03`, 'march 3 1999'],
    [`03-03-1999`, 'march 3rd 1999'],
    [`03/03`, 'march 3'],
    [`2015.08.14`, 'aug 14 2015'],
    [`sep-20`, '20-sep'],

    // additional equals pairs
    [`november 11th`, `2020-11-11T00:00:00.000-07:00`],
    [`11 november`, `2020-11-11T00:00:00.000-07:00`],
    [`december 12th`, `2020-12-12T00:00:00.000-07:00`],
    [`12 december`, `2020-12-12T00:00:00.000-07:00`],
    [`january 22nd`, `2020-01-22T00:00:00.000-08:00`],
    [`22 january`, `2020-01-22T00:00:00.000-08:00`],
    [`february 2nd`, `2020-02-02T00:00:00.000-08:00`],
    [`2 february`, `2020-02-02T00:00:00.000-08:00`],
    [`march 2nd 2020`, `2020-03-02T00:00:00.000-08:00`],
    [`2 march 2020`, `2020-03-02T00:00:00.000-08:00`],
    [`2020/03/02`, `march 2 2020`],
    [`2020-03-02`, `march 2 2020`],
    [`03-02-2020`, `march 2nd 2020`],
    [`03/02/2020`, `march 2 2020`],
    [`2015.08.15`, `aug 15 2015`],
    [`2015-08-15`, `aug 15 2015`],
    [`04/04`, `april 4`],
    [`first half of april`, `2020-04-01 to 2020-04-15`],
    [`first half of february`, `2020-02-01 to 2020-02-15`],
    [`new years`, `2021-01-01`],
    [`new years eve`, `2020-12-31`],
    [`valentines day`, `2020-02-14`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'calendar spellings — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'calendar spellings'
    ['September 10, 2026', '2026-09-10'],
    ['September 10th, 2026', '2026-09-10'],
    ['the 10th of September 2026', '2026-09-10'],
    ['10 September 2026', '2026-09-10'],
    ['10th September, 2026', '2026-09-10'],
    ['Sept 10 2026', '2026-09-10'],
    ['Sep. 10, 2026', '2026-09-10'],
    ['SEPTEMBER 10TH, 2026', '2026-09-10'],
    ['the tenth of September, two thousand twenty-six', '2026-09-10'],
    ['Thursday, September 10, 2026', '2026-09-10'],
    ['Thu., Sept. 10, 2026', '2026-09-10'],
    ['2026-09-10', '2026-09-10'],
    ['2026/09/10', '2026-09-10'],
    ['2026.09.10', '2026-09-10'],
    ['09/10/2026', '2026-09-10'], // US order when ambiguous.
    ['09-10-2026', '2026-09-10'],
    ['13/09/2026', '2026-09-13'],
    ['September 1st', '2026-09-01'], // Current month may refer to an earlier day.
    ['September 30th', '2026-09-30'],
    ['October 1', '2026-10-01'],
    ['January 1', '2027-01-01'],
    ['December 31, 1999', '1999-12-31'],
    ['January 1, 2000', '2000-01-01'],
    ['February 29, 2000', '2000-02-29'],
    ['February 29, 2028', '2028-02-29'],
    ['February 29, 2400', '2400-02-29'],
    ['March 1, 2100', '2100-03-01'],
    ['July 4th, 1776', '1776-07-04'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'year windows', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('2030'), '2030-01-01T00:00:00.000-05:00', 'bare 2030')
  t.equal(getStart('2045'), '2045-01-01T00:00:00.000-05:00', 'bare 2045')
  t.equal(getStart(`june of '98`), '1998-06-01T00:00:00.000-04:00', `june of '98`)
  t.equal(getStart(`summer of '69`), '1969-06-01T00:00:00.000-04:00', `summer of '69`)
  t.equal(getStart('may 97'), '1997-05-01T00:00:00.000-04:00', 'may 97')
  t.end()
})
