const test = require('tape')
const nlp = require('./_lib')

test('ensure cache is off', function (t) {
  let doc = nlp('i am a modern major general')
  t.ok(doc._cache.set !== true, 'cache is off')
  doc.match('modern').tag('Person')
  t.equal(doc.has('#Person'), true, 'new tag found')

  doc = doc.replace('modern', 'old')
  t.equal(doc.has('old'), true, 'new word found')
  t.end()
})

test('new cache is on', function (t) {
  let doc = nlp('i am a modern major general')
  doc.cache()
  t.ok(doc._cache.set === true, 'cache is on now')

  doc.match('modern').tag('Person')
  t.equal(doc.has('#Person'), false, 'new tag is not found')

  doc = doc.replace('modern', 'old')
  t.ok(doc._cache.set !== true, 'cache invalidated')
  t.equal(doc.has('old'), true, 'cache invalidated on replace')
  t.end()
})
