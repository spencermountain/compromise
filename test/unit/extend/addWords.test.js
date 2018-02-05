var test = require('tape');
var nlp = require('../lib/nlp');

test('persistent-lexicon-change', function(t) {
  nlp = nlp.clone();
  var doc = nlp('he is James');
  t.equal(doc.places().length, 0, 'default-no-place');
  t.equal(doc.people().length, 1, 'default-one-person');

  nlp.addWords({
    james: 'Place'
  });
  doc = nlp('he is James');
  t.equal(doc.places().length, 1, 'now-one-place');
  t.equal(doc.people().length, 0, 'now-no-person');

  nlp.addWords({
    foo: 'Place'
  });
  doc = nlp('he is James');
  t.equal(doc.places().length, 1, 'still-one-place');
  t.equal(doc.people().length, 0, 'still-no-person');

  t.end();
});
