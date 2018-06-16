var nlp = require('./src/index');
nlp.verbose('tagger');

//(private|general|major)

let doc = nlp('Rear admiral John');
// doc.debug();
console.log(doc.normalize({
  honorifics: true
}).out());
// let doc = nlp('Lieutenant John Smith?').debug();
