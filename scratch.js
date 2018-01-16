var nlp = require('./src/index');
// nlp.verbose('tagger');

let doc = nlp('January 10, 2018 7:20 AM');
console.log(doc.dates().data()[0]);
