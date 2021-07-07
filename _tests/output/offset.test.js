const test = require('tape')
const nlp = require('../_lib')

test('offset-whitespace', function (t) {
  let doc = nlp(`one two two more `)

  let m = doc.match('two')
  let obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.start, 4, 'two-start')
  t.equal(obj.offset.length, 3, 'two-length')

  m = doc.match('two two')
  obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.start, 4, '2 two-start')
  t.equal(obj.offset.length, 7, '2 two-length')

  doc = nlp(`  one two    two more `)
  m = doc.match('two two')
  obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.length, 10, '3 two-length')
  t.equal(obj.offset.start, 6, '3 two-start')
  t.end()
})

test('offset-punctuation', function (t) {
  let doc = nlp(`one (two two) more `)
  let m = doc.match('two two')
  let obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.start, 4, '4 two-start')
  t.equal(obj.offset.length, 9, '4 two-length')

  doc = nlp(`0123, 678`)
  m = doc.match('678')
  obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.start, 6, '5 two-start')
  t.equal(obj.offset.length, 3, '5 two-length')

  t.end()
})

test('offset-terms', function (t) {
  let doc = nlp(`hello world`)
  let obj = doc.json({ offset: true, terms: true })[0]

  t.equal(obj.offset.start, 0, '6 doc-start')
  t.equal(obj.offset.length, 11, '6 doc-length')

  t.equal(obj.terms[0].offset.start, 0, '6 term 0-start')
  t.equal(obj.terms[0].offset.length, 5, '6 term 0-length')

  t.equal(obj.terms[1].offset.start, 6, '6 term 1-start')
  t.equal(obj.terms[1].offset.length, 5, '6 term 1-length')

  t.end()
})

test('offset-terms-whitespace', function (t) {
  let doc = nlp(` hello world`)
  let obj = doc.json({ offset: true, terms: true })[0]

  t.equal(obj.offset.start, 1, '7 doc-start')
  t.equal(obj.offset.length, 11, '7 doc-length')

  t.equal(obj.terms[0].offset.start, 1, '7 term 0-start')
  t.equal(obj.terms[0].offset.length, 5, '7 term 0-length')

  t.equal(obj.terms[1].offset.start, 7, '7 term 1-start')
  t.equal(obj.terms[1].offset.length, 5, '7 term 1-length')

  t.end()
})

test('offset-terms-punctuation', function (t) {
  let doc = nlp(`"hello world`)
  let obj = doc.json({ offset: true, terms: true })[0]

  t.equal(obj.offset.start, 0, '8 doc-start')
  t.equal(obj.offset.length, 12, '8 doc-length')

  t.equal(obj.terms[0].offset.start, 1, '8 term 0-start')
  t.equal(obj.terms[0].offset.length, 5, '8 term 0-length')

  t.equal(obj.terms[1].offset.start, 7, '8 term 1-start')
  t.equal(obj.terms[1].offset.length, 5, '8 term 1-length')

  t.end()
})
