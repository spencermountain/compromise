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
  t.equal(doc.match('#One').normal(), 'it was cold', 'all have #One')
  t.equal(doc.match('#Two').normal(), 'it was cold', 'all have #Two')
  t.equal(doc.match('#Three').normal(), 'it was cold', 'all have #Three')
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
  t.equal(doc.match('#One').found, false, 'none have #One')
  t.equal(doc.match('#Two').normal(), 'it was cold', 'all have #Two')
  t.equal(doc.match('#Three').found, false, 'none have #Three')
  t.equal(doc.match('#.').found, false, 'none have #dot')
  t.end()
})
