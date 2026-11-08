import test from 'tape'
import nlp from '../_lib.js'
import { checkStarts, checkEnds } from '../_lib/date-assertions.js'
const here = '[dates/parsing/multi-word-numbers] '

const context = { today: [2016, 1, 11], timezone: 'Canada/Eastern' }

// these should act the same as '25 days ago'
test(here + 'shifts by a multi-word number', t => {
  const arr = [
    ['twenty five days ago', '2016-01-17'],
    ['25 days ago', '2016-01-17'],
    ['in twenty five days', '2016-03-07'],
    ['in 25 days', '2016-03-07'],
    ['twenty five days from now', '2016-03-07'],
    ['two hundred days ago', '2015-07-26'],
    ['in two hundred days', '2016-08-29'],
    ['twenty five days before june 1st', '2016-05-07'],
    ['twenty five days after june 1st', '2016-06-26'],
  ]
  checkStarts(t, context, arr)
  t.end()
})

// these should act the same as '100 years ago'
test(here + 'shifts by a number with an article', t => {
  const arr = [
    ['100 years ago', '1916-02-11'],
    ['a hundred years ago', '1916-02-11'],
    ['A hundred years ago', '1916-02-11'],
    ['about a hundred years ago', '1916-02-11'],
    ['a hundred years from now', '2116-02-11'],
    ['A hundred years from tonight', '2116-02-11'],
    ['maybe a hundred years from now', '2116-02-11'],
    ['in a hundred years', '2116-02-11'],
    ['in about a hundred years', '2116-02-11'],
    ['a thousand days ago', '2013-05-17'],
    ['a dozen days ago', '2016-01-30'],
    ['in a dozen days', '2016-02-23'],
    // no number to find
    ['a year ago', '2015-02-11'],
    ['in a week', '2016-02-18'],
  ]
  checkStarts(t, context, arr)
  t.end()
})

// a number that describes something else is not a shift
test(here + 'an article and a number, without a shift', t => {
  const arr = [
    `if you put in a 12-hour day`,
    `in a 20-minute video`,
    `In a 2008 weekend fire sale`,
    `in a hundred-year flood`,
    `in a two-week trial`,
    `in a 5 year plan`,
  ]
  arr.forEach(str => {
    const found = nlp(str).dates(context).json().filter(o => o.dates.start)
    t.deepEqual(found, [], here + `no shift: '${str}'`)
    t.notOk(nlp(str).has('#DateShift'), here + `no #DateShift: '${str}'`)
  })
  // an idiom, and too far away to be a date
  t.equal(nlp('he would never go in a million years').dates(context).json()[0]?.dates.start ?? null, null, here + 'a million years')
  t.end()
})

// the year applies to each month
test(here + 'a list of months', t => {
  const arr = [
    ['june or july 2019', '2019-06-01'],
    ['during june or july 2019', '2019-06-01'],
    ['in june or july 2019', '2019-06-01'],
    ['in October and November 1993', '1993-10-01'],
    ['in june or july', '2016-06-01'],
  ]
  checkStarts(t, context, arr)
  const res = nlp('in October and November 1993').dates(context).get()
  t.deepEqual(res.map(o => o.start.slice(0, 7)), ['1993-10', '1993-11'], here + 'each month')
  t.end()
})

// these used to find the month of 'today', and not the month that was written
test(here + 'a day before a month', t => {
  const arr = [
    ['24 November 1961', '1961-11-24'],
    ['of 24 November 1961 and 16 December 1993', '1961-11-24'],
    ['19 March 1992 and 22 December 1992', '1992-03-19'],
    ['on 21 December 1990', '1990-12-21'],
    ['(December 1993)', '1993-12-01'],
  ]
  checkStarts(t, context, arr)
  t.end()
})

// these should act the same as '25 minutes'
test(here + 'only a duration is not a date', t => {
  const arr = [
    '25 minutes',
    'twenty five minutes',
    'twenty five days',
    'two hundred days',
    'twenty ten minute walks',
    'twenty thirty minutes',
    'for twenty five days',
  ]
  arr.forEach(str => {
    t.equal(nlp(str).dates(context).length, 0, here + `no date: '${str}'`)
  })
  const res = nlp('twenty five minutes on tuesday').dates(context)
  t.deepEqual(res.out('array'), ['tuesday'], here + 'only the weekday')
  t.end()
})

// the weekday should survive a value after it
test(here + 'a weekday before a value', t => {
  const arr = [
    ['tuesday 7 next week', '2016-02-16'],
    ['meet me friday 7 next week', '2016-02-12'],
    ['june 7 next year', '2017-06-07'],
    ['on 7 this month', '2016-02-07'],
  ]
  checkStarts(t, context, arr)
  t.deepEqual(nlp('meet me friday 7 next week').dates(context).out('array'), ['friday 7 next week'], here + 'whole phrase')
  t.end()
})

test(here + 'a dash after a multi-word number', t => {
  const starts = [
    ['june twenty five - june twenty six', '2016-06-25'],
    ['june 25 - june 26', '2016-06-25'],
    ['twenty ten - twenty twenty', '2010-01-01'],
    ['june twenty ten - june twenty twenty', '2010-06-01'],
    ['2010 - 2020', '2010-01-01'],
  ]
  checkStarts(t, context, starts)
  const ends = [
    ['june twenty five - june twenty six', '2016-06-26'],
    ['june 25 - june 26', '2016-06-26'],
    ['twenty ten - twenty twenty', '2020-12-31'],
    ['june twenty ten - june twenty twenty', '2020-06-30'],
    ['2010 - 2020', '2020-12-31'],
  ]
  checkEnds(t, context, ends)
  t.end()
})
