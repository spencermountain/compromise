var test = require('tape');
var nlp = require('../lib/nlp');

test('getPunctuation', function(t) {
  var doc = nlp('he is green and cool');
  var arr = doc.match('#Adjective').getPunctuation();
  t.deepEqual(arr, ['', ''], 'both-empty');

  doc = nlp('he is green, and cool!');
  arr = doc.match('#Adjective').getPunctuation();
  t.deepEqual(arr, [',', '!'], 'both-punctuations');

  doc = nlp('he is green, and cool! He is Kermit, the frog.');
  arr = doc.match('#Comma').getPunctuation();
  t.deepEqual(arr, [',', ','], 'both-sentences');

  doc = nlp('he is Kermit, the frog.');
  var char = doc.terms().getPunctuation(2);
  t.equal(char, ',', 'support-num-param');
  t.end();
});

test('setPunctuation', function(t) {
  var doc = nlp('he is green and cool');
  doc.match('#Adjective and').firstTerm().setPunctuation(',');
  t.equal(doc.text(), 'he is green, and cool', 'oxford-comma');

  doc = nlp('he is green, and cool');
  t.equal(doc.has('#Comma'), true, 'has-comma-tag');
  doc.match('green').firstTerm().setPunctuation('!');
  t.equal(doc.text(), 'he is green! and cool', 'exclaim');
  t.equal(doc.has('#Comma'), false, 'no-more-comma-tag');
  t.end();
});
