var test = require('tape');
var nlp = require('../../lib/nlp');

test('prepend:', function(t) {
  var r = nlp('john is nice. he lives in SOHO.');
  r.sentences().prepend('so');
  t.equal(r.out('text'), 'so john is nice. so he lives in SOHO.', 'prepend-without-capital');

  r = nlp('It is nice. He lives in SOHO.');
  r.sentences().prepend('so');
  t.equal(r.out('text'), 'So it is nice. So he lives in SOHO.', 'prepend-with-capital');

  r = nlp('John is nice. FBI are in SOHO.');
  r.sentences().prepend('so');
  t.equal(r.out('text'), 'So John is nice. So FBI are in SOHO.', 'prepend-with-persistent-capital');

  r = nlp('It is nice. He lives in SOHO.');
  r.sentences().prepend('believe me');
  t.equal(r.out('text'), 'Believe me it is nice. Believe me he lives in SOHO.', 'multiple-word-prepend');

  t.end();
});

test('append:', function(t) {
  var r = nlp('john is nice. he lives in SOHO');
  r.sentences().append('not');
  t.equal(r.out('text'), 'john is nice not. he lives in SOHO not', 'append-with-without-period');

  r = nlp('It is nice! He lives in SOHO? I don\'t know...');
  r.sentences().append('dawg');
  t.equal(r.out('text'), 'It is nice dawg! He lives in SOHO dawg? I don\'t know dawg...', 'append-with-exclamations');

  r = nlp('It is nice. He lives in SOHO.');
  r.sentences().append('believe me');
  t.equal(r.out('text'), 'It is nice believe me. He lives in SOHO believe me.', 'multiple-word-append');

  t.end();
});
