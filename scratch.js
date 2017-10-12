var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();

// console.log(nlp('dug').tag('Verb').verbs().toInfinitive());
let doc = nlp('it is 33%');
doc.debug();
