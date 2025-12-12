import test from 'tape'
import nlp from '../_lib.js'
const here = ' [one/doc-match]'

test('doc-as-input', function (t) {
  const doc = nlp('if so, he is the best, that i see. he is the greatest')
  const m = doc.match('he is the .')
  const found = doc.match(m)
  t.equal(found.length, 2, here + 'found both phrases')
  t.equal(found.eq(0).text('reduced'), 'he is the best', here + 'found first match')
  t.equal(found.eq(1).text('reduced'), 'he is the greatest', here + 'found second match')
  t.end()
})

test('doc-sibling-as-input', function (t) {
  const doc = nlp('he is the best, that i see. he is the greatest')
  let childA = doc.if('greatest')
  let childB = doc.match('he is')
  // union/intersection/difference
  let found = childA.match(childB)
  t.equal(found.length, 1, here + 'found self in sibling')

  found = childA.if(childB)
  t.equal(found.length, 1, here + 'if self in sibling')

  //try false-positive example
  childA = doc.if('foobar')
  childB = doc.match('he is')
  found = childA.match(childB)
  t.equal(found.length, 0, here + 'false-positive not found')
  t.end()
})

test('split-doc-input', function (t) {
  const doc = nlp('he is the best, that i see. he is the greatest')
  const childA = doc.if('greatest')
  const childB = doc.match('he is')
  const found = childA.splitAfter(childB)
  t.equal(found.length, 2, 'split from sibling')
  t.equal(found.eq(0).text('reduced'), 'he is', here + 'found first match')
  t.equal(found.eq(1).text('reduced'), 'the greatest', here + 'found second match')
  t.end()
})

test('two-or-matches overlap', function (t) {
  const doc = nlp('one two three four five')
  const m = doc.match('(two|four) (three|five)')
  t.deepEqual(m.out('array'), ['two three', 'four five'], here + 'or-overlap')
  t.end()
})

test('has==match', function (t) {
  const doc = nlp('i saw John Lennon, and tom cruise.')
  const m = doc.match('john lennon')
  const start = doc.match('i saw john .')
  const end = doc.match('and tom cruise')

  t.equal(start.has(m), true, here + 'has-start')
  t.equal(start.match(m).found, true, here + 'match-start')
  t.equal(end.has(m), false, here + 'not-end')
  t.equal(end.match(m).found, false, here + 'match:not-end')
  t.end()
})
