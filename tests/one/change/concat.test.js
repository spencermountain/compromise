import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/concat] '

test('concat pointers :', function (t) {
  let doc = nlp('one two three four')
  let a = doc.match('two three')
  let b = doc.match('three four')
  let res = a.concat(b)
  t.deepEqual(res.out('array'), ['two three', 'three four'], here + 'concat-pointer')

  doc = nlp('one two three. four five six')
  a = doc.match('two three')
  b = doc.match('four .')
  res = a.concat(b)
  t.deepEqual(res.out('array'), ['two three.', 'four five'], here + 'concat-pointer-mixed')
  t.end()
})

test('concat doc :', function (t) {
  const doc = nlp('walk the plank')
  let doc2 = nlp('foo bar')
  doc.concat(doc2)
  t.equal(doc.text(), 'walk the plank foo bar', here + 'concat doc')
  t.equal(doc.match('plank foo').found, false, here + 'concat is two sentences')
  t.end()
})