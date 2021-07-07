const test = require('tape')
const nlp = require('../_lib')

test('splitAfter', function (t) {
  ;[
    ['doug and nancy', 'and', ['doug and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug and also', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug but', 'possibly nancy']],

    ['a x b x c', 'x', ['a x', 'b x', 'c']],
    ['a b x c x', 'x', ['a b x', 'c x']],
    ['x a b x c', 'x', ['x', 'a b x', 'c']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],
    ['a x b x', 'x', ['a x', 'b x']],
    ['a x b c x', 'x', ['a x', 'b c x']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],

    ['john paul george ringo', '.', ['john', 'paul', 'george', 'ringo']],
    ['doug is really nice', 'is', ['doug is', 'really nice']],
  ].forEach(function (a) {
    const want = a[2]
    const got = nlp(a[0]).splitAfter(a[1]).out('array')
    t.deepEqual(got, want, a[0])
  })
  t.end()
})

test('splitOn', function (t) {
  ;[
    ['doug and nancy', 'and', ['doug', 'and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but', 'possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is', 'really nice']],

    ['a x b x c', 'x', ['a', 'x', 'b', 'x', 'c']],
    ['a b x x c', 'x', ['a b', 'x', 'x', 'c']],
    ['x a b x c', 'x', ['x', 'a b', 'x', 'c']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],
    ['a x b x', 'x', ['a', 'x', 'b', 'x']],
  ].forEach(function (a) {
    const want = a[2]
    const got = nlp(a[0]).splitOn(a[1]).out('array')
    t.deepEqual(got, want, a[0])
  })
  t.end()
})

test('splitBefore', function (t) {
  ;[
    ['doug and nancy', 'and', ['doug', 'and nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'and definetly nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is really nice']],

    ['a x b x c', 'x', ['a', 'x b', 'x c']],
    ['a b x x c', 'x', ['a b', 'x', 'x c']],
    ['x a b x c', 'x', ['x a b', 'x c']],
    ['x x a b c', 'x', ['x', 'x a b c']],
    ['a x b x', 'x', ['a', 'x b', 'x']],
  ].forEach(function (a) {
    const want = a[2]
    const got = nlp(a[0]).splitBefore(a[1]).out('array')
    t.deepEqual(got, want, a[0])
  })
  t.end()
})

test('multi splitBefore, multi sentence', function (t) {
  let doc = nlp('before before match1, match2 after after. then a match3 over here. none found')
  let m = doc.splitBefore('/^match/')
  t.equal(m.length, 6, 'found 6')
  t.equal(m.get(0).out('normal'), 'before before', 'found before')
  t.equal(m.get(1).out('normal'), 'match1', 'found match1')
  t.equal(m.get(2).out('normal'), 'match2 after after', 'found match2')
  t.equal(m.get(3).out('normal'), 'then a', 'next sentence')
  t.equal(m.get(4).out('normal'), 'match3 over here', 'next sentence match')
  t.equal(m.get(5).out('normal'), 'none found', 'unfound')
  t.end()
})

test('multi splitAfter, multi sentence', function (t) {
  let doc = nlp('before before match1, match2 after after. then a match3 over here. none found')
  let m = doc.splitAfter('/^match/')
  t.equal(m.length, 6, 'found 6')
  t.equal(m.get(0).out('normal'), 'before before match1', 'found match1')
  t.equal(m.get(1).out('normal'), 'match2', 'found match2')
  t.equal(m.get(2).out('normal'), 'after after', 'after')
  t.equal(m.get(3).out('normal'), 'then a match3', 'next sentence match')
  t.equal(m.get(4).out('normal'), 'over here', 'next sentence after')
  t.equal(m.get(5).out('normal'), 'none found', 'unfound')
  t.end()
})
