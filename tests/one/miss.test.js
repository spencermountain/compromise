import test from 'tape'
import nlp from './_lib.js'
const here = '[one/miss] '

const arr = [
  // no tags
  // [`toronto`, '#City'],
  // [`i went to Toronto`, '#Noun'],
  // // no chunks
  // [`toronto`, '<Noun>'],
  // [`i went to Toronto`, '<Noun>'],
  // min-length
  ['mexico', '.{2}'],
  ['mexico', '.{2,3}'],
  //word-word
  ['mexico city', 'foo city'],
  ['mexico city', 'city foo'],
  ['mexico city', 'city .'],
  ['mexico city', 'mexico city .'],
  ['mexico city', '. mexico city'],
]

test('no-match:', function (t) {
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
    t.equal(doc.has(a[1]), false, here + msg)
  })
  t.end()
})
