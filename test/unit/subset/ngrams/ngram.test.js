'use strict';
var test = require('tape');
var nlp = require('../../lib/nlp');

test('ngram-test:', function (t) {

  var r = nlp('he is strong. he is cool');
  var arr = r.ngrams().data();

  t.equal(arr[0].normal, 'he is', 'sorted-by-freq');
  t.equal(arr[0].count, 2, 'normalized-counted');
  t.equal(arr[0].size, 2, 'normalized-counted');

  t.equal(arr.length, 9, 'ngram-length');
  t.end();
});

test('sort-bigrams:', function (t) {
  var r = nlp('he is strong. he is cool');
  var arr = r.ngrams(null, 2).data();
  t.equal(arr[0].normal, 'he is', '#1-by-freq');
  t.equal(arr[1].normal, 'is strong', '#2-by-freq');
  t.equal(arr[2].normal, 'is cool', '#3-by-freq');
  t.equal(arr.length, 3, 'ngram-length');
  t.end();
});
