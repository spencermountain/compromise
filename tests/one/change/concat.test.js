import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/concat] '

test('concat tag :', function (t) {
  let doc = nlp('the start and the end. another one')
  doc.concat('cool times. oh yeah')
  t.equal(doc.has('cool times'), true, here + 'tagged - 1')

  doc = nlp('the start and the end. another one')
  let b = nlp('cool times. oh yeah')
  doc.concat(b)
  t.equal(doc.has('cool times'), true, here + 'tagged - 2')
  t.end()
})

// test('concat tag :', function (t) {
//   let doc = nlp('one here. two here. three here')
//   let mid = doc.match('two here')
//   mid.concat('cool times. oh yeah')
//   t.end()
// })

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

  doc = nlp('before text. middle. after text.')
  a = doc.slice(0, 2)
  b = doc.slice(2)
  let both = a.concat(b)
  t.equal(both.length, 3, here + 'pointer-both')
  t.equal(doc.length, 3, here + 'pointer-non-mutable')
  t.end()
})

test('concat doc :', function (t) {
  const doc = nlp('walk the plank')
  let doc2 = nlp('foo bar')
  doc.concat(doc2)
  t.equal(doc.text(), 'walk the plank foo bar', here + 'concat doc')
  t.equal(doc.match('plank foo').found, false, here + 'concat is two sentences')


  let a = nlp('before text. middle.')
  let b = nlp('after text.')
  a.concat(b)
  t.equal(a.length, 3, here + 'have 3 mutable')
  t.end()
})