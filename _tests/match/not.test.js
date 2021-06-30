const test = require('tape')
const nlp = require('../_lib')

test('not-basic :', function (t) {
  let m = nlp('spencer is really cool').not('brown')
  t.equal(m.out('text'), 'spencer is really cool', 'missing-not')
  t.equal(m.length, 1, 'one-result')

  m = nlp('spencer is really cool').not('#Adverb')
  t.equal(m.out('text'), 'spencer is cool', 'one-not')
  t.equal(m.length, 2, 'two-results')

  m = nlp('spencer is really cool').not('#Adverb+')
  t.equal(m.out('text'), 'spencer is cool', 'still-one-not')
  t.equal(m.length, 2, 'two-results-2')

  m = nlp('spencer is really cool').not('#Adverb+')
  t.equal(m.out('text'), 'spencer is cool', 'two-not')
  t.equal(m.length, 2, 'two-results-3')

  m = nlp('spencer is really cool').not('is #Adverb+')
  t.equal(m.out('text'), 'spencer cool', 'three-not')
  t.equal(m.length, 2, 'two-results-4')

  m = nlp('spencer is really cool. John is really nice').not('#Adverb')
  t.equal(m.out('text'), 'spencer is cool. John is nice', 'two-terms-matches')
  t.equal(m.length, 4, 'four-results')

  m = nlp('spencer is really cool. John is really nice.').not('pardon me, #Adverb')
  t.equal(m.out('text'), 'spencer is really cool. John is really nice.', 'tricky-no-match')
  t.equal(m.length, 2, 'two-original-results')

  t.end()
})

test('not-from-array :', function (t) {
  let m = nlp('spencer is really cool').not(['spencer'])
  t.equal(m.out('normal'), 'is really cool', 'not-spencer')
  t.equal(m.length, 1, 'one-results')

  m = nlp('spencer is really cool').not([''])
  t.equal(m.out('normal'), 'spencer is really cool', 'not-spencer')
  t.equal(m.length, 1, 'one-results-2')

  m = nlp('spencer is really cool').not(['spencer', 'really'])
  t.equal(m.out('normal'), 'is cool', 'not-spencer-really')
  t.equal(m.length, 2, 'two-results-arr')
  t.end()
})
