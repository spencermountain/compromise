var nlp = require('./src/index');
nlp.verbose('tagger');

var doc = nlp('setting records');
doc.debug();
console.log(doc.world().words.records);
