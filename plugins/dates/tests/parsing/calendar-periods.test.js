import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
import { checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/parsing/calendar-periods] '

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
    ['fall 2016', [2016, september, 1]],
    ['autumn 2016', [2016, september, 1]],
    ['winter 2016', [2016, december, 1]],
    ['q1', [2016, january, 1]],
    ['q1 2016', [2016, january, 1]],
    ['q2', [2016, april, 1]],
    ['q4 2015', [2015, october, 1]],
    ['first quarter', [2016, january, 1]],
    ['second quarter 2016', [2016, april, 1]],
    ['third quarter', [2016, july, 1]],
    ['spring', [2016, march, 1]],
    ['spring 2016', [2016, march, 1]],
    ['summer 2016', [2016, june, 1]],
    ['next month', [2016, march, 1]],
    ['last month', [2016, january, 1]],
    ['this month', [2016, february, 1]],
    ['next year', [2017, january, 1]],
    ['last year', [2015, january, 1]],
    ['this year', [2016, january, 1]],
    ['this weekend', [2016, february, 13]],
    ['next weekend', [2016, february, 20]],
    ['last weekend', [2016, february, 6]],
    ['q1 2002', [2002, january, 1]],
    ['fourth quarter, 2002', [2002, october, 1]],
    ['fourth quarter', [2016, october, 1]],
    ['spring 2002', [2002, march, 1]],
    // ['this march', [2016, march, 1]], //fixme
    ['first week of january', [2016, december, 26]],
    ['first week of february', [2016, february, 1]],
    // ['first week of march', [2016, february, 29]],//awkward
    // ['first week of april', [2016, april, 4]],
    // ['first week of may', [2016, may, 2]],
    ['first week of june', [2016, may, 30]],
    // ['first week of july', [2016, july, 4]],
    ['first week of august', [2016, august, 1]],
    ['first week of september', [2016, august, 29]],
    // ['first week of october', [2016, october, 3]],
    ['first week of november', [2016, october, 31]],
    ['first week of december', [2016, november, 28]],
    ['second week of february', [2016, february, 8]],
    ['2nd week of february', [2016, february, 8]],
    // ['the last weekend in october', [2016, october, 29]],
    // ['the last weekend this month', [2016, february, 27]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

// ['next week on the 6th', [2016, march, 6]],
// ['6th next week', [2016, february, 15]],
// ['6 next week', [2016, february, 15]],
// ['6 on next week', [2016, february, 15]],
// ['6 this next week', [2016, february, 15]],

test(here + 'start dates — ' + JSON.stringify({ today: [2011, march, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2011, march, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['this past weekend', [2011, march, 26]],
    ['next weekend', [2011, april, 9]],
    ['next month', [2011, april, 1]],
    ['last month', [2011, february, 1]],
    ['next week', [2011, april, 4]],
    ['last week', [2011, march, 21]],
    ['next year', [2012, january, 1]],
    ['this year', [2011, january, 1]], //?
    ['last year', [2010, january, 1]],
    ['this september', [2011, september, 1]],
    ['september', [2011, september, 1]],
    ['last september', [2010, september, 1]], //fixme
    // ['next september', [2011, september, 1]],
    ['january', [2012, january, 1]],
    // ['next january', [2013, january, 1]],
    ['last january', [2011, january, 1]],
    // ['next february', [2012, february, 1]],
    // ['last february', [2011, february, 1]],
    ['february ', [2012, february, 1]],
    ['this month', [2011, march, 1]],
    ['current month', [2011, march, 1]],
    ['the current week', [2011, march, 28]],
    ['current year', [2011, january, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 5], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 5], timezone: 'Canada/Eastern' }
  const rows = [
    // start/end of week
    ['this weekend', [2016, february, 6]], //tomorrow
    ['next weekend', [2016, february, 13]],
    // ['end of this week', [2016, february, 5]], //friday (today)
    ['next week', [2016, february, 8]], //monday
    // ['start of next week', [2016, february, 8]],
    // ['end of next week', [2016, february, 12]], //friday
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, april, 19], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, april, 19], timezone: 'Canada/Eastern' }
  const rows = [
    ['this june', [2016, june, 1]], //relyear
    // ['third week of may', [2016, may, 16]], //relmonth
    ['this weekend', [2016, april, 23]], //relweek
    ['next weekend', [2016, april, 30]],
    ['summer 1992', [1992, june, 1]],
    ['autumn', [2016, september, 1]],
    ['winter', [2016, december, 1]],
    ['summer', [2016, june, 1]],
    ['q2 2016', [2016, april, 1]],
    ['q3', [2016, july, 1]],
    ['third quarter 2016', [2016, july, 1]],
    ['fall 2017', [2017, september, 1]],
    ['spring 2017', [2017, march, 1]],
    ['winter 2017', [2017, december, 1]],
    ['q4', [2016, october, 1]],
    ['q4 2016', [2016, october, 1]],
    ['fourth quarter', [2016, october, 1]],
    ['first quarter 2017', [2017, january, 1]],
    // ['the last weekend this month', [2016, april, 30]],
    // ['the last weekend of this month', [2016, april, 30]]
  ]
  checkStarts(t, context, rows)
  t.end()
})

