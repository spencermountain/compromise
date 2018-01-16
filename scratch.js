var nlp = require('./src/index');
// nlp.verbose('tagger');

var doc = nlp('Can you explain something for me');
console.log(doc.questions().data());
