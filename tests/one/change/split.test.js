import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/split] '

test('splitAfter', function (t) {
  const arr = [
    ['doug and nancy', 'and', ['doug and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug and also', 'nancy']],
    ['doug and definetly nancy', 'and definetly', ['doug and definetly', 'nancy']],
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
  ]
  arr.forEach(function (a) {
    const want = a[2]
    const got = nlp(a[0]).splitAfter(a[1]).out('array')
    t.deepEqual(got, want, here + 'splitAfter ' + a[0])
  })
  t.end()
})

test('splitOn', function (t) {
  const arr = [
    ['doug and nancy', 'and', ['doug', 'and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also', 'nancy']],
    ['doug and definetly nancy', 'and definetly', ['doug', 'and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but', 'possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is', 'really nice']],

    ['a x b x c', 'x', ['a', 'x', 'b', 'x', 'c']],
    ['a b x x c', 'x', ['a b', 'x', 'x', 'c']],
    ['x a b x c', 'x', ['x', 'a b', 'x', 'c']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],
    ['a x b x', 'x', ['a', 'x', 'b', 'x']],
  ]
  arr.forEach(function (a) {
    const want = a[2]
    const got = nlp(a[0]).splitOn(a[1]).out('array')
    t.deepEqual(got, want, here + 'splitOn ' + a[0])
  })
  t.end()
})

test('splitBefore', function (t) {
  const arr = [
    ['doug and nancy', 'and', ['doug', 'and nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also nancy']],
    ['doug and definetly nancy', 'and definetly', ['doug', 'and definetly nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is really nice']],
    ['any rate I suspect that I must', 'i', ['any rate', 'I suspect that', 'I must']],
    ['a x b x c', 'x', ['a', 'x b', 'x c']], //fix me!
    ['a b x x c', 'x', ['a b', 'x', 'x c']],
    ['x a b x c', 'x', ['x a b', 'x c']],
    ['x x a b c', 'x', ['x', 'x a b c']],
    ['a x b x', 'x', ['a', 'x b', 'x']],
    ['a a x b b', 'x', ['a a', 'x b b']],
    ['a a x b b x', 'x', ['a a', 'x b b', 'x']],
    ['a a x b b x c c', 'x', ['a a', 'x b b', 'x c c']],
  ]
  arr.forEach(function (a) {
    const want = a[2]
    const got = nlp(a[0]).splitBefore(a[1]).out('array')
    t.deepEqual(got, want, here + 'splitBefore ' + a[0])
  })
  t.end()
})

test('multi splitBefore, multi sentence', function (t) {
  const doc = nlp('before before match1, match2 after after. then a match3 over here. none found')
  const m = doc.splitBefore('/^match/')
  t.equal(m.length, 6, here + 'found 6')
  t.equal(m.eq(0).out('normal'), 'before before', here + 'found before')
  t.equal(m.eq(1).out('normal'), 'match1', here + 'found match1')
  t.equal(m.eq(2).out('normal'), 'match2 after after', here + 'found match2')
  t.equal(m.eq(3).out('normal'), 'then a', here + 'next sentence')
  t.equal(m.eq(4).out('normal'), 'match3 over here', here + 'next sentence match')
  t.equal(m.eq(5).out('normal'), 'none found', here + 'unfound')
  t.end()
})

test('multi splitAfter, multi sentence', function (t) {
  const doc = nlp('before before match1 match2 after after. then a match3 over here. none found')
  const m = doc.splitAfter('/^match/')
  t.equal(m.length, 6, 'found 6')
  t.equal(m.eq(0).out('normal'), 'before before match1', here + 'found match1')
  t.equal(m.eq(1).out('normal'), 'match2', here + 'found match2')
  t.equal(m.eq(2).out('normal'), 'after after', here + 'after')
  t.equal(m.eq(3).out('normal'), 'then a match3', here + 'next sentence match')
  t.equal(m.eq(4).out('normal'), 'over here', here + 'next sentence after')
  t.equal(m.eq(5).out('normal'), 'none found', here + 'unfound')
  t.end()
})

test('split group', function (t) {
  const doc = nlp('one two match three four')
  let m = doc.splitBefore('two match three')
  t.deepEqual(m.out('array'), ['one', 'two match three four'], here + 'match without group')

  m = doc.splitBefore('two [match] three', 0)
  t.deepEqual(m.out('array'), ['one two', 'match three four'], here + 'match on group')
  t.end()
})