// ['last week of february', [2017, february, 20]],
// ['first week of march 2019', [2019, march, 4]],

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['next week', [2016, may, 16]],
    ['first week of march 2019', [2019, february, 25]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 4], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 4], timezone: 'Canada/Eastern' }
  const rows = [
    //same logic for months
    ['this october', [2016, october, 1]],
    ['next october', [2017, october, 1]],
    ['last october', [2015, october, 1]],

    ['this september', [2017, september, 1]],
    // ['next september', [2017, september, 1]], //this=next
    ['last september', [2016, september, 1]],
    ['this december', [2016, december, 1]],
    // ['next december', [2016, december, 1]], //this=next
    ['last december', [2015, december, 1]],

    //same logic for layups
    ['this month', [2016, october, 1]],
    ['next month', [2016, november, 1]],
    ['last month', [2016, september, 1]],
    ['this week', [2016, october, 3]],
    ['next week', [2016, october, 10]],
    ['last week', [2016, september, 26]],
    ['this year', [2016, january, 1]],
    ['next year', [2017, january, 1]],
    ['last year', [2015, january, 1]],
    ['this weekend', [2016, october, 8]],
    ['next weekend', [2016, october, 15]],
    ['last weekend', [2016, october, 1]],
    ['this quarter', [2016, october, 1]],
    ['next quarter', [2017, january, 1]],
    ['last quarter', [2016, july, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 15], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 15], timezone: 'Canada/Eastern' }
  const rows = [
    ['october 10th this year', [2016, october, 10]],
    ['november 10th this year', [2016, november, 10]],
    ['november 10th next year', [2017, november, 10]],
    ['november 10th of last year', [2015, november, 10]],
    // ['november 10th next year', [2017, november, 10]],
    // ['next year on june 10th', [2017, june, 10]],
    // ['this year on june 10th', [2016, june, 10]],
    // ['last year on june 10th', [2015, june, 10]],
    // ['next year in june', [2017, june, 1]],
    // ['next year after june', [2017, july, 1]],

    ['10th of next month', [2016, november, 10]],
    ['1st of the last month', [2016, september, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

// ['one and a half years from now', [2018, february, 1]],

// ['the last weekend in october', [2016, october, 30]],
// ['the last weekend this month', [2016, february, 27]],

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 7, 13], timezone: 'Canada/Pacific' }
  const rows = [
    ['next weekend', 'Aug 20th-21st'],
    ['last weekend', 'Aug 6th-7th'],
    ['next week', 'Aug 15th-21st'],
    ['this month', 'Aug 1st-31st'],
    ['sometime this month', 'Aug 1st-31st'],
    ['next month', 'Sept 1st-30th'],
    ['last month', 'Jul 1st-31st 2016'],
    ['in february', 'Feb 1-28, 2017'],
    // ['sometime after next week', 'Aug 19th - Sept 2nd 2016'],
    ['this weekend', 'Aug 13th-14th'],
    ['this week', 'Aug 8th-14th'],
    ['last week', 'Aug 1st-7th'],
    ['this year', 'Jan 1st - Dec 31st, 2016'],
    ['next year', 'Jan 1st - Dec 31st, 2017'],
    ['last year', 'Jan 1st - Dec 31st, 2015'],
    ['q4', 'Oct 1st - Dec 31st'],
    ['q4 2016', 'Oct 1st - Dec 31st, 2016'],
    ['first quarter 2017', 'Jan 1st - Mar 31st, 2017'],
    ['spring 2017', 'Mar 1st - Apr 30th, 2017'],
    ['summer 2016', 'Jun 1st - Jul 31st'],
    ['fall 2016', 'Sep 1st - Oct 31st'],
    ['august', 'Aug 1st-31st'],
    ['this august', 'Aug 1st-31st'],
    ['next august', 'Aug 1st-31st, 2017'],
    ['september', 'Sept 1st-30th'],
    ['this september', 'Sept 1st-30th'],
    ['sometime next week', 'Aug 15th-21st'],
    ['q1 2017', 'Jan 1st - Mar 31st, 2017'],
    ['q2 2017', 'Apr 1st - Jun 30th, 2017'],
    ['q3 2016', 'Jul 1st - Sep 30th, 2016'],
    ['second quarter 2017', 'Apr 1st - Jun 30th, 2017'],
    ['third quarter 2016', 'Jul 1st - Sep 30th, 2016'],
    ['first week of september', 'Aug 29th - Sept 4th'],
    ['second week of august', 'Aug 8th-14th'],
    ['sometime next weekend', 'Aug 20th-21st'],
    ['this past weekend', 'Aug 6th-7th'],
    ['october', 'Oct 1st-31st'],
    ['this october', 'Oct 1st-31st'],
    ['next october', 'Oct 1st-31st, 2017'],
    ['november', 'Nov 1st-30th'],
    ['this november', 'Nov 1st-30th'],
    ['december', 'Dec 1st-31st'],
    ['this december', 'Dec 1st-31st'],
    ['january', 'Jan 1st-31st, 2017'],
    ['this january', 'Jan 1st-31st, 2017'],
    ['february', 'Feb 1-28, 2017'],
    ['this february', 'Feb 1-28, 2017'],
    ['march', 'Mar 1st-31st, 2017'],
    ['this march', 'Mar 1st-31st, 2017'],
    ['april', 'Apr 1st-30th, 2017'],
    ['this april', 'Apr 1st-30th, 2017'],
    ['may', 'May 1st-31st, 2017'],
    ['this may', 'May 1st-31st, 2017'],
    ['june', 'Jun 1st-30th, 2017'],
    ['this june', 'Jun 1st-30th, 2017'],
    ['july', 'Jul 1st-31st, 2017'],
    ['this july', 'Jul 1st-31st, 2017'],
    ['second quarter 2016', 'Apr 1st - Jun 30th, 2016'],
    ['fourth quarter', 'Oct 1st - Dec 31st, 2016'],
    ['spring 2016', 'Mar 1st - Apr 30th, 2016'],
    ['third week of august', 'Aug 15th-21st'],
    ['fourth week of august', 'Aug 22nd-28th'],
    ['first week of october', 'Sept 26th - Oct 2nd'],
    ['second week of october', 'Oct 3rd-9th'],
    ['third week of november', 'Nov 14th-20th'],
    ['sometime this week', 'Aug 8th-14th'],
    ['sometime next month', 'Sept 1st-30th'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    ['this month', 'nov 1 to nov 30'],
    ['this august', 'aug 1 2017 to aug 31 2017'],
    ['the last weekend in october', 'Oct 28 to 29'],
    ['the last weekend in october 2017', 'Oct 28 to 29, 2017'],
    ['this quarter', 'Oct 1st 2016 to Dec 31st 2016'],
    ['Sep 2012', 'Sep 1 2012 to Sep 30 2012'],
    // ['two and a half weeks from now', 'Dec 11th 2016'],
    // ['second weekend in 2019', 'Jan 12 to Jan 13, 2019'],
    ['third quarter 1998', 'july 1st 1998 to september 30th 1998'],
    // ['middle of q1 2019', 'feb 12 2019'],
    ['third day of 2019', 'jan 3rd 2019'],
    ['third week of 2019', 'jan 14th to 20th 2019'],
    ['first weekend of 2019', 'january 5 2019 to jan 6th 2019'],
    // ['the last week in 2019', 'dec 23rd 2019 to dec 29'],
    // ['the first quarter in 2019', 'january 1st to march 31st 2019'],
    // // ['the last quarter in 2019', 'october 1st to december 30th 2019'],
    // ['last spring', 'march 1st 2015 to may 31st 2015'],
    // ['this spring', 'march 1st 2016 to may 31st 2016'],
    // ['next spring', 'march 1st 2017 to may 31st 2017'],
    ['the first week of june', 'May 29th 2017 to June 4th 2017'],
    // ['middle of q1 1998', 'Feb 12 1998'],
    ['fourth quarter, 2002', 'oct 1 2002  thru dec 31 2002'],
    ['next week', 'Nov 28 to Dec 4'],
    ['last week', 'Nov 14 to Nov 20'],
    ['this weekend', 'Nov 26 to Nov 27'],
    ['next weekend', 'Dec 3 to Dec 4'],
    ['q1 2017', 'jan 1 2017 to mar 31 2017'],
    ['q2 2017', 'apr 1 2017 to jun 30 2017'],
    ['spring 2017', 'march 1 2017 to april 30 2017'],
    ['summer 2017', 'june 1 2017 to july 31 2017'],
    ['winter 2016', 'dec 1 2016 to jan 31 2017'],
    ['fall 2016', 'sep 1 2016 to oct 31 2016'],
    ['autumn 2016', 'sep 1 2016 to oct 31 2016'],
    ['next quarter', 'Jan 1st 2017 to Mar 31st 2017'],
    ['first week of december', 'Nov 28 2016 to Dec 4 2016'],
    ['second week of january 2017', 'Jan 2 2017 to Jan 8 2017'],
    ['this year', 'jan 1 2016 to dec 31 2016'],
    ['next year', 'jan 1 2017 to dec 31 2017'],
    ['last year', 'jan 1 2015 to dec 31 2015'],
    ['next month', 'dec 1 to dec 31'],
    ['last month', 'oct 1 to oct 31'],
    ['fourth quarter 2016', 'oct 1 2016 thru dec 31 2016'],
    ['q3 2016', 'jul 1 2016 to sep 30 2016'],
    ['q4 2016', 'oct 1 2016 to dec 31 2016'],
    ['this past weekend', 'Nov 19 2016 to Nov 20 2016'],
    ['last quarter', 'Jul 1st 2016 to Sep 30th 2016'],
    ['second quarter 2016', 'apr 1 2016 to jun 30 2016'],
    ['third quarter 2017', 'jul 1 2017 to sep 30 2017'],
    ['december', 'dec 1 to dec 31'],
    ['this december', 'dec 1 to dec 31'],
    ['january', 'jan 1 2017 to jan 31 2017'],
    ['this january', 'jan 1 2017 to jan 31 2017'],
    ['february', 'feb 1 2017 to feb 28 2017'],
    ['this february', 'feb 1 2017 to feb 28 2017'],
    ['march', 'march 1 2017 to march 31 2017'],
    ['this march', 'march 1 2017 to march 31 2017'],
    ['april', 'april 1 2017 to april 30 2017'],
    ['this april', 'april 1 2017 to april 30 2017'],
    ['may', 'may 1 2017 to may 31 2017'],
    ['this may', 'may 1 2017 to may 31 2017'],
    ['june', 'june 1 2017 to june 30 2017'],
    ['this june', 'june 1 2017 to june 30 2017'],
    ['july', 'july 1 2017 to july 31 2017'],
    ['this july', 'july 1 2017 to july 31 2017'],
    ['october', 'oct 1 2016 to oct 31 2016'],
    ['this october', 'oct 1 2016 to oct 31 2016'],
    ['third week of november', 'nov 14 2016 to nov 20 2016'],
    ['fourth week of november', 'nov 21 2016 to nov 27 2016'],
    ['sometime this week', 'Nov 21 2016 to Nov 27 2016'],
    ['in march', 'march 1 2017 to march 31 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2017, 0, 1], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2017, 0, 1], timezone: 'Canada/Pacific' }
  const rows = [
    ['this month', 'jan 1 2017 to jan 31 2017'],
    ['next month', 'feb 1 2017 to feb 28 2017'],
    ['last month', 'dec 1 2016 to dec 31 2016'],
    ['this week', 'dec 26 2016 to jan 1 2017'],
    ['next week', 'jan 2 2017 to jan 8 2017'],
    ['this year', 'jan 1 2017 to dec 31 2017'],
    ['next year', 'jan 1 2018 to dec 31 2018'],
    ['last year', 'jan 1 2016 to dec 31 2016'],
    ['this weekend', 'jan 7 2017 to jan 8 2017'],
    ['next weekend', 'jan 14 2017 to jan 15 2017'],
    ['q1', 'jan 1 2017 to mar 31 2017'],
    ['q1 2017', 'jan 1 2017 to mar 31 2017'],
    ['first quarter', 'jan 1 2017 to mar 31 2017'],
    ['q2 2017', 'apr 1 2017 to jun 30 2017'],
    ['q3 2017', 'jul 1 2017 to sep 30 2017'],
    ['q4 2017', 'oct 1 2017 to dec 31 2017'],
    ['spring 2017', 'march 1 2017 to april 30 2017'],
    ['summer 2017', 'june 1 2017 to july 31 2017'],
    ['fall 2017', 'sep 1 2017 to oct 31 2017'],
    ['winter 2017', 'dec 1 2017 to jan 31 2018'],
    ['in february', 'feb 1 2017 to feb 28 2017'],
    ['this past weekend', 'dec 31 2016 to jan 1 2017'],
    ['february', 'feb 1 2017 to feb 28 2017'],
    ['march', 'march 1 2017 to march 31 2017'],
    ['april', 'april 1 2017 to april 30 2017'],
    ['may', 'may 1 2017 to may 31 2017'],
    ['june', 'june 1 2017 to june 30 2017'],
    ['july', 'july 1 2017 to july 31 2017'],
    ['october', 'oct 1 2017 to oct 31 2017'],
    ['november', 'nov 1 2017 to nov 30 2017'],
    ['december', 'dec 1 2017 to dec 31 2017'],
    ['this february', 'feb 1 2017 to feb 28 2017'],
    ['this march', 'march 1 2017 to march 31 2017'],
    ['autumn 2017', 'sep 1 2017 to oct 31 2017'],
    ['third quarter 2017', 'jul 1 2017 to sep 30 2017'],
    ['fourth quarter 2017', 'oct 1 2017 to dec 31 2017'],
    ['second week of february', 'feb 6 2017 to feb 12 2017'],
    ['sometime this week', 'dec 26 2016 to jan 1 2017'],
    // ['this spring', 'March 1st 2017 to May 31 2017'],
    // ['this summer', 'june 1st 2017 to August 31 2017'],
    // ['this fall', 'September 1st 2017 to November 30 2017'],
    // ['this autumn', 'September 1st 2017 to November 30 2017'],
    //     ['end of this summer', 'August 31 2017 - August 31 2017'], //-1 day
    //     ['middle of this summer', 'Jul 13 2017 - Jul 13 2017'], //-6 weeks
    // ['this winter', 'dec 1st 2017 to February 28 2018'],
    // ['this spring', 'March 1 to May 31'],
    // ['this spring', 'March 1 2017 to May 31 2017'],
    // ['this fall', 'September 1 2017 to November 30 2017'],
    // ['next winter', 'dec 1st 2018 to February 28 2019'],
    // ['winter 2020', 'dec 1st 2020 to February 28 2021'],
    // ['winter of 1992', 'dec 1st 1992 to February 28 1993'],
    // ['spring 2015', 'March 1 2015 to May 31 2015'],
    // ['fall 2012', 'September 1 2012 to November 30 2012'],
    // ['autumn of 2013', 'September 1 2013 to November 30 2013'],
    // ['last winter', 'December 1st 2015 through February 27 2016'], //last
    // ['this winter', 'December 1st 2016 to February 27 2017'], //current
    // ['next winter', 'December 1st 2017 until February 27 2018'], //next
    // ['end of this winter', 'February 28 2016 to February 28 2016'], //end
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [
    [`q1`, 'jan 1'],
    [`last q1`, `q1 2019`],
    [`last q2`, `q2 2019`],
    [`last q3`, `q3 2019`],
    [`last q4`, `q4 2019`],
    [`this q1`, `q1 2020`],
    [`this q2`, `q2 2020`],
    [`this q3`, `q3 2020`],
    [`this q4`, `q4 2020`],
    [`next q1`, `q1 2021`],
    [`next q2`, `q2 2021`],
    [`next q3`, `q3 2021`],
    [`next q4`, `q4 2021`],
    [`march this year`, `2020-03-01`],
    [`march next year`, `2021-03-01`],
    [`march last year`, `2019-03-01`],
    [`q2`, 'apr 1'],
    [`next month`, '2020-02-01'],
    [`next q1`, `q1 2021`],
    [`next q2`, `q2 2021`],
    [`next q3`, `q3 2021`],
    [`next q4`, `q4 2021`],
    [`march this year`, `2020-03-01`],
    [`march next year`, `2021-03-01`],
    [`march last year`, `2019-03-01`],
    [`next year`, `2021-01-01`],
    [`this year`, `2020-01-01`],
    [`last year`, `2019-01-01`],
    [`this week`, `2020-01-20`],
    [`next week`, `2020-01-27`],
    [`last week`, `2020-01-13`],
    [`this weekend`, `2020-01-25`],
    [`next weekend`, `2020-02-01`],
    [`last weekend`, `2020-01-18`],
    [`q3`, `jul 1`],
    [`q4`, `oct 1`],
    [`this quarter`, `q1 2020`],
    [`next quarter`, `q2 2020`],
    [`last quarter`, `q4 2019`],
    [`apr this year`, `2020-04-01`],
    [`apr next year`, `2021-04-01`],
    [`apr last year`, `2019-04-01`],
    [`may this year`, `2020-05-01`],
    [`june this year`, `2020-06-01`],
    [`july this year`, `2020-07-01`],
    [`aug this year`, `2020-08-01`],
    [`sept this year`, `2020-09-01`],
    [`oct this year`, `2020-10-01`],
    [`nov this year`, `2020-11-01`],
    [`dec this year`, `2020-12-01`],
    [`jan this year`, `2020-01-01`],
    [`feb this year`, `2020-02-01`],
    [`spring`, `2020-03-01`],
    [`spring 2020`, `2020-03-01`],
    [`summer`, `2020-06-01`],
    [`summer 2020`, `2020-06-01`],
    [`fall`, `2020-09-01`],
    [`fall 2020`, `2020-09-01`],
    [`autumn`, `2020-09-01`],
    [`winter`, `2020-12-01`],
    [`winter 2020`, `2020-12-01`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'calendar periods — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'calendar periods'
    ['this week', '2026-09-07', '2026-09-13'],
    ['next week', '2026-09-14', '2026-09-20'],
    ['last week', '2026-08-31', '2026-09-06'],
    ['this weekend', '2026-09-12', '2026-09-13'],
    ['last weekend', '2026-09-05', '2026-09-06'],
    ['this month', '2026-09-01', '2026-09-30'],
    ['next month', '2026-10-01', '2026-10-31'],
    ['last month', '2026-08-01', '2026-08-31'],
    ['this year', '2026-01-01', '2026-12-31'],
    ['next year', '2027-01-01', '2027-12-31'],
    ['last year', '2025-01-01', '2025-12-31'],
    ['February 2028', '2028-02-01', '2028-02-29'],
    ['February 2027', '2027-02-01', '2027-02-28'],
    ['April 2027', '2027-04-01', '2027-04-30'],
    ['June 2027', '2027-06-01', '2027-06-30'],
    ['this June', '2027-06-01', '2027-06-30'],
    ['last June', '2026-06-01', '2026-06-30'],
    ['Q1 2027', '2027-01-01', '2027-03-31'],
    ['the second quarter of 2027', '2027-04-01', '2027-06-30'],
    ['this quarter', '2026-07-01', '2026-09-30'],
    ['next quarter', '2026-10-01', '2026-12-31'],
    ['last quarter', '2026-04-01', '2026-06-30'],
  
    // Northern meteorological seasons, inclusive final calendar day.
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'end of the month', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('end of the month'), '2026-07-31T23:59:59.999-04:00', 'end of the month')
  t.equal(getStart('start of the month'), '2026-07-01T00:00:00.000-04:00', 'start of the month')
  t.equal(getStart('end of the year'), '2026-12-31T23:59:59.999-05:00', 'end of the year')
  t.end()
})
