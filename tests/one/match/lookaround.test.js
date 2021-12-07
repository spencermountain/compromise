import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/lookaround] '

test('before-basic:', function (t) {
  let doc = nlp('one two match three match four')
  let m = doc.match('match')

  let res = m.before()
  t.equal(res.text(), 'one two', here + 'empty')

  res = m.before('*')
  t.equal(res.text(), 'one two', here + 'astrix')

  res = m.before('.')
  t.deepEqual(res.out('array'), ['one', 'two'], here + 'dot')

  res = m.before('one [two]', 0)
  t.equal(res.text(), 'two', here + 'group')

  t.end()
})

test('after-basic:', function (t) {
  let doc = nlp('one two match three match four five')
  let m = doc.match('match')

  let res = m.after()
  t.deepEqual(res.out('array'), ['four five'], here + 'empty')

  res = m.after('.+')
  t.deepEqual(res.out('array'), ['four five'], here + 'greed')

  m = doc.match('match')
  res = m.after('[<hmm>four] five', 'hmm')
  t.deepEqual(res.text(), 'four', here + 'group')

  t.end()
})

test('after-concat:', function (t) {
  let doc = nlp('one two three match four five')
  let m = doc.match('match')
  let res = m.concat(m.after())
  t.equal(res.text(), 'match four five', here + 'concat')
  t.end()
})

test('grow-right:', function (t) {
  let doc = nlp('one two three match four five')
  let m = doc.match('match')
  let more = m.growRight('(three|four|five)+')
  t.equal(more.text(), 'match four five', here + 'grow-right')

  doc = nlp('one match. one match two. one match two two.')
  m = doc.match('match')
  more = m.growRight('two+')
  let arr = ['match.', 'match two.', 'match two two.']
  t.deepEqual(more.out('array'), arr, here + 'grow-right-multi')
  t.end()
})

test('grow-left:', function (t) {
  let doc = nlp('one two three match four five')
  let m = doc.match('match')
  let more = m.growLeft('(three|four|one|five)+')
  t.equal(more.text(), 'three match', here + 'grow-left')

  doc = nlp('match. one match two. one one match one.')
  m = doc.match('match')
  more = m.growLeft('one+')
  let arr = ['match.', 'one match', 'one one match']
  t.deepEqual(more.out('array'), arr, here + 'grow-left-multi')
  t.end()
})
