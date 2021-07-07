const test = require('tape')
const nlp = require('./_lib')

test('tag-sequence:', function (t) {
  const doc = nlp('it was cold')
  doc.tag('#One #Two #Three')
  t.equal(doc.match('#One').text(), 'it', 'one')
  t.equal(doc.match('#Two').text(), 'was', 'two')
  t.equal(doc.match('#Three').text(), 'cold', 'three')
  t.end()
})

test('multiple-tags:', function (t) {
  const doc = nlp('it was cold')
  doc.tag(['#One', '#Two', '#Three'])
  t.equal(doc.match('#One').text(), 'it was cold', 'multi- all have #One')
  t.equal(doc.match('#Two').text(), 'it was cold', 'multi- all have #Two')
  t.equal(doc.match('#Three').text(), 'it was cold', 'multi- all have #Three')
  t.end()
})

test('tag-sequence-skip:', function (t) {
  const doc = nlp('it was cold')
  doc.tag('#One . #Three')
  t.equal(doc.match('#One').text(), 'it', 'one')
  t.equal(doc.match('#Two').text(), '', 'no-two')
  t.equal(doc.match('#.').text(), '', 'no-dot')
  t.equal(doc.match('#Three').text(), 'cold', 'three')
  t.end()
})

test('multiple-tags-skip:', function (t) {
  const doc = nlp('it was cold')
  doc.tag(['.', '#Two', '.'])
  t.equal(doc.match('#One').found, false, 'skip - none have #One')
  t.equal(doc.match('#Two').text(), 'it was cold', 'skip - all have #Two')
  t.equal(doc.match('#Three').found, false, 'skip - none have #Three')
  t.equal(doc.match('#.').found, false, 'skip - none have #dot')
  t.end()
})
