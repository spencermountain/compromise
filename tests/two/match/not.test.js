import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/not] '

test('not-basic :', function (t) {
  let m = nlp('spencer is really cool').not('brown')
  t.equal(m.out('text'), 'spencer is really cool', here + 'missing-not')
  t.equal(m.length, 1, here + 'one-result')

  m = nlp('spencer is really cool').not('#Adverb')
  t.equal(m.out('text'), 'spencer is cool', here + 'one-not')
  t.equal(m.length, 2, here + 'two-results')

  m = nlp('spencer is really cool').not('#Adverb+')
  t.equal(m.out('text'), 'spencer is cool', here + 'still-one-not')
  t.equal(m.length, 2, here + 'two-results-2')

  m = nlp('spencer is really cool').not('#Adverb+')
  t.equal(m.out('text'), 'spencer is cool', here + 'two-not')
  t.equal(m.length, 2, here + 'two-results-3')

  m = nlp('spencer is really cool').not('is #Adverb+')
  t.equal(m.out('text'), 'spencer cool', here + 'three-not')
  t.equal(m.length, 2, here + 'two-results-4')

  m = nlp('spencer is really cool. John is really nice').not('#Adverb')
  t.equal(m.out('text'), 'spencer is cool. John is nice', here + 'two-terms-matches')
  t.equal(m.length, 4, here + 'four-results')

  m = nlp('spencer is really cool. John is really nice.').not('pardon me, #Adverb')
  t.equal(m.out('text'), 'spencer is really cool. John is really nice.', here + 'tricky-no-match')
  t.equal(m.length, 2, here + 'two-original-results')

  t.end()
})

test('not-from-array :', function (t) {
  let m = nlp('spencer is really cool').not('spencer')
  t.equal(m.out('normal'), 'is really cool', here + 'not-spencer')
  t.equal(m.length, 1, here + 'one-results')

  m = nlp('spencer is really cool').not('lkjasdf')
  t.equal(m.out('normal'), 'spencer is really cool', here + 'not-spencer')
  t.equal(m.length, 1, here + 'one-results-2')

  // m = nlp('spencer is really cool').not(['spencer', 'really'])
  // t.equal(m.out('normal'), 'is cool', 'not-spencer-really')
  // t.equal(m.length, 2, 'two-results-arr')
  t.end()
})

test('not-from-match :', function (t) {
  let doc = nlp(`nooooo one two for sure`)
  let m = doc.match('one two')
  let res = m.not('one')
  t.equal(res.text(), 'two', 'not first, so second')
  res = m.not('two')
  t.equal(res.text(), 'one', 'not second, so first')
  t.end()
})
