var test = require('tape');
var nlp = require('../lib/nlp');

var mustBe = function(arr) {
  return arr.map(function(t) {
    return t.normal;
  });
};

test('clauses', function (t) {
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

test('adjectives', function (t) {
  var m = nlp('he is nice, cool and very fun');
  var have = mustBe(m.adjectives().data());
  var want = ['nice', 'cool', 'fun'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});

test('contractions-subset', function (t) {
  var m = nlp('he\'s nice. She could\'ve seen.');
  var have = mustBe(m.contractions().data());
  var want = ['he\'s', 'could\'ve'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});
