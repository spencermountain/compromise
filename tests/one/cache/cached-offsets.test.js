import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/offset] '

test('offset-whitespace', function (t) {
  let doc = nlp(`one two two more `).compute('offset')

  let m = doc.match('two')
  let obj = m.json({ offset: true, terms: false })[0] || { offset: {} }
  t.equal(obj.offset.start, 4, here + 'two-start')
  t.equal(obj.offset.length, 3, here + 'two-length')

  m = doc.match('two two')
  obj = m.json({ offset: true, terms: false })[0] || { offset: {} }
  t.equal(obj.offset.start, 4, here + '2 two-start')
  t.equal(obj.offset.length, 7, here + '2 two-length')

  doc = nlp(`  one two    two more `).compute('offset')
  m = doc.match('two two')
  obj = m.json({ offset: true, terms: false })[0] || { offset: {} }
  t.equal(obj.offset.length, 10, here + '3 two-length')
  t.equal(obj.offset.start, 6, here + '3 two-start')
  t.end()
})

test('offset-punctuation', function (t) {
  let doc = nlp(`one (two two) more `).compute('offset')
  let m = doc.match('two two')
  let obj = m.json({ offset: true, terms: false })[0] || { offset: {} }
  t.equal(obj.offset.start, 5, here + '4 two-start')
  t.equal(obj.offset.length, 9, here + '4 two-length')

  doc = nlp(`0123, 678`).compute('offset')
  m = doc.match('678')
  obj = m.json({ offset: true, terms: false })[0] || { offset: {} }
  t.equal(obj.offset.start, 6, here + '5 two-start')
  t.equal(obj.offset.length, 3, here + '5 two-length')

  t.end()
})

test('offset-terms', function (t) {
  const doc = nlp(`hello world`).compute('offset')
  const obj = doc.json({ offset: true, terms: true })[0] || { offset: {} }

  t.equal(obj.offset.start, 0, here + '6 doc-start')
  t.equal(obj.offset.length, 11, here + '6 doc-length')

  t.equal(obj.terms[0].offset.start, 0, here + '6 term 0-start')
  t.equal(obj.terms[0].offset.length, 5, here + '6 term 0-length')

  t.equal(obj.terms[1].offset.start, 6, here + '6 term 1-start')
  t.equal(obj.terms[1].offset.length, 5, here + '6 term 1-length')

  t.end()
})

test('offset-terms-whitespace', function (t) {
  const doc = nlp(` hello world`).compute('offset')
  const obj = doc.json({ offset: true, terms: true })[0] || { offset: {} }

  t.equal(obj.offset.start, 1, here + '7 doc-start')
  t.equal(obj.offset.length, 11, here + '7 doc-length')

  t.equal(obj.terms[0].offset.start, 1, here + '7 term 0-start')
  t.equal(obj.terms[0].offset.length, 5, here + '7 term 0-length')

  t.equal(obj.terms[1].offset.start, 7, here + '7 term 1-start')
  t.equal(obj.terms[1].offset.length, 5, here + '7 term 1-length')

  t.end()
})

test('offset-terms-punctuation', function (t) {
  const doc = nlp(`"hello world`).compute('offset')
  const obj = doc.json({ offset: true, terms: true })[0] || { offset: {} }

  t.equal(obj.offset.start, 1, here + '8 doc-start')
  t.equal(obj.offset.length, 12, here + '8 doc-length')

  t.equal(obj.terms[0].offset.start, 1, here + '8 term 0-start')
  t.equal(obj.terms[0].offset.length, 5, here + '8 term 0-length')

  t.equal(obj.terms[1].offset.start, 7, here + '8 term 1-start')
  t.equal(obj.terms[1].offset.length, 5, here + '8 term 1-length')

  t.end()
})
