var test = require('tape');
var nlp = require('../../lib/nlp');

test('setPunctuation:', function(t) {
  var r = nlp('john is nice. he lives in SOHO.');
  r.sentences(1).toExclamation();
  t.equal(r.out(), 'john is nice. he lives in SOHO!', 'toexclamation-change');

  r = nlp('john is nice. he lives in SOHO');
  r.sentences(1).toExclamation();
  t.equal(r.out(), 'john is nice. he lives in SOHO!', 'toexclamation-insert');
  t.end();
});
