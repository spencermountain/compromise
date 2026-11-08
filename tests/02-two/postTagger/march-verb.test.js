import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/march-verb] '

test('march is a verb after a pronoun', function (t) {
  const arr = ['They march to Monday.', 'They march until Monday.', 'They march 5 miles a day.']
  arr.forEach(str => {
    const m = nlp(str).match('march')
    t.ok(m.has('#Verb'), here + `verb: '${str}'`)
    t.notOk(m.has('#Date'), here + `not a date: '${str}'`)
  })
  t.end()
})

test('march is not a month after a plural subject', function (t) {
  const arr = ['The soldiers march through Monday.', 'The soldiers march on Monday.', 'The soldiers march tomorrow.', 'The soldiers march.']
  arr.forEach(str => {
    t.notOk(nlp(str).match('march').has('#Date'), here + `not a date: '${str}'`)
  })
  t.end()
})

test('march is still a noun', function (t) {
  const arr = ['the protest march was peaceful', 'the students march ended', 'the civil rights march on Washington']
  arr.forEach(str => {
    t.ok(nlp(str).match('march').has('#Noun'), here + `noun: '${str}'`)
  })
  t.end()
})

test('march and may are still months', function (t) {
  const arr = [
    ['March to June', 'March'],
    ['from may to june', 'may'],
    ['March on Monday', 'March'],
    ['12 March on the Mall', 'March'],
    // a plural can sit before a capitalized month
    ['Results March to June', 'March'],
    ['Elections May 5', 'May'],
    ['Sales March 2020', 'March'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Month'), here + `month: '${str}'`)
  })
  t.end()
})
