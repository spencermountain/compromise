var nlp = require('./src/index');
nlp.verbose('tagger');

var doc = nlp('it was cold').debug();
console.log(doc.verbs().conjugation());
