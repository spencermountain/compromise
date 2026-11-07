import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/api/valid] '

const context = { today: '2026-09-10', timezone: 'Etc/UTC' }

test(here + 'drops impossible dates', function (t) {
  const arr = [
    ['february 222', []],
    ['nov 42nd', []],
    ['february 30, 2026', []],
    ['tomorrow at 25:00', []],
    ['the fifth monday of february 2027', []],
    ['someday', []],
    ['feb 14 or nov 42nd', ['feb 14']],
    ['see you on june 5th or maybe someday', ['on june 5th']],
  ]
  arr.forEach(([str, want]) => {
    const found = nlp(str).dates(context).isValid().out('array')
    t.deepEqual(found, want, str)
  })
  t.end()
})

test(here + 'keeps parseable dates and repeats', function (t) {
  const arr = [
    'tomorrow',
    'june 5th 2027',
    'every tuesday',
    'in two weeks',
    'between march and may',
  ]
  arr.forEach(str => {
    const dates = nlp(str).dates(context)
    t.equal(dates.isValid().length, dates.length, str)
  })
  t.end()
})

test(here + 'is chainable with the other filters', function (t) {
  const doc = nlp('nov 42nd, june 5th 2027, and april 7 2008')
  const m = doc.dates(context).isValid().isBefore('2010')
  t.deepEqual(m.out('array'), ['april 7 2008'], 'isValid then isBefore')
  t.deepEqual(m.get().map(d => d.start), ['2008-04-07T00:00:00.000Z'], 'opts survive the filter')
  t.end()
})
