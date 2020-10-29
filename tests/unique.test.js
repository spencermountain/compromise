const test = require('tape')
const nlp = require('./_lib')

test('term-unique', function (t) {
  let doc = nlp(`him and her and him`)
  let m = doc.terms().unique()
  t.equal(m.text(), 'him and her', 'terms-unique')
  t.equal(doc.text(), `him and her and him`, 'original-has-duplicates')
  t.end()
})

test('sentence-unique', function (t) {
  let str = `him and her. in toronto. him and her. him.`
  let doc = nlp(str)
  let uniq = doc.unique()
  t.equal(uniq.text(), 'him and her. in toronto. him.', 'remove dup sentences')
  t.equal(doc.text(), str, 'keep dup sentences')
  t.end()
})

test('unique-normalize', function (t) {
  let doc = nlp(`SPENCER's house (spencer)`)
  doc = doc.terms().unique()
  t.equal(doc.text(), "SPENCER's house", 'normalize-posessive')

  doc = nlp(`is not isn't`)
  doc = doc.terms().unique()
  t.equal(doc.text(), 'is not', 'normalize-contraction')
  t.end()
})
