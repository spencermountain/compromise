const test = require('tape')
const nlp = require('../_lib')

test('offset-whitespace', function(t) {
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

test('offset-punctuation', function(t) {
  let doc = nlp(`one (two two) more `)
  let m = doc.match('two two')
  let obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.start, 5, '4 two-start')
  t.equal(obj.offset.length, 9, '4 two-length')

  doc = nlp(`0123, 678`)
  m = doc.match('678')
  obj = m.json({ offset: true, terms: false })[0]
  t.equal(obj.offset.start, 6, '5 two-start')
  t.equal(obj.offset.length, 3, '5 two-length')

  t.end()
})


test('offset-terms', function(t) {
  let doc = nlp(`hello world`)
  let obj = doc.json({ offset: true, terms: true })[0]

  t.equal(obj.offset.start, 0, 'doc-start')
  t.equal(obj.offset.length, 11, 'doc-length')

  t.equal(obj.terms[0].offset.start, 0, 'term 0-start')
  t.equal(obj.terms[0].offset.length, 5, 'term 0-length')

  t.equal(obj.terms[1].offset.start, 6, 'term 0-start')
  t.equal(obj.terms[1].offset.length, 5, 'term 0-length')

  t.end()
})

test('offset-terms-whitespace', function(t) {
  let doc = nlp(` hello world`)
  let obj = doc.json({ offset: true, terms: true })[0]

  t.equal(obj.offset.start, 1, 'doc-start')
  t.equal(obj.offset.length, 11, 'doc-length')

  t.equal(obj.terms[0].offset.start, 1, 'term 0-start')
  t.equal(obj.terms[0].offset.length, 5, 'term 0-length')

  t.equal(obj.terms[1].offset.start, 7, 'term 0-start')
  t.equal(obj.terms[1].offset.length, 5, 'term 0-length')

  t.end()
})

test('offset-terms-punctuation', function(t) {
  let doc = nlp(`"hello world`)
  let obj = doc.json({ offset: true, terms: true })[0]

  // The doc-level offset should perhaps be 0->12 or 1->11... but 1->12 is not
  // really sane.  This test will need to change if/when that gets figured out.
  t.equal(obj.offset.start, 1, 'doc-start')    // <==== arguably wrong!
  t.equal(obj.offset.length, 12, 'doc-length') // <==== arguably wrong!

  t.equal(obj.terms[0].offset.start, 1, 'term 0-start')
  t.equal(obj.terms[0].offset.length, 5, 'term 0-length')

  t.equal(obj.terms[1].offset.start, 7, 'term 0-start')
  t.equal(obj.terms[1].offset.length, 5, 'term 0-length')

  t.end()
})
