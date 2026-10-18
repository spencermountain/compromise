import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
import { checkEnds, checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/parsing/relative-dates] '

const february = 1
const march = 2
const april = 3
const may = 4
const june = 5
const august = 7
const september = 8
const october = 9
const november = 10
const december = 11

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['tomorrow before 3', [2016, february, 12]],
    ['three days before new years', [2016, december, 29]],
    ['in 48 hours', [2016, february, 13]],
    ['six months from now', [2016, august, 11]],
    ['two weeks from now', [2016, february, 25]],
    ['three weeks from now', [2016, march, 3]],
    ['ten days from now', [2016, february, 21]],
    ['in 10 days', [2016, february, 21]],
    ['in 3 weeks', [2016, march, 3]],
    ['in 2 years', [2018, february, 11]],
    ['in 5 years', [2021, february, 11]],
    ['72 hours from now', [2016, february, 14]],
    ['a week from now', [2016, february, 18]],
    ['a month from now', [2016, march, 11]],
    ['a year from now', [2017, february, 11]],
    ['tomorrow', [2016, february, 12]],
    ['the next day', [2016, february, 12]],
    // ['the day after next', [2016, february, 13]],
    ['day after tomorrow', [2016, february, 13]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

// ['6th yesterday', [2016, february, 9]],
// ['6 yesterday', [2016, february, 9]],
// ['today the 6th', [2016, march, 6]],
// ['today on the 6th', [2016, march, 6]],
// ['6th today', [2016, february, 10]],
// ['6 today', [2016, february, 10]],
// ['tomorrow the 6th', [2016, march, 6]],
// ['tomorrow on the 6th', [2016, march, 6]],
// ['6th tomorrow', [2016, february, 11]],
// ['6 tomorrow', [2016, february, 11]],

test(here + 'start dates — ' + JSON.stringify({ today: [2011, march, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2011, march, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['yesterday', [2011, march, 27]],
    ['tomorrow', [2011, march, 29]],
    ['tmrw', [2011, march, 29]],
    ['in 3 days', [2011, march, 31]],
    ['3 days ago', [2011, march, 25]],
    ['in 3 weeks', [2011, april, 18]],
    ['four weeks ago', [2011, february, 28]],
    ['in 3 months', [2011, june, 28]],
    ['three months ago', [2010, december, 28]],
    ['in 3 years', [2014, march, 28]],
    ['seven years ago', [2004, march, 28]],
    ['60 years ago', [1951, march, 28]],
    ['2 days ago', [2011, march, 26]],
    ['5 days ago', [2011, march, 23]],
    ['in 6 weeks', [2011, may, 9]],
    ['in 6 months', [2011, september, 28]],
    ['in 12 months', [2012, march, 28]],
    ['in 18 months', [2012, september, 28]],
    ['in 2 years', [2013, march, 28]],
    ['in 10 years', [2021, march, 28]],
    ['30 days ago', [2011, february, 26]],
    ['14 days ago', [2011, march, 14]],
    ['21 days from now', [2011, april, 18]],
    ['365 days from now', [2012, march, 27]],
    // ['100 months now', [2019, july, 28]],
    ['100 years from now', [2111, march, 28]],
    // ['in a september', [2011, october, 1]],
    // ['in an october', [2011, november, 1]],
    ['in a year', [2012, march, 28]],
    ['in a week', [2011, april, 4]],
    ['a week from now', [2011, april, 4]],
    ['a month from today', [2011, april, 28]],
    ['A month ago', [2011, february, 28]],
    ['A week ago', [2011, march, 21]],
    ['A year ago', [2010, march, 28]],
    ['1 year 9 months from now', [2012, december, 28]],
    // ['1 year 9 months 1 day from now', [2012, december, 29]],
    ['2 years 4 months ago', [2008, november, 28]],
    // ['2 years 4 months 5 days ago', [2008, november, 23]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, april, 19], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, april, 19], timezone: 'Canada/Eastern' }
  const rows = [
    ['tomorrow', [2016, april, 20]],
    ['three days from today', [2016, april, 22]],
    ['four weeks from today', [2016, may, 17]],
    ['six months from today', [2016, october, 19]],
    ['a week before june 1st', [2016, may, 25]],
    ['one hour from today', [2016, april, 19]],
    ['24 hours from today', [2016, april, 20]],
    ['two days from today', [2016, april, 21]],
    ['two weeks from today', [2016, may, 3]],
    ['two months from today', [2016, june, 19]],
    ['three years from today', [2019, april, 19]],
    ['three years after yesterday', [2019, april, 18]],
    ['a month after yesterday', [2016, may, 18]],
    ['a month after new years', [2017, february, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['two days after may 26th', [2016, may, 28]],
    ['in 2 weeks', [2016, may, 25]],
    ['in 4 weeks', [2016, june, 8]],
    ['today', [2016, may, 11]],
    ['in 8 days', [2016, may, 19]],
    ['tomorrow early in the day', [2016, may, 12]],
    ['tomorrow am', [2016, may, 12]],
    ['tomorrow pm', [2016, may, 12]],
    ['in 2 weeks', [2016, may, 25]],
    ['in 3 weeks', [2016, june, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 4], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 4], timezone: 'Canada/Eastern' }
  const rows = [
    ['next day', [2016, october, 5]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }
  const rows = [
    ['today', [2017, october, 7]],
    ['sometime today', [2017, october, 7]],
    ['dinnertime tomorrow', [2017, october, 8]],
    ['yesterday', [2017, october, 6]],
    ['in 3 days', [2017, october, 10]],
    ['in 7 days', [2017, october, 14]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 15], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 15], timezone: 'Canada/Eastern' }
  const rows = [
    ['november 10th in a year', [2017, november, 10]],
    // ['november 10th a year from now', [2017, november, 10]],
    ['november 10th in two years', [2018, november, 10]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, november, 13], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, november, 13], timezone: 'Canada/Eastern' }
  const rows = [
    ['in a week', [2016, november, 20]],
    // ['in basically one week from now', [2016, november, 20]],
    ['on a week from now', [2016, november, 20]],
    ['a week from today', [2016, november, 20]],
    // ['about a week following today', [2016, november, 20]],
    // ['a week and a half from now', [2016, november, 23]],
    // ['about a week and a half from now', [2016, november, 23]],
    // ['starting a week and a half after today', [2016, november, 23]],
    ['a month from now', [2016, december, 13]],
    ['in 2 weeks', [2016, november, 27]],
    ['in 3 weeks', [2016, december, 4]],
    ['two weeks from now', [2016, november, 27]],
    ['three weeks from now', [2016, december, 4]],
    ['in 10 days', [2016, november, 23]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, august, 1], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, august, 1], timezone: 'Canada/Eastern' }
  const rows = [
    ['a month from now', [2016, september, 1]],
    ['in 3 months', [2016, november, 1]],
    ['in 4 months', [2016, december, 1]],
    ['six months from now', [2017, february, 1]],
    ['two years from now', [2018, august, 1]],
    // ['a month and a half from now', [2016, september, 12]],
    ['a year from now', [2017, august, 1]],
    // ['a year and a half from now', [2018, february, 1]],
    // ['one year and a half from now', [2018, february, 1]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'inclusive end dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Pacific' }
  const rows = [
    // ['sometime tomorrow before 3', [2016, february, 12]],
    // ['on the day after next', [2016, february, 13]],
    ['on tomorrow', [2016, february, 12]],
    ['on yesterday', [2016, february, 10]],
    ['on today', [2016, february, 11]],
  ]
  checkEnds(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 7, 13], timezone: 'Canada/Pacific' }
  const rows = [
    //days
    ['today', 'today, Sat Aug 13th'],
    ['yesterday', 'yesterday, Fri Aug 12th'],
    ['tomorrow', 'tomorrow, Sun Aug 14th'],
    // ['in 2018', 'Jan 1 - Dec 31, 2018'],
    ['in 3 days', 'Tues, Aug 16th'],
    ['in 2 weeks', 'Aug 27th'],
    ['two weeks from now', 'Aug 27th'],
    ['in 10 days', 'on Sat, Aug 23rd'],
    ['in 1 week', 'on Sat, Aug 20th'],
    ['a week from now', 'on Sat, Aug 20th'],
    ['three days from now', 'on Tues, Aug 16th'],
    ['sometime tomorrow', 'tomorrow, Sun Aug 14th'],
    ['in 14 days', 'on Sat, Aug 27th'],
    ['in 21 days', 'on Sat, Sep 3rd'],
    ['in 30 days', 'on Mon, Sep 12th'],
    ['in 6 weeks', 'on Sat, Sep 24th'],
    ['in 6 months', 'on Mon, Feb 13th, 2017'],
    ['in 1 year', 'on Sun, Aug 13th, 2017'],
    ['3 days ago', 'on Wed, Aug 10th'],
    ['5 days ago', 'on Mon, Aug 8th'],
    ['1 week ago', 'on Sat, Aug 6th'],
    ['2 weeks ago', 'on Sat, Jul 30th'],
    ['1 month ago', 'on Wed, Jul 13th'],
    ['three days before new years', 'on Thu, Dec 29th'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    ['sometime tomorrow', 'Thu Nov 24th'],
    ['5 Days ago', 'Nov 18 2016 to Nov 18 2016'],
    ['two weeks from now', 'Dec 7 2016'],
    ['today', 'Thu Nov 23rd'],
    ['yesterday', 'Wed Nov 22nd'],
    ['tomorrow', 'Fri Nov 24th'],
    ['in 5 days', 'Nov 28 2016'],
    ['in 2 weeks', 'Dec 7 2016'],
    ['in 3 months', 'Feb 23 2017'],
    ['in 1 week', 'Nov 30 2016'],
    ['a week from now', 'Nov 30 2016'],
    ['three weeks from now', 'Dec 14 2016'],
    ['six months from now', 'May 23 2017'],
    ['a year from now', 'Nov 23 2017'],
    ['in 14 days', 'Dec 7 2016'],
    ['in 21 days', 'Dec 14 2016'],
    ['in 30 days', 'Dec 23 2016'],
    ['in 6 weeks', 'Jan 4 2017'],
    ['in 1 year', 'Nov 23 2017'],
    ['3 days ago', 'Nov 20 2016'],
    ['7 days ago', 'Nov 16 2016'],
    ['14 days ago', 'Nov 9 2016'],
    ['30 days ago', 'Oct 24 2016'],
    ['2 months ago', 'Sep 23 2016'],
    ['6 months ago', 'May 23 2016'],
    ['1 year ago', 'Nov 23 2015'],
    ['three days before new years', 'dec 29 2016'],
    ['two days from now', 'Nov 25 2016'],
    ['four weeks from now', 'Dec 21 2016'],
    ['five months from now', 'Apr 23 2017'],
    ['nine months from now', 'Aug 23 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2017, 0, 1], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2017, 0, 1], timezone: 'Canada/Pacific' }
  const rows = [
    ['today', 'Sun Jan 1st 2017'],
    ['tomorrow', 'Mon Jan 2nd 2017'],
    ['in 3 days', 'jan 4 2017'],
    ['in 2 weeks', 'jan 15 2017'],
    ['two weeks from now', 'jan 15 2017'],
    ['in 7 days', 'jan 8 2017'],
    ['in 14 days', 'jan 15 2017'],
    ['in 21 days', 'jan 22 2017'],
    ['in 30 days', 'jan 31 2017'],
    ['in 6 weeks', 'feb 12 2017'],
    ['in 6 months', 'jul 1 2017'],
    ['in 1 year', 'jan 1 2018'],
    ['3 days ago', 'dec 29 2016'],
    ['5 days ago', 'dec 27 2016'],
    ['1 week ago', 'dec 25 2016'],
    ['2 weeks ago', 'dec 18 2016'],
    ['1 month ago', 'dec 1 2016'],
    ['a month from now', 'feb 1 2017'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [

    // named-dates
    [`today`, '2020-01-21'],
    [`now`, 'right now'],
    [`tomorrow`, '2020-01-22'],
    [`in a few years`, `in 3 years`],
    [`in a couple years`, `in 2 years`],
    [`in a couple of years`, `in 2 years`],
    [`2 weeks back`, `2 weeks ago`],
    // relative dates
    [`in 3 days`, '2020-01-24'],
    [`in 1 week`, '2020-01-28'],
    [`in 2 months`, '2020-03-21'],
    [`in 1 year`, '2021-01-21'],
    [`2 days ago`, '2020-01-19'],
    [`1 week ago`, '2020-01-14'],
    [`2 months ago`, '2019-11-21'],
    [`1 year ago`, '2019-01-21'],

    // additional named-dates
    [`yesterday`, '2020-01-20'],
    [`in a few months`, `in 3 months`],
    [`in a couple months`, `in 2 months`],
    [`2 weeks from now`, `2 weeks from today`],
    // additional relative dates
    [`in 4 days`, '2020-01-25'],
    [`in 2 weeks`, '2020-02-04'],
    [`in 3 months`, '2020-04-21'],
    [`in 2 years`, '2022-01-21'],
    [`3 days ago`, '2020-01-18'],
    [`2 weeks ago`, '2020-01-07'],
    [`3 months ago`, '2019-10-21'],
    [`2 years ago`, '2018-01-21'],
    [`in 5 days`, `2020-01-26`],
    [`in 6 days`, `2020-01-27`],
    [`in 10 days`, `2020-01-31`],
    [`in 14 days`, `2020-02-04`],
    [`in 3 weeks`, `2020-02-11`],
    [`in 4 weeks`, `2020-02-18`],
    [`in 6 months`, `2020-07-21`],
    [`in 3 years`, `2023-01-21`],
    [`5 days ago`, `2020-01-16`],
    [`10 days ago`, `2020-01-11`],
    [`3 weeks ago`, `2019-12-31`],
    [`6 months ago`, `2019-07-21`],
    [`3 years ago`, `2017-01-21`],
    [`a week from now`, `2020-01-28`],
    [`a month from now`, `2020-02-21`],
    [`a year from now`, `2021-01-21`],
    [`a week ago`, `2020-01-14`],
    [`a month ago`, `2019-12-21`],
    [`a year ago`, `2019-01-21`],
    [`in a few days`, `in 3 days`],
    [`in a couple days`, `in 2 days`],
    [`in a few weeks`, `in 3 weeks`],
    [`in a couple weeks`, `in 2 weeks`],
    [`2 days back`, `2 days ago`],
    [`3 weeks back`, `3 weeks ago`],
    [`1 month back`, `1 month ago`],
    [`1 year back`, `1 year ago`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'relative days and weekdays — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'relative days and weekdays': [
    ['today', '2026-09-10'],
    ['tomorrow', '2026-09-11'],
    ['yesterday', '2026-09-09'],
    ['the day after tomorrow', '2026-09-12'],
    ['the day before yesterday', '2026-09-08'],
    ['two days from today', '2026-09-12'],
    ['three days ago', '2026-09-07'],
    ['in ten days', '2026-09-20'],
    ['thirty days from today', '2026-10-10'],
    ['a week from today', '2026-09-17'],
    ['a fortnight from today', '2026-09-24'],
    ['a fortnight ago', '2026-08-27'],
    ['in six weeks', '2026-10-22'],
    ['two weeks ago', '2026-08-27'],
    ['one month from today', '2026-10-10'],
    ['three months ago', '2026-06-10'],
    ['six months from today', '2027-03-10'],
    ['a year from today', '2027-09-10'],
    ['a year ago today', '2025-09-10'],
    ['three years ago tomorrow', '2023-09-11'],
    ['one year and two months from today', '2027-11-10'],
    ['two weeks and three days from today', '2026-09-27'],
    ['Thursday', '2026-09-10'],
    ['Friday', '2026-09-11'],
    ['Saturday', '2026-09-12'],
    ['Sunday', '2026-09-13'],
    ['Monday', '2026-09-14'],
    ['Tuesday', '2026-09-15'],
    ['Wednesday', '2026-09-16'],
    ['this Thursday', '2026-09-10'],
    ['this coming Monday', '2026-09-14'],
    ['next Thursday', '2026-09-17'],
    ['next Friday', '2026-09-18'],
    ['last Friday', '2026-09-04'],
    ['this past Monday', '2026-09-07'],
    ['the Monday after next', '2026-09-21'],
    ['a week from tomorrow', '2026-09-18'],
    ['a week ago yesterday', '2026-09-02'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})

test(here + 'day after next', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('day after next'), '2026-07-13T00:00:00.000-04:00', 'day after next')
  t.equal(getStart('the week after next'), '2026-07-20T00:00:00.000-04:00', 'week after next')
  t.equal(getStart('the weekend after next'), '2026-07-25T00:00:00.000-04:00', 'weekend after next')
  const wed = { today: '2026-07-08', timezone: 'America/New_York' }
  t.equal(getStart('the saturday after next', wed), '2026-07-18T00:00:00.000-04:00', 'saturday after next')
  t.end()
})

test(here + 'relative shifts', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('two weeks hence'), '2026-07-25T00:00:00.000-04:00', 'hence is the future')
  t.equal(getStart('in a few weeks'), '2026-08-01T00:00:00.000-04:00', 'a few is 3')
  t.equal(getStart('in a couple of weeks'), '2026-07-25T00:00:00.000-04:00', 'a couple of')
  t.equal(getStart('a few days ago'), '2026-07-08T00:00:00.000-04:00', 'a few days ago')
  const noon = { today: '2026-07-11T12:00:00', timezone: 'America/New_York' }
  t.equal(getStart('in half an hour', noon), '2026-07-11T12:30:00.000-04:00', 'half an hour is 30min')
  t.equal(getStart('half an hour ago', noon), '2026-07-11T11:30:00.000-04:00', 'half an hour ago')
  t.equal(getStart('2 years, 4 months, and 5 days ago'), '2024-03-06T00:00:00.000-05:00', 'multi-unit shift')
  t.equal(getStart('a week and a half before'), '2026-06-30T12:00:00.000-04:00', 'a week and a half')
  t.equal(getStart('in a year and a half'), '2028-01-11T00:00:00.000-05:00', 'in a year and a half')
  t.end()
})

test(here + 'possessive relative expressions', t => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart("in a month's time"), '2026-08-11T00:00:00.000-04:00', "a month's time")
  t.equal(getStart("in a week's time"), '2026-07-18T00:00:00.000-04:00', "a week's time")
  t.equal(getStart("in a year's time"), '2027-07-11T00:00:00.000-04:00', "a year's time")
  t.equal(getStart("in two weeks' time"), '2026-07-25T00:00:00.000-04:00', "two weeks' time")
  t.end()
})
