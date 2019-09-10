var test = require('tape')
var nlp = require('./_lib')

test('splitAfter', function(t) {
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
  ].forEach(function(a) {
    var want = a[2]
    var got = nlp(a[0])
      .splitAfter(a[1])
      .out('array')
    t.deepEqual(got, want, a[0])
  })
  t.end()
})

test('splitBefore', function(t) {
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
  ].forEach(function(a) {
    var want = a[2]
    var got = nlp(a[0])
      .splitBefore(a[1])
      .out('array')
    t.deepEqual(got, want, a[0])
  })
  t.end()
})
