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
