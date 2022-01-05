import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/pointer-intersection] '

test('pointer-intersection-basic :', function (t) {
  let doc = nlp('ooh. one two three four five six seven eight nine ten')
  // [a,a,a,a,-,-,]
  // [-,-,b,b,b,-,]
  let start = doc.update([[1, 0, 4]])
  let end = doc.update([[1, 2, 7]])
  let res = start.intersection(end)
  t.equal(res.text(), 'three four', here + 'intersection-simple')

  // no-intersection
  start = doc.update([[1, 0, 4]])
  end = doc.update([[1, 5, 7]])
  res = start.intersection(end)
  t.equal(res.text(), '', here + 'intersection-none')

  // no-sentence-intersection
  start = doc.update([[0, 0, 1]])
  end = doc.update([[1, 0, 7]])
  res = start.intersection(end)
  t.equal(res.text(), '', here + 'intersection-no-sentence')

  // full-intersection
  start = doc.update([[1, 1, 3]])
  end = doc.update([[1, 1, 3]])
  res = start.intersection(end)
  t.equal(res.text(), 'two three', here + 'intersection-full')
  t.end()
})

test('pointer-intersection-match :', function (t) {
  let doc = nlp('one match two three. four five match six')

  let res = doc.intersection('match')
  t.deepEqual(res.out('array'), ['match', 'match'], here + 'intersection-match')

  res = doc.intersection('match .')
  t.deepEqual(res.out('array'), ['match two', 'match six'], here + 'intersection-match-dot')

  res = doc.intersection('match two')
  t.deepEqual(res.out('array'), ['match two'], here + 'intersection-match-two')
  t.end()
})

test('intersection-match :', function (t) {
  let doc = nlp('the boy and the girl')
  let res = doc.intersection('(boy|girl)').out('array')
  t.deepEqual(res, ['boy', 'girl'], 'only-intersection')
  t.end()
})

test('intersection-doc :', function (t) {
  let doc = nlp('the boy and the girl')
  let m = doc.match('(boy|girl)')
  let res = doc.intersection(m).out('array')
  t.deepEqual(res, ['boy', 'girl'], 'only-intersection-doc')
  t.end()
})
