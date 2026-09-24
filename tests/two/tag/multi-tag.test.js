import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/multitag] '

test('tag-sequence:', function (t) {
  const doc = nlp('it was cold')
  doc.tag('#One #Two #Three')
  t.equal(doc.match('#One').text(), 'it', here + 'one')
  t.equal(doc.match('#Two').text(), 'was', here + 'two')
  t.equal(doc.match('#Three').text(), 'cold', here + 'three')
  t.end()
})

test('multiple-tags:', function (t) {
  const doc = nlp('it was cold')
  doc.tag(['#One', '#Two', '#Three'])
  t.equal(doc.match('#One').text(), 'it was cold', here + '- all have #One')
  t.equal(doc.match('#Two').text(), 'it was cold', here + '- all have #Two')
  t.equal(doc.match('#Three').text(), 'it was cold', here + '- all have #Three')
  t.end()
})

test('tag-sequence-skip:', function (t) {
  const doc = nlp('it was cold')
  doc.tag('#One . #Three')
  t.equal(doc.match('#One').text(), 'it', here + 'one')
  t.equal(doc.match('#Two').text(), '', here + 'no-two')
  t.equal(doc.match('#.').text(), '', here + 'no-dot')
  t.equal(doc.match('#Three').text(), 'cold', here + 'three')
  t.end()
})

test('multiple-tags-skip:', function (t) {
  const doc = nlp('it was cold')
  doc.tag(['.', '#Two', '.'])
  t.equal(doc.match('#One').found, false, here + 'skip - none have #One')
  t.equal(doc.match('#Two').text(), 'it was cold', here + 'skip - all have #Two')
  t.equal(doc.match('#Three').found, false, here + 'skip - none have #Three')
  t.equal(doc.match('#.').found, false, here + 'skip - none have #dot')
  t.end()
})
