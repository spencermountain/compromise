var test = require('tape');
var nlp = require('../lib/nlp');

test('not-basic :', function(t) {
  var m = nlp('spencer is really cool').not('brown');
  t.equal(m.out('text'), 'spencer is really cool', 'missing-not');
  t.equal(m.length, 1, 'one-result');

  m = nlp('spencer is really cool').not('#Adverb');
  t.equal(m.out('text'), 'spencer is cool', 'one-not');
  t.equal(m.length, 2, 'two-result');

  m = nlp('spencer is really cool').not('#Adverb+');
  t.equal(m.out('text'), 'spencer is cool', 'still-one-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool').not('#Adverb+');
  t.equal(m.out('text'), 'spencer is cool', 'two-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool').not('is #Adverb+');
  t.equal(m.out('text'), 'spencer cool', 'three-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool. John is really nice.').not('#Adverb');
  t.equal(m.out('text'), 'spencer is cool. John is nice.', 'two-terms-matches');
  t.equal(m.length, 4, 'four-results');

  m = nlp('spencer is really cool. John is really nice.').not('pardon me, #Adverb');
  t.equal(m.out('text'), 'spencer is really cool. John is really nice.', 'tricky-no-match');
  t.equal(m.length, 2, 'two-original-results');

  t.end();
});

test('not-from-array :', function(t) {
  var m = nlp('spencer is really cool').not(['spencer']);
  t.equal(m.out('normal'), 'is really cool', 'not-spencer');
  t.equal(m.length, 1, 'one-results');

  m = nlp('spencer is really cool').not(['']);
  t.equal(m.out('normal'), 'spencer is really cool', 'not-spencer');
  t.equal(m.length, 1, 'one-results');

  m = nlp('spencer is really cool').not(['spencer', 'really']);
  t.equal(m.out('normal'), 'is cool', 'not-spencer-really');
  t.equal(m.length, 2, 'two-results');
  t.end();
});

//test object-form
test('not-from-object :', function(t) {
  var m = nlp('spencer is not really cool.');
  var r = m.not({
    not: true,
    really: true
  });
  t.equal(m.out('normal'), 'spencer is not really cool.', 'double-obj-remains');
  t.equal(r.out('normal'), 'spencer is cool.', 'spencer-double-obj');

  m = nlp('everyone is cool. I said hi to everyone.').not({
    everyone: true,
    totally: true
  });
  t.equal(m.out('normal'), 'is cool. i said hi to', 'not-everyone');

  m = nlp('spencer is really, secretly, very cool.');
  var adv = m.adverbs().not({
    really: true
  });
  t.equal(adv.out('normal'), 'secretly very', 'not-subset');
  t.equal(adv.length, 2, 'one-result');

  var adv2 = m.adverbs().not('secretly');
  t.equal(adv2.out('normal'), 'really very', 'not-subset2');
  t.equal(adv2.length, 2, 'two-results');

  t.end();
});
