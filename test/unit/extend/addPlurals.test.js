var test = require('tape');
var nlp = require('../lib/nlp');

test('addPlurals-test', function(t) {
  var plurals = {
    mather: 'mathii',
    algebra: 'algebri'
  };
  nlp.addPlurals(plurals);
  var doc = nlp('the mather did many algebri');
  var arr = doc.nouns().data();
  t.equal(arr.length, 2, 'found both');
  t.equal(arr[0].singular, 'mather', 'singular-form');
  t.equal(arr[0].plural, 'mathii', 'plural-form');

  t.equal(arr[1].singular, 'algebra', 'singular-form2');
  t.equal(arr[1].plural, 'algebri', 'plural-form2');

  doc.nouns().toPlural();
  t.equal(doc.out(), 'the mathii did many algebri', 'toPlural');
  doc.nouns().toSingular();
  t.equal(doc.out(), 'the mather did many algebra', 'toSingular');

  t.end();
});
