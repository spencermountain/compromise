import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-negative] '

test('sentences.toPositive', function (t) {
  let doc = nlp(`do not use reverse psychology.`)
  doc.sentences().toPositive()
  t.equal(doc.text(), 'use reverse psychology.', here + 'neg')

  doc.sentences().toNegative()
  t.equal(doc.text(), 'do not use reverse psychology.', here + 'back to neg')

  t.end()
})
