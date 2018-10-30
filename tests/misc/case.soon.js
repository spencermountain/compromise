var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function(t) {
  var str = 'John xoo, John fredman';
  var r = nlp(str);
  str = r.toUpperCase().out('text');
  t.equal(str, 'JOHN XOO, JOHN FREDMAN', 'uppercase');

  str = r.toLowerCase().out('text');
  t.equal(str, 'john xoo, john fredman', 'lowercase');

  str = r.toCamelCase().out('text');
  t.equal(str, 'JohnXoo,JohnFredman', 'camelcase');
  t.end();
});

test('tricky case:', function(t) {
  var str = 'i am spencer kelly here with Amy Adams.';
  var r = nlp(str);
  r.people().toUpperCase();
  str = r.out('text');
  t.equal(str, 'i am SPENCER KELLY here with AMY ADAMS.', 'tricky-uppercase');

  str = 'the Spencer Kelly Festival of Silly Walks';
  r = nlp(str);
  r.match('#TitleCase+').toCamelCase();
  t.equal(r.out('text'), 'the SpencerKellyFestival of SillyWalks', 'tricky-camelcase');

  t.end();
});
