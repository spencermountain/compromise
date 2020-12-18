const test = require('tape')
const nlp = require('./_lib')

//number of days between start+end
const tests = [
  // {
  //   today: [2016, 7, 13], //aug 13th (saturday)
  //   tests: [
  //     //days
  //     ['today', 'today, Sat Aug 13th'],
  //     ['yesterday', 'yesterday, Fri Aug 12th'],
  //     ['tomorrow', 'tomorrow, Sun Aug 14th'],
  //     ['september 5th', 'on Mon, Sept 5th'],
  //     ['december seven', 'on Wed, Dec 7th'],
  //     ['december seventh', 'on Wed, Dec 7th'],
  //     ['december 14', 'on Wed, Dec 14th'],
  //     ['december 14th', 'on Wed, Dec 14th'],
  //     ['january 5th', 'on Thurs, Jan 5th, 2017'],
  //     ['on april fools', 'on Sat, Apr 1st, 2017'],
  //     ['next weekend', 'Aug 20th-21st'],
  //     ['last weekend', 'Aug 6th-7th'],
  //     ['next week', 'Aug 15th-21st'],
  //     ['this month', 'Aug 1st-31st'],
  //     ['sometime this month', 'Aug 1st-31st'],
  //     ['next month', 'Sept 1st-30th'],
  //     ['last month', 'Jul 1st-31st 2016'],
  //     ['in february', 'Feb 1-28, 2017'],
  //     // ['in 2018', 'Jan 1 - Dec 31, 2018'],
  //     ['before 2017', 'by Sun, Jan 1st, 2017'],
  //     ['by february', 'by Wed, Feb 1st, 2017'],
  //     ['by tomorrow', 'today, Sat Aug 13th'], //!!
  //     ['by september 5th', 'by Mon, Sept 5th'],
  //     // ['by next weekend', 'by Sat, Aug 20th'],
  //     ['before christmas', 'by Sun, Dec 25th'],
  //     // ['after christmas', 'Dec 25th 2016 - Jan 8th 2017'],
  //     // ['sometime after next week', 'Aug 19th - Sept 2nd 2016'],
  //     // ['after next weekend', 'Aug 21st - Sept 4th 2016'],
  //     ['september 5th 2018', 'on Wed, Sept 5th, 2018'],
  //     ['on april fools 2020', 'on Wed, Apr 1st, 2020'],
  //     // // ['june 5-7 1999', 'Jun 5-7, 1999'],
  //     // ['june 5 to 7, 1999', 'Jun 5-7, 1999'],
  //     // ['june 5th to 7, 1999', 'Jun 5-7, 1999'],
  //     // // ['june 5th-7th 2017', 'Jun 5-7, 2017'],
  //     // ['5th to 7 june, 1999', 'Jun 5-7, 1999'],
  //     // ['5 to 7 august 1999', 'Aug 5-7, 1999'],
  //     // ['15 to 20 of august 1999', 'Aug 15-20, 1999'],
  //     // ['15th - 20th of august', 'Aug 15-20'],
  //   ],
  // },
  // {
  //   today: [2016, 10, 23], //wed nov 23rd
  //   tests: [
  //     ['this month', 'nov 1 to nov 30'],
  //     // ['june twenty-first 1992', 'june 21 1992 - june 21 1992'],
  //     // ['this august', 'aug 1 2017 - aug 31 2017'],
  //     // ['the last weekend in october', 'Oct 28 to 29'],
  //     // ['the last weekend in october', 'Oct 28 to 29, 2017'],
  //     ['sometime tomorrow', 'Thu Nov 24th'],
  //     ['on april fools 2020', 'Wed, Apr 1st, 2020'],
  //     ['april fools at 5pm', 'Wed, Apr 1st, 2017 at 5:00pm'],
  //     ['on the 18th', 'Sun, Dec 18th'],
  //     ['this quarter', 'Oct 1st 2016 to Dec 31st 2016'],
  //     // ['this morning', 'Nov 23rd @ 9am'],
  //     ['10 August 2012', 'Aug 10 2012'],
  //     ['Sunday, March 6, 2016', 'Mar 6 2016'],
  //     ['August 10 to 22, 2012', 'Aug 10 2012 to Aug 22 2012'],
  //     ['May eighth, 2010', 'May 8 2010'],
  //     ['May twenty-fourth, 2010', 'May 24 2010'],
  //     ['Sep 2012', 'Sep 1 2012 to Sep 30 2012'],
  //     // ['Sept, 2012', 'Sep 1 2012 - Sep 30 2012'],
  //     ['Sep-2012', 'Sep 1 2012 to Sep 30 2012'],
  //     ['20/10/2012', 'Oct 20 2012'],
  //     // ['8/10/2012 - 8/15/2012', 'Aug 10 2012 - Aug 15 2012'],
  //     ['05-25-2015', 'May 25 2015'],
  //     ['5 Days ago', 'Nov 18 2016 to Nov 18 2016'],
  //     ['Sunday 12/7/2014', 'Dec 7 2014 to Dec 7 2014'],
  //     ['two weeks from now', 'Dec 7 2016'],
  //     // ['two and a half weeks from now', 'Dec 11th 2016'],
  //     // ['two sundays from now', 'Dec 4th 2016'],
  //     // ['two mondays from now', 'Dec 5th 2016'],
  //     // ['second weekend in 2019', 'Jan 12 to Jan 13, 2019'],
  //     ['Jan 12 to Jan 13', 'Jan 12 2017 to Jan 13 2017'],
  //     ['Jan 22 2017 to Jan 13 2018', 'January 22 2017 to January 13 2018'],
  //     // ['5 to 7 of january 1998', 'Jan 5th 1998 to Jan 7 1998'],
  //     // ['january 5 to 7 1998', 'Jan 5th 1998, to Jan 7 1998'],
  //     // ['third quarter 1998', 'july 1st 1998 to september 30th 1998'],
  //     // ['middle of q1 2019', 'feb 12 2019'],
  //     ['third day of 2019', 'jan 3rd 2019'],
  //     ['third week of 2019', 'jan 14th to 20th 2019'],
  //     ['third month of 2019', 'march 1 2019 to march 31th 2019'],
  //     ['first weekend of 2019', 'january 5 2019 to jan 6th 2019'],
  //     // ['the last week in 2019', 'dec 23rd 2019 to dec 29'],
  //     // ['the first quarter in 2019', 'january 1st to march 31st 2019'],
  //     // // ['the last quarter in 2019', 'october 1st to december 30th 2019'],
  //     ['last spring', 'march 1st 2015 to may 31st 2015'],
  //     ['this spring', 'march 1st 2016 to may 31st 2016'],
  //     ['next spring', 'march 1st 2017 to may 31st 2017'],
  //     ['the first week of june', 'May 29th 2017 to June 4th 2017'],
  //     ['22-23 Feb at 7pm', 'Feb 22 2017 until Feb 23 2017'],
  //     // ['22-23 Feb 2016 at 7pm', 'Feb 22 2016 to Feb 23 2016'],
  //     ['Tuesday, 10 January', 'Jan 10 2017'],
  //     // ['Monday - Wednesday', 'Nov 28 - Nov 30'],
  //     ['today to next friday', 'Nov 23 to Dec 2'],
  //     // ['middle of q1 1998', 'Feb 12 1998'],
  //     // ['within two weeks', 'Nov 23 to Dec 8'],
  //     // ['within a month', 'Nov 23 - Dec 23'],
  //     // ['within a few months', 'Nov 23 - Jan 23 2017'],
  //     // ['1994-11-05T13:15:30Z', 'Nov 5 1994'],
  //     ['August 10 to 22, 2012', 'Aug 10 2012 to Aug 22 2012'],
  //     ['August 10-22, 2012', 'Aug 10 2012 to Aug 22 2012'],
  //     // ['August 10 - November 12', 'Aug 10 2017 - Nov 12 2017'], //tricky
  //     // ['August 10 - January 12', 'Aug 10 2017 - Jan 12 2018'], //tricky
  //     ['May eighth to tenth, 2010', 'May 8 2010 to May 10 2010'],

  //     // ['04/2016', 'Apr 4 2016'],
  //     ['Tuesday 20/3/2015', 'march 20 2015'],
  //     ['2015.08.13', 'Aug 13 2015'],
  //     // ['this past mon', 'nov 21'],
  //     // ['two mondays from now', 'dec 5 - dec 5'],
  //     // ['2018 after june', 'jun 1 2018 - jun 15 2018'],
  //     ['fourth quarter, 2002', 'oct 1 2002  thru dec 31 2002'],
  //     ['thanksgiving 2018', 'nov 22 2018'],
  //   ],
  // },
  {
    today: [2017, 0, 1], //jan 1st 2017
    tests: [
      // ['this month', 'jan 1 2017 to jan 31 2017'],
      // ['this spring', 'March 1st 2017 to May 31 2017'],
      // ['this summer', 'june 1st 2017 to August 31 2017'],
      // ['this fall', 'September 1st 2017 to November 30 2017'],
      // ['this autumn', 'September 1st 2017 to November 30 2017'],
      // //     ['end of this summer', 'August 31 2017 - August 31 2017'], //-1 day
      // //     ['middle of this summer', 'Jul 13 2017 - Jul 13 2017'], //-6 weeks
      // ['this winter', 'dec 1st 2017 to February 28 2018'],
      // ['this spring', 'March 1 to May 31'],
      // ['this spring', 'March 1 2017 to May 31 2017'],
      // ['this fall', 'September 1 2017 to November 30 2017'],
      // ['next winter', 'dec 1st 2018 to February 28 2019'],
      // ['winter 2020', 'dec 1st 2020 to February 28 2021'],
      ['winter of 1992', 'dec 1st 1992 to February 28 1993'],
      // ['spring 2015', 'March 1 2015 to May 31 2015'],
      // ['fall 2012', 'September 1 2012 to November 30 2012'],
      // ['autumn of 2013', 'September 1 2013 to November 30 2013'],
      // ['last winter', 'December 1st 2015 through February 27 2016'], //last
      // ['this winter', 'December 1st 2016 to February 27 2017'], //current
      // ['next winter', 'December 1st 2017 until February 27 2018'], //next
      // ['end of this winter', 'February 28 2016 to February 28 2016'], //end
    ],
  },
]

test('full-dates', (t) => {
  tests.forEach((obj) => {
    const context = {
      today: obj.today,
      timezone: 'Canada/Pacific',
    }
    obj.tests.forEach((a) => {
      let left = nlp(a[0]).dates(context).json()[0]
      // ensure we found no date, if we shouldn't have
      if (!a[1]) {
        t.equal(left, undefined, 'no-date:' + a[0])
        return
      }
      let right = nlp(a[1]).dates(context).json()[0] || {}
      left.date = left.date || {}
      right.date = right.date || {}
      t.equal(left.date.start, right.date.start, 'start: ' + a[0])
      t.equal(left.date.end, right.date.end, 'end: ' + a[0])
    })
  })
  t.end()
})
