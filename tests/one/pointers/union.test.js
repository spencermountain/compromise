import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/pointer-union] '

test('pointer-union-basic :', function (t) {
  let doc = nlp('ooh. one two three four five six seven eight nine ten')

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

  t.end()
})

test('pointer-union-match :', function (t) {
  let doc = nlp('one match two three. four five match six')

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
