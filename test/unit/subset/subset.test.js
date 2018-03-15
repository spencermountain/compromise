var test = require('tape');
var nlp = require('../lib/nlp');

var mustBe = function(arr) {
  return arr.map(function(t) {
    return t.normal;
  });
};

test('clauses', function(t) {
  var m = nlp('he is nice - which is cool... but whatever');
  var have = mustBe(m.clauses().data());
  var want = ['he is nice', 'which is cool', 'but whatever'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  m = nlp('he is nice. If so, then good');
  have = mustBe(m.clauses().data());
  want = ['he is nice', 'if so', 'then good'];
  msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});

test('adjectives', function(t) {
  var m = nlp('he is nice, cool and very fun');
  var have = mustBe(m.adjectives().data());
  var want = ['nice', 'cool', 'fun'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});

test('quotations', function(t) {
  var have = nlp('My "String" "with many" adjacent "nested" \'quotes\'').quotations().out('array');
  var want = ['string', 'with many', 'nested', 'quotes'];
  t.deepEqual(have, want, 'consecutive quoations');
  t.end();
});

test('parentheses', function(t) {
  var have = nlp('Use a pointed stick (a pencil) or congealed petroleum (an eraser) or a similar tool').parentheses().out('array');
  var want = ['a pencil', 'an eraser'];
  t.deepEqual(have, want, 'two parentheses');

  have = nlp('born in Canada (Toronto), Drake (Aubrey Graham) became a hit (a success)').parentheses().out('array');
  want = ['toronto', 'aubrey graham', 'a success'];
  t.deepEqual(have, want, 'different-sized parentheses');
  t.end();
});

test('contractions-subset', function(t) {
  var m = nlp('he\'s nice. She could\'ve seen.');
  var have = mustBe(m.contractions().data());
  var want = ['he\'s', 'could\'ve'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});
