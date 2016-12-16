var test = require('tape');
var nlp = require('../lib/nlp');

test('hyphen-tokenize', function (t) {
  var r = nlp('super-cool work');
  t.equal(r.terms().length, 3, 'super, cool');
  t.equal(r.plaintext(), 'super-cool work', 'preserve hyphen');
  t.equal(r.normal(), 'super cool work', 'normalize-out hyphen');

  r = nlp('http://about.com/my-summer-vacation');
  t.equal(r.terms().length, 1, 'url hyphen');
  r = nlp('http://about.com/my-summer');
  t.equal(r.terms().length, 1, 'url hyphen2');

  r = nlp('421-0059');
  t.equal(r.terms().length, 1, 'phoneNuumber hyphen');

  r = nlp('sept-2');
  t.equal(r.terms().length, 2, 'date hyphen');

  r = nlp('-2 degrees');
  t.equal(r.terms().length, 2, 'minus hyphen');

  t.end();
});


test('hyphenate', function (t) {
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


  str = 'he is the king of rock. she is the queen of cool.';
  m = nlp(str);
  m.match('(king|queen) of (#Noun|#Adjective)').hyphenate();
  t.equal(m.plaintext(), 'he is the king-of-rock. she is the queen-of-cool.', 'hyphenate-match');

  t.end();
});
