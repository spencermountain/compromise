var test = require('tape');
var nlp = require('./lib/nlp');
var arr_test = require('./lib/fns').arr_test;

test('splitOn', function(t) {
  [
    ['doug and nancy', 'and', ['doug', 'nancy']],
    ['doug and also nancy', 'and also', ['doug', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'possibly nancy']],
  ].forEach(function(a) {
    var want = a[2];
    var got = nlp(a[0]).splitOn(a[1]).asArray().map((o) => o.normal);
    arr_test(got, a[0], want, t);
  });
  t.end();
});

test('splitBefore', function(t) {
  [
    ['doug and nancy', 'and', ['doug', 'and nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'and definetly nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but possibly nancy']],
  ].forEach(function(a) {
    var want = a[2];
    var got = nlp(a[0]).splitBefore(a[1]).asArray().map((o) => o.normal);
    arr_test(got, a[0], want, t);
  });
  t.end();
});

test('splitAfter', function(t) {
  [
    ['doug and nancy', 'and', ['doug and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug and also', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug but', 'possibly nancy']],
    ['john, paul, george, ringo', '#Comma', ['john', 'paul', 'george', 'ringo']],
  ].forEach(function(a) {
    var want = a[2];
    var got = nlp(a[0]).splitAfter(a[1]).asArray().map((o) => o.normal);
    arr_test(got, a[0], want, t);
  });
  t.end();
});
