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
