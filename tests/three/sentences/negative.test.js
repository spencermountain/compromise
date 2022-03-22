import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-negative] '

test('sentences.toPositive', function (t) {
  let doc = nlp(`okay, do not use reverse psychology.`)
  doc.sentences().toPositive()
  t.equal(doc.text(), 'okay, use reverse psychology.', here)

  doc.sentences().toNegative()
  t.equal(doc.text(), 'okay, do not use reverse psychology.')

  t.end()
})
