import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/pointer-union] '

test('pointer-union-basic :', function (t) {
  const doc = nlp('ooh. one two three four five six seven eight nine ten')

  // start + end overlap
  let start = doc.update([[1, 0, 2]])
  let end = doc.update([[1, 5, 7]])
  let res = start.union(end)
  t.equal(res.text(), 'one two six seven', here + 'union-simple')

  start = doc.update([[0, 0, 1]])
  end = doc.update([[1, 1, 4]])
  res = start.union(end)
  t.equal(res.text(), 'ooh. two three four', here + 'union-disjoint-n')

  start = doc.update([[1, 0, 2]])
  end = doc.update([[1, 6, 8]])
  res = start.union(end)
  t.equal(res.text(), 'one two seven eight', here + 'union-disjoint-same')

  start = doc.update([[1, 1, 3]])
  end = doc.update([[1, 2, 5]])
  res = start.union(end)
  t.equal(res.text(), 'two three four five', here + 'union-plus')

  start = doc.update([[1, 1, 5]])
  end = doc.update([[1, 2, 3]])
  res = start.union(end)
  t.equal(res.text(), 'two three four five', here + 'union-not-plus')

  start = doc.update([[1, 0, 2]])
  end = doc.update([[1, 2, 4]])
  res = start.union(end)
  t.equal(res.text(), 'one two three four', here + 'union-neighbour')

  t.end()
})

test('pointer-union-match :', function (t) {
  const doc = nlp('one match two three. four five match six')

  let m = doc.match('. two')
  let res = doc.match('match .').union(m)
  t.deepEqual(res.out('array'), ['match two', 'match six'], here + 'union-dupe')

  m = doc.match('. six')
  res = doc.match('match two').union(m)
  t.deepEqual(res.out('array'), ['match two', 'match six'], here + 'union-match-disjoint')

  m = doc.match('two three')
  res = doc.match('match .').union(m)
  t.deepEqual(res.out('array'), ['match two three.', 'match six'], here + 'union-match-overlap')

  t.end()
})

test('settle :', function (t) {
  const doc = nlp('one two three four')
  const a = doc.match('two three')
  const b = doc.match('three four')
  let res = a.concat(b)
  t.equal(res.length, 2, here + 'has both')
  res = res.settle()
  t.equal(res.length, 1, here + 'settle has one')
  t.equal(res.text(), 'two three four', here + 'settle')
  t.end()
})

test('settle-fancy :', function (t) {
  const doc = nlp('one match two three. match five. six match. ')
  const a = doc.match('match .')
  const b = doc.match('five')
  // let c = doc.match('six')
  let res = a.concat(b) //.concat(c)
  res = res.settle()
  // t.equal(res.length, 1, here + 'settle has one')
  t.equal(res.text(), 'match two match five', here + 'settle')
  t.end()
})

test('settle-neighbour :', function (t) {
  const doc = nlp('one two three four five')
  let res = doc.match('(two|four) (three|five)')
  res = res.settle()
  t.deepEqual(res.out('array'), ['two three', 'four five'], here + 'neighbour')
  t.end()
})
