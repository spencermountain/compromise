var test = require('tape');
var nlp = require('../lib/nlp');

var lexicon = {
  'Jardas al Abid': 'Place',
  'Umm Ar Rizam': 'Place',
  Tobruk: 'Place'
};

test('user-lex-with-hyphenation:', function(t) {
  var sentence =
    'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.';
  var found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid', found.normal, 'found-place1');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('user-lex-with-possessive form:', function(t) {
  var sentence =
    "A suicide attack hit Jardas al Abid's center killing one person (and the attacker) and injuring more than twenty.";
  var found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal("jardas al abid's", found.normal, 'found-place2');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('user-lex-with-proper name in front:', function(t) {
  var sentence =
    "A suicide attack hit Lybia's Jardas al Abid city killing one person (and the attacker) and injuring more than twenty.";
  var found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid', found.normal, 'found-place3');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('user-lex-with-punctuation:', function(t) {
  var sentence = 'A suicide attack hit Jardas al Abid, which killed one person (and the attacker) and injured more than twenty.';
  var found = nlp(sentence, lexicon).places().data()[0] || {};
  t.equal('jardas al abid', found.normal, 'found-place4');
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});
