import test from 'tape'
import nlp from '../_lib.js'
import { checkStarts, checkEnds } from '../_lib/date-assertions.js'
const here = '[dates/parsing/possessive-years] '

const context = { today: [2016, 1, 11], timezone: 'Canada/Eastern' }

test(here + 'a whole year', t => {
  const starts = [
    [`2020's election`, '2020-01-01'],
    [`2020’s election`, '2020-01-01'],
    [`in 2020's election`, '2020-01-01'],
    [`1992's election`, '1992-01-01'],
    [`2026's budget`, '2026-01-01'],
    [`2020's over`, '2020-01-01'],
    [`twenty twenty's election`, '2020-01-01'],
    [`twenty twenty-six's budget`, '2026-01-01'],
    [`Twenty Twenty-Six's budget`, '2026-01-01'],
    [`twenty ten's results`, '2010-01-01'],
    [`we saw twenty thirty's goals last week`, '2030-01-01'],
  ]
  checkStarts(t, context, starts)
  const ends = [
    [`2020's election`, '2020-12-31'],
    [`twenty twenty-six's budget`, '2026-12-31'],
  ]
  checkEnds(t, context, ends)
  t.end()
})

test(here + 'as part of a date', t => {
  const arr = [
    [`june 2020's election`, '2020-06-01'],
    [`june of 2020's election`, '2020-06-01'],
    [`june 5th 2020's election`, '2020-06-05'],
    [`june twenty twenty's election`, '2020-06-01'],
    [`june fifth twenty twenty-six's budget`, '2026-06-05'],
    [`fifth of june 2020's election`, '2020-06-05'],
    [`q2 2030's results`, '2030-04-01'],
    [`q2 twenty thirty's results`, '2030-04-01'],
    [`summer 2020's heat`, '2020-06-01'],
    [`christmas 2020's dinner`, '2020-12-25'],
  ]
  checkStarts(t, context, arr)
  t.end()
})

test(here + 'the text is untouched', t => {
  const arr = [`2020's election`, `twenty twenty-six's budget`, `in june 2020's election`]
  arr.forEach(str => {
    const doc = nlp(str)
    const dates = doc.dates(context)
    dates.json()
    t.equal(doc.text(), str, here + `text kept: '${str}'`)
    t.ok(doc.has('#Possessive'), here + `still #Possessive: '${str}'`)
  })
  const found = nlp(`we saw 2020's election`).dates(context)
  t.deepEqual(found.out('array'), [`2020's`], here + 'found text')
  t.end()
})

test(here + 'not a date', t => {
  const arr = [
    `today's laundry`,
    `tomorrow's weather forecast`,
    `the 1990's were great`,
    `in the 1990's`,
    `the early 1990's`,
    `1980's music`,
    `the 2020's`,
    `twenty fifty's election`,
    `five's company`,
    `john's car`,
  ]
  arr.forEach(str => {
    t.equal(nlp(str).dates(context).length, 0, here + `no date: '${str}'`)
  })
  t.end()
})
