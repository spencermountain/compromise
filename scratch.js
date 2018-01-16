var nlp = require('./src/index');
// nlp.verbose('tagger');

var doc = nlp('circus').nouns();
console.log(doc.toSingular(true).out());
// console.log(doc.toPlural(true).out());
