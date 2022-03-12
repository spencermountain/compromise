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
  t.end()
})

test('swap-adverb', function (t) {
  let doc = nlp('suddenly and heatedly').compute('root')
  doc.swap('heated', 'warm')
  doc.swap('sudden', 'immediate')
  t.equal(doc.text(), 'immediately and warmly', here + 'swap-adverb')
  t.end()
})