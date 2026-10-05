import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/unique] '

test('term-unique', function (t) {
  const doc = nlp(`him and her and him`)
  const m = doc.terms().unique()
  t.equal(m.text(), 'him and her', here + 'terms-unique')
  t.equal(doc.text(), `him and her and him`, here + 'original-has-duplicates')
  t.end()
})

test('sentence-unique', function (t) {
  const str = `him and her. in toronto. him and her. him.`
  const doc = nlp(str)
  const uniq = doc.unique()
  t.equal(uniq.text(), 'him and her. in toronto. him.', here + 'remove dup sentences')
  t.equal(doc.text(), str, here + 'keep dup sentences')
  t.end()
})

test('unique-normalize', function (t) {
  let doc = nlp(`SPENCER's house (spencer)`)
  doc = doc.terms().unique()
  t.equal(doc.text(), "SPENCER's house", here + 'normalize-possessive')

  doc = nlp(`is not isn't`)
  doc = doc.terms().unique()
  t.equal(doc.text(), 'is not', here + 'normalize-contraction')
  t.equal(doc.length, 2, here + 'implicit words are uniqued')
  t.end()
})
