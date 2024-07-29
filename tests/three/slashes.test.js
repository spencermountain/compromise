import test from 'tape'
import nlp from './_lib.js'
const here = '[three/slashes] '

test('slashes.split', function (t) {
  let doc = nlp(`i saw him/her yesterday at 2pm.`)
  t.equal(doc.has('#SlashedTerm'), true, here + 'has slash-tag')
  let m = doc.slashes()
  t.equal(m.length, 1, here + '1 slash')
  t.equal(m.text(), 'him/her', here + 'slash-text')
  m = m.split()
  t.equal(m.text(), 'him her', here + 'slash-text-after')
  t.equal(m.terms().length, 2, here + 'slash-terms-after')
  t.equal(doc.text(), 'i saw him her yesterday at 2pm.', here + 'doc-text-after')
  t.equal(doc.has('#SlashedTerm'), false, here + 'has no slash-tag')
  t.end()
})

test('three-slashes.split', function (t) {
  let doc = nlp(`before. one two/three/four five. after`)
  t.equal(doc.has('#SlashedTerm'), true, here + 'has slash-tag')
  let m = doc.slashes()
  t.equal(m.length, 1, here + '1 slash')
  t.equal(m.text(), 'two/three/four', here + 'slash-text')
  m = m.split()
  t.equal(m.text(), 'two three four', here + 'slash-text-after')
  t.equal(m.terms().length, 3, here + 'slash-terms-after')
  t.equal(doc.text(), 'before. one two three four five. after', here + 'doc-text-after')
  t.equal(doc.has('#SlashedTerm'), false, here + 'has no slash-tag')
  t.end()
})
