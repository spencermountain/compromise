var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function (t) {
  var str = 'John xoo, John fredman';
  var r = nlp(str);
  str = r.toUpperCase().plaintext();
  t.equal(str, 'JOHN XOO, JOHN FREDMAN', 'uppercase');
  str = r.toLowerCase().plaintext();
  t.equal(str, 'john xoo, john fredman', 'lowercase');
  str = r.toCamelCase().plaintext();
  t.equal(str, 'JohnXoo,JohnFredman', 'camelcase');

  t.end();
});

test('tricky case:', function (t) {
  var str = 'i am spencer kelly here with Amy Adams.';
  var r = nlp(str);
  r.people().toUpperCase();
  str = r.plaintext();
  t.equal(str, 'i am SPENCER KELLY here with AMY ADAMS.', 'tricky-uppercase');

  str = 'the Spencer Kelly Festival of Silly Walks';
  r = nlp(str);
  r.match('#TitleCase+').toCamelCase();
  t.equal(r.plaintext(), 'the SpencerKellyFestival of SillyWalks', 'tricky-camelcase');

  t.end();
});
