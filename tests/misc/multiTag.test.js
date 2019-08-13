var test = require('tape')
var nlp = require('../_lib')

test('tag-sequence:', function(t) {
  var doc = nlp('it was cold')
  doc.tag('#One #Two #Three')
  t.equal(doc.match('#One').normal(), 'it', 'one')
  t.equal(doc.match('#Two').normal(), 'was', 'two')
  t.equal(doc.match('#Three').normal(), 'cold', 'three')
  t.end()
})

test('multiple-tags:', function(t) {
  var doc = nlp('it was cold')
  doc.tag(['#One', '#Two', '#Three'])
  t.equal(doc.match('#One').normal(), 'it was cold', 'multi- all have #One')
  t.equal(doc.match('#Two').normal(), 'it was cold', 'multi- all have #Two')
  t.equal(doc.match('#Three').normal(), 'it was cold', 'multi- all have #Three')
  t.end()
})

test('tag-sequence-skip:', function(t) {
  var doc = nlp('it was cold')
  doc.tag('#One . #Three')
  t.equal(doc.match('#One').normal(), 'it', 'one')
  t.equal(doc.match('#Two').normal(), '', 'no-two')
  t.equal(doc.match('#.').normal(), '', 'no-dot')
  t.equal(doc.match('#Three').normal(), 'cold', 'three')
  t.end()
})

test('multiple-tags-skip:', function(t) {
  var doc = nlp('it was cold')
  doc.tag(['.', '#Two', '.'])
  t.equal(doc.match('#One').found, false, 'skip - none have #One')
  t.equal(doc.match('#Two').normal(), 'it was cold', 'skip - all have #Two')
  t.equal(doc.match('#Three').found, false, 'skip - none have #Three')
  t.equal(doc.match('#.').found, false, 'skip - none have #dot')
  t.end()
})
