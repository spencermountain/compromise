var nlp = require('./src/index');
nlp.verbose('tagger');

var doc = nlp('it was fixed');
doc.debug();
