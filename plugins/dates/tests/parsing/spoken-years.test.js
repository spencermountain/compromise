import test from 'tape'
import nlp from '../_lib.js'
import { checkStarts, checkEnds } from '../_lib/date-assertions.js'
const here = '[dates/parsing/spoken-years] '

const context = { today: [2016, 1, 11], timezone: 'Canada/Eastern' }

test(here + 'a whole year', t => {
  const starts = [
    ['twenty twenty-six', '2026-01-01'],
    ['twenty twenty six', '2026-01-01'],
    ['in twenty twenty-six', '2026-01-01'],
    ['Twenty Twenty-Six', '2026-01-01'],
    ['twenty ten', '2010-01-01'],
    ['twenty nineteen', '2019-01-01'],
    ['twenty twenty', '2020-01-01'],
    ['twenty thirty', '2030-01-01'],
    ['twenty thirty-nine', '2039-01-01'],
    ['twenty forty', '2040-01-01'],
  ]
  checkStarts(t, context, starts)
  const ends = [
    ['twenty twenty-six', '2026-12-31'],
    ['twenty forty', '2040-12-31'],
  ]
  checkEnds(t, context, ends)
  t.end()
})

test(here + 'every year in range', t => {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const words = {}
  teens.forEach((w, i) => {
    words[2010 + i] = `twenty ${w}`
  })
  ones.forEach((w, i) => {
    words[2020 + i] = `twenty twenty ${w}`.trim()
    words[2030 + i] = `twenty thirty ${w}`.trim()
  })
  words[2040] = 'twenty forty'
  t.equal(Object.keys(words).length, 31, here + 'all 31 years')
  const arr = Object.entries(words).flatMap(([year, str]) => [
    [str, `${year}-01-01`],
    [`in ${str}`, `${year}-01-01`],
    [`june ${str}`, `${year}-06-01`],
    [`june fifth ${str}`, `${year}-06-05`],
    [`q2 ${str}`, `${year}-04-01`],
  ])
  checkStarts(t, context, arr)
  t.end()
})

test(here + 'as part of a date', t => {
  const arr = [
    ['june twenty twenty-six', '2026-06-01'],
    ['june of twenty twenty six', '2026-06-01'],
    ['december twenty ten', '2010-12-01'],
    ['june fifth twenty twenty-six', '2026-06-05'],
    ['june 5th twenty twenty-six', '2026-06-05'],
    ['june 5 twenty twenty-six', '2026-06-05'],
    ['june five twenty twenty-six', '2026-06-05'],
    ['fifth of june twenty twenty-six', '2026-06-05'],
    ['march twenty, twenty twenty', '2020-03-20'],
    ['q2 twenty thirty', '2030-04-01'],
    ['summer twenty twenty', '2020-06-01'],
    ['christmas twenty twenty-six', '2026-12-25'],
    ['march twenty twenty-six', '2026-03-01'],
    ['may twenty ten', '2010-05-01'],
    ['march five twenty twenty', '2020-03-05'],
    ['may five twenty twenty', '2020-05-05'],
    ['june twenty twenty twenty', '2020-06-20'],
    ['march twenty twenty twenty-six', '2026-03-20'],
  ]
  checkStarts(t, context, arr)
  t.end()
})

// the year is replaced with one term, while the rest of the sentence remains
test(here + 'within a sentence', t => {
  const arr = [
    ['the twenty twenty-six budget', '2026-01-01'],
    ['twenty twenty-six was great', '2026-01-01'],
    ['in twenty twenty-six we met', '2026-01-01'],
    ['we met in twenty twenty-six', '2026-01-01'],
    ['the twenty twenty election', '2020-01-01'],
    ['june fifth twenty twenty-six was great', '2026-06-05'],
    ['june twenty twenty-six was great', '2026-06-01'],
    ['q2 twenty thirty was great', '2030-04-01'],
    ['summer twenty twenty was great', '2020-06-01'],
    ['christmas twenty twenty-six was great', '2026-12-25'],
    ['march twenty, twenty twenty was great', '2020-03-20'],
    ['from twenty ten to twenty twenty was great', '2010-01-01'],
  ]
  checkStarts(t, context, arr)
  // and these don't change the original text
  const str = 'in twenty twenty-six we met'
  const doc = nlp(str)
  doc.dates(context).json()
  t.equal(doc.text(), str, here + 'text kept')
  t.end()
})

test(here + 'many dates', t => {
  const res = nlp('from twenty ten to twenty twenty').dates(context).json()[0]
  t.equal(res.dates.start.slice(0, 10), '2010-01-01', here + 'range start')
  t.equal(res.dates.end.slice(0, 10), '2020-12-31', here + 'range end')
  const to = nlp('twenty ten to twenty twenty').dates(context).json()[0]
  t.equal(to.dates.start.slice(0, 10), '2010-01-01', here + 'to start')
  t.equal(to.dates.end.slice(0, 10), '2020-12-31', here + 'to end')
  const both = nlp('twenty twenty-six and twenty thirty were great').dates(context).json()
  t.deepEqual(both.map(o => o.dates.start.slice(0, 10)), ['2026-01-01', '2030-01-01'], here + 'two years')
  t.end()
})

test(here + 'not a date', t => {
  const arr = [
    'twenty nine',
    'twenty fifty',
    'twenty eighty two',
    'fourty eighty two',
    'twenty forty one',
    'twenty twenty dollar bills',
    'two thousand and twenty-five',
    'two thousand and eight',
  ]
  arr.forEach(str => {
    t.equal(nlp(str).dates(context).length, 0, here + `no date: '${str}'`)
  })
  // these can be found as a duration, but never resolve to a year
  const counts = ['twenty ten minute walks', 'twenty thirty minutes', 'twenty ten km']
  counts.forEach(str => {
    const start = nlp(str).dates(context).json()[0]?.dates.start
    t.notOk(start, here + `no year: '${str}'`)
  })
  t.end()
})

test(here + 'clock-times stay times', t => {
  const context2 = { today: [2016, 1, 11], timezone: 'Canada/Eastern' }
  const arr = ['four thirty tomorrow', 'around four thirty', 'june 5th at four fifteen']
  arr.forEach(str => {
    t.ok(nlp(str).has('#Time'), here + `#Time: '${str}'`)
    t.notOk(nlp(str).has('#Year'), here + `no #Year: '${str}'`)
    t.ok(nlp(str).dates(context2).found, here + `date found: '${str}'`)
  })
  // a different year in the sentence does not stop it
  const doc = nlp('four thirty on june 5th 2020')
  t.ok(doc.has('four thirty') && doc.match('thirty').has('#Time'), here + 'time beside a numeric year')
  t.ok(doc.has('2020') && doc.match('2020').has('#Year'), here + 'numeric year beside a time')
  t.end()
})
