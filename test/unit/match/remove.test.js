var test = require('tape');
var nlp = require('../lib/nlp');

test('remove-basic :', function(t) {

  var m = nlp('the brown cat played').match('brown').remove();
  t.equal(m.plaintext(), 'the cat played', 'brown-cat');

  m = nlp('the nice brown cat played').match('nice brown').remove();
  t.equal(m.plaintext(), 'the cat played', 'nice-brown');

  m = nlp('the nice brown cat played').match('#Adjective').remove();
  t.equal(m.plaintext(), 'the cat played', 'adj-each');

  m = nlp('the nice brown cat played').match('#Adjective+').remove();
  t.equal(m.plaintext(), 'the cat played', 'adj-consecutive');

  t.end();
});

test('remove-match :', function(t) {

  var m = nlp('the brown cat played').remove('brown');
  t.equal(m.plaintext(), 'the cat played', 'brown-cat');

  m = nlp('the brown cat played. The brown dog sat down.').remove('brown');
  t.equal(m.plaintext(), 'the cat played. The dog sat down.', 'brown-cat');

  m = nlp('the nice brown cat played. The nice dog waited.').remove('nice brown');
  t.equal(m.plaintext(), 'the cat played. The nice dog waited.', 'nice-brown');

  m = nlp('the nice brown cat played. The cute dogs ate.').remove('#Adjective');
  t.equal(m.plaintext(), 'the cat played. The dogs ate.', 'adj-each');

  m = nlp('the nice brown cat played. The cute dogs ate.').remove('#Adjective+');
  t.equal(m.plaintext(), 'the cat played. The dogs ate.', 'adj-consecutive');

  t.end();
});
