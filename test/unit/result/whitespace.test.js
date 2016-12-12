var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function (t) {
  var m = nlp('john is cool. he is nice');
  m.whitespace.before('  ');
  t.equal(m.plaintext(), '  john is cool.  he is nice');

  m = nlp('john is cool. he is nice');
  m.whitespace.after('    ');
  t.equal(m.plaintext(), 'john is cool.     he is nice    ');

  m = nlp('so john smith is cool.');
  m.people().whitespace.before('  ');
  m.people().whitespace.after('  ');
  t.equal(m.plaintext(), 'so  john smith   is cool.');


  t.end();
});
