const test = require('tape')
const nlp = require('../_lib')

test('doc-as-input', function (t) {
  let doc = nlp('if so, he is the best, that i see. he is the greatest')
  let m = doc.match('he is the .')
  let found = doc.match(m)
  t.equal(found.length, 2, 'found both phrases')
  t.equal(found.eq(0).text('reduced'), 'he is the best', 'found first match')
  t.equal(found.eq(1).text('reduced'), 'he is the greatest', 'found second match')
  t.end()
})

test('doc-sibling-as-input', function (t) {
  let doc = nlp('he is the best, that i see. he is the greatest')
  let childA = doc.if('greatest')
  let childB = doc.match('he is')
  let found = childA.match(childB)
  t.equal(found.length, 1, 'found self in sibling')
  //try false-positive example
  childA = doc.if('foobar')
  childB = doc.match('he is')
  found = childA.match(childB)
  t.equal(found.length, 0, 'false-positive not found')
  t.end()
})

test('split-doc-input', function (t) {
  let doc = nlp('he is the best, that i see. he is the greatest')
  let childA = doc.if('greatest')
  let childB = doc.match('he is')
  let found = childA.splitAfter(childB)
  t.equal(found.length, 2, 'split from sibling')
  t.equal(found.eq(0).text('reduced'), 'he is', 'found first match')
  t.equal(found.eq(1).text('reduced'), 'the greatest', 'found second match')
  t.end()
})
