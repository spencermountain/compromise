var test = require('tape');
var nlp = require('../lib/nlp');

test('hyphen-tokenize', function(t) {
  var r = nlp('super-cool work');
  t.equal(r.terms().length, 3, 'super, cool');
  t.equal(r.out('text'), 'super-cool work', 'preserve hyphen');
  t.equal(r.out('normal'), 'super cool work', 'normalize-out hyphen');

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

  r = nlp('re-enactment');
  t.equal(r.out('normal'), 'reenactment', 're-hyphen');
  r = nlp('un-do');
  t.equal(r.out('normal'), 'undo', 'un-hyphen');

  t.end();
});

test('hyphenate', function(t) {
  var str = 'it is cool. he is nice';
  var m = nlp(str);
  m.hyphenate();
  t.equal(m.terms().length, 6, 'seperate terms');
  t.equal(m.out('text'), 'it-is-cool. he-is-nice', 'hyphenate');
  m.dehyphenate();
  t.equal(m.out('text'), str, 'dehyphenate');

  str = 'i payed seven-hundred for the sandwich';
  m = nlp(str);
  m.values().dehyphenate();
  t.equal(m.out('text'), 'i payed seven hundred for the sandwich', 'dehyphenate-values');

  str = 'he is the king of rock. she is the queen of cool.';
  m = nlp(str);
  m.match('(king|queen) of (#Noun|#Adjective)').hyphenate();
  t.equal(m.out('text'), 'he is the king-of-rock. she is the queen-of-cool.', 'hyphenate-match');

  t.end();
});
