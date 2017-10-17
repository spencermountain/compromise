var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('i just walked to the store');
// doc.match('just [#PastTense] to the store').debug();

// nlp('cheering hard').debug();

nlp('bat').debug();
var nlp2 = nlp.clone();
nlp.addWords({
  bat: 'WOO'
});

nlp('bat').debug();
nlp2('bat', {
  bat: 'man'
}).debug();
nlp('bat').debug();
