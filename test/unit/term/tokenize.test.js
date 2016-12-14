var test = require('tape');
var nlp = require('../lib/nlp');

test('hyphens', function (t) {
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
