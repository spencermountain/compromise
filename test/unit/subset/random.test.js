var test = require('tape');
var nlp = require('../lib/nlp');

test('random', function(t) {
  var r = nlp('one two three four five six');
  var arr = r.terms().random().out('array');
  t.equal(arr.length, 1, 'default is size 1');

  arr = r.terms().random(2).out('array');
  t.equal(arr.length, 2, 'size 2');

  arr = r.terms().random(3).out('array');
  t.equal(arr.length, 3, 'size 3');

  arr = r.terms().random(4).out('array');
  t.equal(arr.length, 4, 'size 4');

  arr = r.terms().random(5).out('array');
  t.equal(arr.length, 5, 'size 5');

  arr = r.terms().random(6).out('array');
  t.equal(arr.length, 6, 'size 6');

  arr = r.terms().random(7).out('array');
  t.equal(arr.length, 6, '7 is too big');

  arr = r.terms().random(17).out('array');
  t.equal(arr.length, 6, '17 is too big');

  t.end();
});

test('random-null', function(t) {
  var r = nlp('toronto');
  var arr = r.people().random(5).out('array');
  t.equal(arr.length, 0, 'random can be empty');

  arr = r.places().random(5).out('array');
  t.equal(arr.length, 1, 'random can be full-match');
  t.end();
});
