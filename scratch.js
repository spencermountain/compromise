var nlp = require('./src/index');
// nlp.verbose('tagger');

var doc = nlp('Will');
console.log(doc.out('tags'));
