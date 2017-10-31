var test = require('tape');
var nlp = require('../lib/nlp');

test('tokenize() runs without pos-tagging', function(t) {
  var str = 'Miss Hoover, I glued my head to my shoulder.';
  var r = nlp.tokenize(str);
  t.equal(r.out('text'), str, 'tokenize output is same');

  t.equal(r.list.length, 1, 'sentence-parser-working');

  var found = r.match('#Noun').found;
  t.equal(found, false, 'no sneaky-tagging');

  t.end();
});
test('em-dash, en-dash', function(t) {
  // '-':  //dash
  // '–':  //en-dash
  // '—':  //em-dash
  var doc = nlp('fun-time');
  t.equal(doc.terms().length, 2, 'dash');
  doc = nlp('fun–time');
  t.equal(doc.terms().length, 2, 'en-dash');
  doc = nlp('fun—time');
  t.equal(doc.terms().length, 2, 'em-dash');

  //not a full word, either
  doc = nlp('fun - time');
  t.equal(doc.terms().length, 2, 'dash-word');
  doc = nlp('fun – time');
  t.equal(doc.terms().length, 2, 'en-dash-word');
  doc = nlp('fun — time');
  t.equal(doc.terms().length, 2, 'em-dash-word');

  //numeric forms are split, but contractions too
  doc = nlp('20-20');
  t.equal(doc.terms().length, 3, 'dash-num');
  doc = nlp('20–20');
  t.equal(doc.terms().length, 3, 'en-dash-num');
  doc = nlp('20—20');
  t.equal(doc.terms().length, 3, 'em-dash-num');
  t.end();
});
