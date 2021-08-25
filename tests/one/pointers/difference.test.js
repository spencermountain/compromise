import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/pointer-difference] '

test('pointer-difference-basic :', function (t) {
  let doc = nlp('ooh. one two three four five six seven eight nine ten')

  // not-at-start
  let parent = doc.update([[1, 0, 8]])
  let m = doc.update([[1, 0, 2]])
  let res = parent.difference(m)
  t.equal(res.text(), 'three four five six seven eight', here + 'not-at-start')

  // not-in-middle
  parent = doc.update([[1, 0, 8]])
  m = doc.update([[1, 2, 4]])
  res = parent.difference(m)
  t.equal(res.text(), 'one two five six seven eight', here + 'not-in-middle')

  // not-at-end
  parent = doc.update([[1, 0, 8]])
  m = doc.update([[1, 6, 8]])
  res = parent.difference(m)
  t.equal(res.text(), 'one two three four five six', here + 'not-at-start')

  t.end()
})

test('pointer-difference-match :', function (t) {
  let doc = nlp('one match two three. four five match six')

  let res = doc.match('match .').difference('. two')
  t.deepEqual(res.out('array'), ['match six'], here + 'diff-full')

  t.end()
})

test('difference-multi :', function (t) {
  let doc = nlp('i think spencer can walk')
  let m = doc.match('(i|spencer)') //#Noun
  let res = doc.difference(m)
  t.deepEqual(res.out('array'), ['think', 'can walk'], here + 'difference multi')
  t.end()
})
