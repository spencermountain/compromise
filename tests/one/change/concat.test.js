import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/concat] '

test('concat misc :', function (t) {
  let found = nlp('')
  const docs = [
    nlp('We Sell All Brands'),
    nlp('all we are'),
    nlp('see, we drop our prices'),
    nlp('All right relax'),
    nlp(`If you notice swelling, we will accept damages`),
    nlp(`and whisk to fully incorporate`),
  ]
  docs.forEach(doc => {
    found = found.concat(doc.match("we ."))
  })
  t.equal(found.length, 4, here + 'found all four')
  t.equal(found.all().has('prices'), false, here + 'only merged selection')
  t.equal(found.not('we .').found, false, here + 'only we .')
  t.end()
})

test('concat tag :', function (t) {
  let doc = nlp('the start and the end. another one')
  doc.concat('cool times. oh yeah')
  t.equal(doc.has('cool times'), true, here + 'tagged - 1')

  doc = nlp('the start and the end. another one')
  const b = nlp('cool times. oh yeah')
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
  const both = a.concat(b)
  t.equal(both.length, 3, here + 'pointer-both')
  t.equal(doc.length, 3, here + 'pointer-non-mutable')
  t.end()
})

test('concat doc :', function (t) {
  const doc = nlp('walk the plank')
  const doc2 = nlp('foo bar')
  doc.concat(doc2)
  t.equal(doc.text(), 'walk the plank foo bar', here + 'concat doc')
  t.equal(doc.match('plank foo').found, false, here + 'concat is two sentences')


  const a = nlp('before text. middle.')
  const b = nlp('after text.')
  a.concat(b)
  t.equal(a.length, 3, here + 'have 3 mutable')
  t.end()
})