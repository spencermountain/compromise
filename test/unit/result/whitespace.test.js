var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function(t) {
  var m = nlp('john is cool. he is nice');
  m.whitespace.before('  ');
  t.equal(m.out('text'), '  john is cool.  he is nice');

  m = nlp('john is cool. he is nice');
  m.whitespace.after('    ');
  t.equal(m.out('text'), 'john is cool.     he is nice    ');

  m = nlp('so john smith is cool.');
  m.people().whitespace.before('  ');
  m.people().whitespace.after('  ');
  t.equal(m.out('text'), 'so  john smith   is cool.');

  t.end();
});

test('slashes-as-whitespace:', function(t) {
  var doc = nlp('john is cool/fun');
  t.equal(doc.terms().length, 4, '4 terms');
  t.equal(doc.has('cool'), true, 'has cool');
  t.equal(doc.has('fun'), true, 'has fun');
  t.equal(doc.out('text'), 'john is cool/fun', 'slash in output');
  t.end();
});

test('normalized whitespace', function(t) {
  var doc = nlp(`It doesn't matter`);
  doc.normalize({
    contractions: false
  });
  t.equal(doc.text(), `it doesn't matter`, 'normalized contractionwhitespace');
  t.end();
});
