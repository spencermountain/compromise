import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/fraction-nouns] '

test('a named part is a noun, not a fraction', function (t) {
  const arr = [
    'It is the third quarter of the game',
    'the first quarter of the year',
    'in the last quarter of the year',
    'the final quarter of the match',
    'each quarter of the year',
    'the 3rd quarter of the game',
    'Second quarter of the game',
    'It is the second half of the game',
    'the first half of the game',
    'the other half of the people',
    'the lower half of the body',
    'my half of the deal',
  ]
  arr.forEach(str => {
    const m = nlp(str).match('(half|quarter)')
    t.equal(m.found, true, here + `found: '${str}'`)
    t.ok(m.has('#Noun'), here + `noun: '${str}'`)
    t.notOk(m.has('#Value'), here + `not a value: '${str}'`)
    t.notOk(m.has('#Fraction'), here + `not a fraction: '${str}'`)
  })
  t.end()
})

test('surrounding terms of a named part', function (t) {
  const doc = nlp('It is the third quarter of the game')
  t.ok(doc.has('^#Pronoun #Copula #Determiner #Ordinal #Noun #Preposition #Determiner #Noun$'), here + 'whole sentence')
  t.end()
})

test('fractions are still fractions', function (t) {
  const arr = [
    'a quarter of the pie',
    'one quarter of the pie',
    'quarter of the pie',
    'Quarter of the people left',
    'about a quarter of a mile',
    'more than a quarter of the people',
    'a full quarter of the people',
    'half of the people left',
    'half the people left',
    'half a penny',
    'a half of the pie',
    'one half of the pie',
    'at least half of the people',
    'nearly half of the people',
  ]
  arr.forEach(str => {
    const m = nlp(str).match('(half|quarter)')
    t.equal(m.found, true, here + `found: '${str}'`)
    t.ok(m.has('#Fraction'), here + `fraction: '${str}'`)
    t.notOk(m.has('#Noun'), here + `not a noun: '${str}'`)
  })
  t.end()
})
