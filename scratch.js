var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();

// console.log(nlp('dug').tag('Verb').verbs().toInfinitive());
nlp.addPatterns({
  'master of #Noun': 'Adjective'
});
let doc = nlp('he is the master of ceremonies');
doc.debug();
