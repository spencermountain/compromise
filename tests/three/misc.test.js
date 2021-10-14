import test from 'tape'
import nlp from './_lib.js'
const here = '[three/misc] '

test('full-sentence-issue', function (t) {
  let doc = nlp(`Images of death have lost shock value`)
  doc.ptrs = [[0], [0]]
  t.equal(doc.questions().found, false, here + 'no questions')
  t.equal(doc.length, 2, here + '2 matches')
  t.equal(doc.sentences().length, 2, here + '2 sentences')
  doc.unique()
  t.equal(doc.sentences().length, 2, here + 'still 2')
  doc = doc.unique()
  t.equal(doc.sentences().length, 1, here + '1 unique sentence')
  t.end()
})
