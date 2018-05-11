'use strict';
var test = require('tape');
var nlp = require('../../lib/nlp');

test('ngram-test:', function(t) {
  var r = nlp('he is strong. he is cool');
  var arr = r.ngrams().data();

  t.equal(arr[0].normal, 'he is', 'sorted-by-freq');
  t.equal(arr[0].count, 2, 'normalized-counted');
  t.equal(arr[0].size, 2, 'normalized-counted');

  t.equal(arr.length, 9, 'ngram-length');
  t.end();
});

test('sort-bigrams:', function(t) {
  var r = nlp('he is strong. he is cool');
  var arr = r.ngrams({
    size: 2
  }).data();
  t.equal(arr[0].normal, 'he is', '#1-by-freq');
  t.equal(arr[1].normal, 'is strong', '#2-by-freq');
  t.equal(arr[2].normal, 'is cool', '#3-by-freq');
  t.equal(arr.length, 3, 'ngram-length');
  t.end();
});

test('contractions-support:', function(t) {
  var r = nlp('It\'s free for me and free for you');
  var arr = r.ngrams().data();
  var obj = arr.find((o) => o.normal === 'free for');
  t.equal(obj.count, 2, 'dont include empty contraction');
  t.end();
});

test('ngrams-options:', function(t) {
  var doc = nlp('one two three four five, one two three four five, one two three four five');
  var arr = doc.ngrams({
    max: 5
  }).data();
  t.equal(arr[0].size, 5, 'ngram-max-size-5');
  arr = doc.ngrams({
    max: 2
  }).data();
  t.equal(arr[0].size, 2, 'ngram-max-size-2');
  arr = doc.ngrams({
    max: 9
  }).data();
  t.equal(arr[0].size, 5, 'ngram-max-size-9');

  arr = doc.ngrams({
    size: 2
  }).data();
  t.equal(arr[0].size, 2, 'ngram-size-2');
  arr = doc.ngrams({
    size: 4
  }).data();
  t.equal(arr[0].size, 4, 'ngram-size-4');
  t.end();
});
