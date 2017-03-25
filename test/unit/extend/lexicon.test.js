var test = require('tape');
var nlp = require('../lib/nlp');

var lexicon = {
  'Jardas al Abid': 'Place',
  'Umm Ar Rizam': 'Place',
  'Tobruk': 'Place'
};

test('find place which has hyphenation:', function (t) {
  sentence = 'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid', found.normal, 'found-place');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find place in possessive form:', function (t) {
  sentence = 'A suicide attack hit Jardas al Abid\'s center killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid\'s', found.normal, 'found-place');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find place with a proper name in front:', function (t) {
  sentence = 'A suicide attack hit Lybia\'s Jardas al Abid city killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid', found.normal, 'found-place');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find place followed by punctuation:', function (t) {
  sentence = 'A suicide attack hit Jardas al Abid, which killed one person (and the attacker) and injured more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid', found.normal, 'found-place');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});
