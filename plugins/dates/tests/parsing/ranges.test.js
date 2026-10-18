import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
import { checkEnds, checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/parsing/ranges] '

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

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['by next week', [2016, may, 11]],
    ['before next week', [2016, may, 11]],
    // ['after next week', [2016, may, 20]],
    ['june 5th to august 19th', [2016, june, 5]],
    ['between june 5th and august 19th 2017', [2016, june, 5]],
    ['by next week', [2016, may, 11]],
    ['before next week', [2016, may, 11]],
    // ['after next week', [2016, may, 20]],
    ['between june 5th and august 19th 2017', [2016, june, 5]], //....
  ]
  checkStarts(t, context, rows)
  t.end()
})

// ['after lunch', [2017, october, 7]],

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 15], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 15], timezone: 'Canada/Eastern' }
  const rows = [
    ['28th of September to 5th of October 2008', [2008, september, 28]],
    ['2nd of January to 5th of October 2008', [2008, january, 2]],
    ['28th September to 5th October 2008', [2008, september, 28]],
    ['28th of september through 5th of october 2008', [2008, september, 28]],
    ['1st of March to 15th of March 1999', [1999, march, 1]],
    ['15th of August to 20th of August 2016', [2016, august, 15]],
    ['5th of June to 10th of June 2017', [2017, june, 5]],
    ['12th of July to 3rd of August 1995', [1995, july, 12]],
    ['31st of December to 2nd of January 2000', [2000, december, 31]],
    ['March 7th to june 11th 1987', [1987, march, 7]],
    ['April 17th to september 11th 1981', [1981, april, 17]],
    ['June 1st to June 11th 2014', [2014, june, 1]],
    // ['between 13 February and 15 February 1945', [1945, february, 13]],
    // ['between March 7th and june 11th 1987', [1987, march, 7]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'inclusive end dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Pacific' }
  const rows = [
    ['between monday and tuesday', [2016, february, 15]], //'exclusive' between
    ['between tuesday and thursday', [2016, february, 17]],
    ['before april the 22nd', [2016, april, 21]],
    ['by august 2nd, 2016', [2016, august, 1]],
    ['by 22 november', [2016, november, 21]],
    ['by 1999-12-25', [1999, december, 24]],
    ['before 12/25/1999', [1999, december, 24]],
    ['by tomorrow', [2016, february, 11]],
    ['by april 22nd', [2016, april, 21]],
    ['by 22 april', [2016, april, 21]],
    ['by april 22nd, 2016', [2016, april, 21]],
    ['by 22nd of april', [2016, april, 21]],
    ['by the 22nd of april, 2016', [2016, april, 21]],
    ['by may 5th', [2016, may, 4]],
    ['by june 1st', [2016, may, 31]],
    ['by july 4th', [2016, july, 3]],
    ['by august 15th', [2016, august, 14]],
    ['by september 5th', [2016, september, 4]],
    ['by october 31st', [2016, october, 30]],
    ['by november 11th', [2016, november, 10]],
    ['by december 25th', [2016, december, 24]],
    ['by valentines day', [2016, february, 13]],
    ['by new years', [2016, december, 31]],
    ['by new years eve', [2016, december, 30]],
    ['by next monday', [2016, february, 14]],
    ['by this friday', [2016, february, 11]],
    ['by next week', [2016, february, 14]],
    ['by next month', [2016, february, 29]],
    ['by february 20th', [2016, february, 19]],
    ['by 2016-03-02', [2016, march, 1]],
    ['by 03/02/2016', [2016, march, 1]],
    ['by 1999/12/25', [1999, december, 24]],
    ['by 12/25/1999', [1999, december, 24]],
    ['by 25-12-1999', [1999, december, 24]],
    ['before april 22nd', [2016, april, 21]],
    ['before may 5th', [2016, may, 4]],
    ['before june 1st', [2016, may, 31]],
    ['before july 4th', [2016, july, 3]],
    ['before august 15th', [2016, august, 14]],
    ['before september 5th', [2016, september, 4]],
    ['before october 31st', [2016, october, 30]],
    ['before valentines day', [2016, february, 13]],
    ['before new years', [2016, december, 31]],
    ['before next monday', [2016, february, 14]],
    ['before this friday', [2016, february, 11]],
    ['before 2016-03-02', [2016, march, 1]],
    ['before yesterday', [2016, february, 9]],
    ['before today', [2016, february, 10]],
    ['by st patricks day', [2016, march, 16]],
    ['before 22 november', [2016, november, 21]],
    ['before 1999-12-25', [1999, december, 24]],
    // ['by the day after tomorrow', [2016, february, 12]], //by
  ]
  checkEnds(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 7, 13], timezone: 'Canada/Pacific' }
  const rows = [
    ['before 2017', 'by Sun, Jan 1st, 2017'],
    ['by february', 'by Wed, Feb 1st, 2017'],
    ['by tomorrow', 'today, Sat Aug 13th'], //!!
    ['by september 5th', 'by Mon, Sept 5th'],
    // ['by next weekend', 'by Sat, Aug 20th'],
    // ['after next weekend', 'Aug 21st - Sept 4th 2016'],
    ['june 5-7 1999', 'Jun 5-7, 1999'],
    ['june 5 to 7, 1999', 'Jun 5-7, 1999'],
    ['june 5th to 7, 1999', 'Jun 5-7, 1999'],
    // ['5th to 7 june, 1999', 'Jun 5-7, 1999'],
    // ['5 to 7 august 1999', 'Aug 5-7, 1999'],
    // ['15 to 20 of august 1999', 'Aug 15-20, 1999'],
    ['28th of September to 5th of October 2008', 'Sep 28 - Oct 5, 2008'],
    ['1st of March to 15th of March 1999', 'Mar 1-15, 1999'],
    ['15th of August to 20th of August 2016', 'Aug 15-20, 2016'],
    ['31st of December to 2nd of January 2000', 'Dec 31, 2000 - Jan 2, 2001'],
    ['28th of september through 5th of october 2008', 'Sep 28 - Oct 5, 2008'],
    ['monday to wednesday', 'Aug 15th to Aug 17th'],
    ['october 1st to 3rd', 'Oct 1-3'],
    ['aug 10 to 15', 'Aug 10-15'],
    ['august 10th to 15th', 'Aug 10-15'],
    ['from monday to friday', 'Aug 15th to Aug 19th'],
    ['monday through friday', 'Aug 15th to Aug 19th'],
    ['by next month', 'by Thurs, Sept 1st'],
    ['by next week', 'by Mon, Aug 15th'],
    ['from august 1st to 5th', 'Aug 1-5'],
    ['august 1 to august 5', 'Aug 1-5'],
    ['sept 1 to 3', 'Sept 1-3'],
    ['september 1st to 3rd', 'Sept 1-3'],
    ['aug 1-3', 'Aug 1-3'],
    ['august 1-3', 'Aug 1-3'],
    ['tuesday to thursday', 'Aug 16th to Aug 18th'],
    ['from tuesday to thursday', 'Aug 16th to Aug 18th'],
    ['by august 20th', 'by Sat, Aug 20th'],
    ['by next friday', 'by Fri, Aug 19th'],
    ['before tomorrow', 'today, Sat Aug 13th'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    ['August 10 to 22, 2012', 'Aug 10 2012 to Aug 22 2012'],
    ['8/10/2012 - 8/15/2012', 'Aug 10 2012 - Aug 15 2012'],
    ['Jan 12 to Jan 13', 'Jan 12 2017 to Jan 13 2017'],
    ['Jan 22 2017 to Jan 13 2018', 'January 22 2017 to January 13 2018'],
    ['5 to 7 of january 1998', 'Jan 5th 1998 to Jan 7 1998'],
    ['january 5 to 7 1998', 'Jan 5th 1998, to Jan 7 1998'],
    ['today to next friday', 'Nov 23 to Dec 2'],
    ['August 10 to 22, 2012', 'Aug 10 2012 to Aug 22 2012'],
    ['August 10-22, 2012', 'Aug 10 2012 to Aug 22 2012'],
    ['May eighth to tenth, 2010', 'May 8 2010 to May 10 2010'],
    ['nov 5th to 7th', 'Nov 5 2016 to Nov 7 2016'],
    ['november 5 to 7', 'Nov 5 2016 to Nov 7 2016'],
    ['monday to friday', 'Nov 28 to Dec 2'],
    ['dec 1 to dec 25 2016', 'Dec 1 2016 to Dec 25 2016'],
    ['nov 23 to nov 30', 'Nov 23 2016 to Nov 30 2016'],
    ['from nov 23 to dec 1', 'Nov 23 2016 to Dec 1 2016'],
    ['wednesday to friday', 'Nov 23 to Nov 25'],
    ['dec 5 to 10', 'Dec 5 2016 to Dec 10 2016'],
    ['december 5th to 10th', 'Dec 5 2016 to Dec 10 2016'],
    ['nov 1 to 5', 'Nov 1 2016 to Nov 5 2016'],
    ['november 1st to 5th', 'Nov 1 2016 to Nov 5 2016'],
    ['tuesday to thursday', 'Nov 29 to Dec 1'],
    ['from monday to wednesday', 'Nov 28 to Nov 30'],
    ['by december 25th', 'by Dec 25 2016'],
    ['by next friday', 'by Dec 2 2016'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2017, 0, 1], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2017, 0, 1], timezone: 'Canada/Pacific' }
  const rows = [
    ['by march', 'by Wed, Mar 1st, 2017'],
    ['by february', 'by Wed, Feb 1st, 2017'],
    ['by next month', 'by Wed, Feb 1st, 2017'],
    ['jan 5 to 10', 'jan 5 2017 to jan 10 2017'],
    ['january 5th to 10th', 'jan 5 2017 to jan 10 2017'],
    ['tuesday to friday', 'jan 3 2017 to jan 6 2017'],
    ['by january 15th', 'by jan 15 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [
    ['until feb 3 2024', '2020-01-21 to 2024-02-03'],
    ['between Sept and Oct', 'sept 2020 to oct 2020'],
    ['between Sept and Oct 2008', 'sept 2008 to oct 2008'],
    ['between Oct and Sept', 'sept 2020 to oct 2020'],
    ['between Oct and Sept 2008', 'sept 2008 to oct 2008'],

    // date range
    [`from jan 1 to jan 5`, '2020-01-01 to 2020-01-05'],
    [`from jan 1 to feb 1`, '2020-01-01 to 2020-02-01'],
    [`from jan 1 2020 to jan 5 2021`, '2020-01-01 to 2021-01-05'],
    [`from jan 1 2020 to feb 1 2021`, '2020-01-01 to 2021-02-01'],
    [`between jan 1 and jan 5`, '2020-01-01 to 2020-01-05'],
    [`between jan 1 and feb 1`, '2020-01-01 to 2020-02-01'],
    [`between jan 1 2020 and jan 5 2021`, '2020-01-01 to 2021-01-05'],
    [`between jan 1 2020 and feb 1 2021`, '2020-01-01 to 2021-02-01'],
    ['until feb 3 2025', '2020-01-21 to 2025-02-03'],
    ['between Oct and Sept 2022', 'sept 2022 to oct 2022'],
    ['between Oct and Sept 2023', 'sept 2023 to oct 2023'],

    // additional date range
    [`from jan 6 to jan 10`, '2020-01-06 to 2020-01-10'],
    [`from jan 6 to feb 6`, '2020-01-06 to 2020-02-06'],
    [`from jan 6 2020 to jan 10 2021`, '2020-01-06 to 2021-01-10'],
    [`from jan 6 2020 to feb 6 2021`, '2020-01-06 to 2021-02-06'],
    [`between jan 6 and jan 10`, '2020-01-06 to 2020-01-10'],
    [`between jan 6 and feb 6`, '2020-01-06 to 2020-02-06'],
    [`between jan 6 2020 and jan 10 2021`, '2020-01-06 to 2021-01-10'],
    [`between jan 6 2020 and feb 6 2021`, '2020-01-06 to 2021-02-06'],
    [`from feb 1 to feb 5`, `2020-02-01 to 2020-02-05`],
    [`between feb 1 and feb 5`, `2020-02-01 to 2020-02-05`],
    [`from march 1 to april 1`, `2020-03-01 to 2020-04-01`],
    [`between march 1 and april 1`, `2020-03-01 to 2020-04-01`],
    [`from jan 21 to jan 25`, `2020-01-21 to 2020-01-25`],
    [`between jan 21 and jan 25`, `2020-01-21 to 2020-01-25`],
    [`until valentines day`, `2020-01-21 to 2020-02-14`],
    [`between Jan and Feb`, `jan 2020 to feb 2020`],
    [`between Jan and Feb 2019`, `jan 2019 to feb 2019`],
    [`between Mar and Apr`, `march 2020 to april 2020`],
    [`between Mar and Apr 2019`, `march 2019 to april 2019`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'explicit date ranges — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'explicit date ranges'
    ['September 10 to September 12, 2026', '2026-09-10', '2026-09-12'],
    ['September 10 through September 12, 2026', '2026-09-10', '2026-09-12'],
    ['from September 10 until September 12, 2026', '2026-09-10', '2026-09-12'],
    ['September 10–12, 2026', '2026-09-10', '2026-09-12'],
    ['September 10-12, 2026', '2026-09-10', '2026-09-12'],
    ['September 10 — September 12, 2026', '2026-09-10', '2026-09-12'],
    ['September 30 to October 2, 2026', '2026-09-30', '2026-10-02'],
    ['December 30, 2026 to January 2, 2027', '2026-12-30', '2027-01-02'],
    ['December 30 to January 2', '2026-12-30', '2027-01-02'],
    ['February 28 through March 1, 2028', '2028-02-28', '2028-03-01'],
    ['2026-09-10 to 2026-09-12', '2026-09-10', '2026-09-12'],
    ['09/10/2026 through 09/12/2026', '2026-09-10', '2026-09-12'],
    ['today through tomorrow', '2026-09-10', '2026-09-11'],
    ['yesterday through tomorrow', '2026-09-09', '2026-09-11'],
    ['from tomorrow to Sunday', '2026-09-11', '2026-09-13'],
    ['this Friday through Sunday', '2026-09-11', '2026-09-13'],
    ['Monday to Friday next week', '2026-09-14', '2026-09-18'],
    ['September through November 2026', '2026-09-01', '2026-11-30'],
    ['December 2026 through February 2027', '2026-12-01', '2027-02-28'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
