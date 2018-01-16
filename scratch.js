var nlp = require('./src/index');
nlp.verbose('tagger');

var doc = nlp('chased');
doc.debug();
