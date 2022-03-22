import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/pointer-complement] '

test('pointer-complement-basic :', function (t) {
  let doc = nlp('ooh. one two three four five six seven')

  // start + end overlap
  let m = doc.update([[1, 0, 4]])
  let res = m.complement()
  t.equal(res.text(), 'ooh. five six seven', here + 'complement-one')

  t.end()
})

test('complement-match :', function (t) {
  let str = 'one match two three. four five match six'
  let doc = nlp(str)

  let res = doc.match('match .').complement()
  t.deepEqual(res.out('array'), ['one', 'three.', 'four five'], here + 'compliment-multi')

  res = doc.match('one match').complement()
  t.deepEqual(res.text('machine'), 'two three. four five match six', here + 'compliment-start')

  res = doc.eq(0).complement()
  t.deepEqual(res.text(), 'four five match six', here + 'compliment-no-n')

  res = doc.match('foo foo').complement()
  t.deepEqual(res.text(), str, here + 'compliment-of-null')

  res = doc.complement()
  t.deepEqual(res.text(), '', here + 'compliment-of-all')

  t.end()
})
