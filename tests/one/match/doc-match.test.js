import test from 'tape'
import nlp from '../_lib.js'
const here = ' [one/doc-match]'

test('doc-as-input', function (t) {
  let doc = nlp('if so, he is the best, that i see. he is the greatest')
  let m = doc.match('he is the .')
  let found = doc.match(m)
  t.equal(found.length, 2, here + 'found both phrases')
  t.equal(found.eq(0).text('reduced'), 'he is the best', here + 'found first match')
  t.equal(found.eq(1).text('reduced'), 'he is the greatest', here + 'found second match')
  t.end()
})

test('doc-sibling-as-input', function (t) {
  let doc = nlp('he is the best, that i see. he is the greatest')
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
  let doc = nlp('he is the best, that i see. he is the greatest')
  let childA = doc.if('greatest')
  let childB = doc.match('he is')
  let found = childA.splitAfter(childB)
  t.equal(found.length, 2, 'split from sibling')
  t.equal(found.eq(0).text('reduced'), 'he is', here + 'found first match')
  t.equal(found.eq(1).text('reduced'), 'the greatest', here + 'found second match')
  t.end()
})


test('two-or-matches overlap', function (t) {
  let doc = nlp('one two three four five')
  let m = doc.match('(two|four) (three|five)')
  t.deepEqual(m.out('array'), ['two three', 'four five'], here + 'or-overlap')
  t.end()
})
