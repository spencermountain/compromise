var test = require('tape');
var nlp = require('../lib/nlp');

test('hyphens', function (t) {
  var str = 'it is cool. he is nice';
  var m = nlp(str);
  m.hyphenate();
  t.equal(m.terms().length, 6, 'seperate terms');
  t.equal(m.plaintext(), 'it-is-cool. he-is-nice', 'hyphenate');
  m.deHyphenate();
  t.equal(m.plaintext(), str, 'dehyphenate');


  str = 'i payed seven-hundred for the back-rub';
  m = nlp(str);
  m.values().deHyphenate();
  t.equal(m.plaintext(), 'i payed seven hundred for the back-rub', 'dehyphenate-values');
  t.end();
});
