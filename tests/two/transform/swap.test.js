import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/swap] '

test('swap-verb', function (t) {
  let doc = nlp('i strolled downtown').compute('root')
  doc.swap('stroll', 'walk')
  t.equal(doc.text(), 'i walked downtown', here + 'vb-past')

  doc = nlp('he strolls downtown').compute('root')
  doc.swap('stroll', 'walk')
  t.equal(doc.text(), 'he walks downtown', here + 'vb-present')

  doc = nlp('he will stroll downtown').compute('root')
  doc.swap('stroll', 'walk')
  t.equal(doc.text(), 'he will walk downtown', here + 'vb-future')

  doc = nlp('stroll downtown please').compute('root')
  doc.swap('stroll', 'walk')
  t.equal(doc.text(), 'walk downtown please', here + 'vb-imp')


  doc = nlp('i dug up the solution, while digging up treasure.')
  doc.compute('root')
  doc.swap('dig up', 'find')
  t.equal(doc.text(), 'i found the solution, while finding treasure.', here + 'vb-multi')

  t.end()
})


test('swap-noun', function (t) {
  let doc = nlp('a cute koala').compute('root')
  doc.swap('koala', 'giraffe')
  t.equal(doc.text(), 'a cute giraffe', here + 'nn-sing')

  doc = nlp('two cute koalas').compute('root')
  doc.swap('koala', 'giraffe')
  t.equal(doc.text(), 'two cute giraffes', here + 'nn-plur')


  doc = nlp('I am Cliff Clavin').compute('root')
  doc.swap('cliff', 'giraffe', '!#Person')
  t.equal(doc.text(), 'I am Cliff Clavin', here + 'nn-guard')

  doc = nlp('two hot dogs please').compute('root')
  doc.swap('hot dog', 'hamburger') //use singular-forms
  t.equal(doc.text(), 'two hamburgers please', here + 'multi-word')

  doc = nlp("Jeff's bikes")
  doc.swap('Jeff', 'John')
  t.equal(doc.text(), `John's bikes`, here + 'keep-possessive')

  doc = nlp("Spencer Kelly's superstore")
  doc.swap('Spencer Kelly', 'Sam Altman')
  t.equal(doc.text(), `Sam Altman's superstore`, here + 'keep-possessive 2-term')

  doc = nlp("it was Montreal's.")
  doc.swap('Montreal', 'Quebec City')
  t.equal(doc.text(), `it was Quebec City's.`, here + 'keep-possessive mismatch')

  t.end()
})

test('swap-adverb', function (t) {
  const doc = nlp('suddenly and heatedly').compute('root')
  doc.swap('heated', 'warm')
  doc.swap('sudden', 'immediate')
  t.equal(doc.text(), 'immediately and warmly', here + 'swap-adverb')
  t.end()
})

test('swap-adjective', function (t) {
  let doc = nlp('he was fast')
  doc.compute('root')
  doc.swap('fast', 'quick')
  t.equal(doc.text(), 'he was quick', here + 'swap-adj')

  doc = nlp('he ran faster than her')
  doc.compute('root')
  doc.swap('fast', 'quick')
  t.equal(doc.text(), 'he ran quicker than her', here + 'swap-comparative')

  doc = nlp('he was the fastest')
  doc.compute('root')
  doc.swap('fast', 'quick')
  t.equal(doc.text(), 'he was the quickest', here + 'swap-superlative')
  t.end()
})