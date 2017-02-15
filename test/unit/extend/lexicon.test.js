var test = require('tape');
var nlp = require('../lib/nlp');

var lexicon = {
  'Jardas al Abid': 'Place',
  'Umm Ar Rizam': 'Place',
  'Tobruk': 'Place'
};

test('find locality which has hyphenation:', function (t) {
  sentence = 'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find locality in possessive form:', function (t) {
  sentence = 'A suicide attack hit Jardas al Abid\'s center killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid\'s', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find locality with a proper name in front:', function (t) {
  sentence = 'A suicide attack hit Lybia\'s Jardas al Abid city killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find locality followed by punctuation:', function (t) {
  sentence = 'A suicide attack hit Jardas al Abid, which killed one person (and the attacker) and injured more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});
