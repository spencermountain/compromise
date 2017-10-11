var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();

// console.log(nlp('dug').tag('Verb').verbs().toInfinitive());
let doc = nlp('he is made of golden nuggets');
console.log(doc.nouns().data());
// doc.debug();
