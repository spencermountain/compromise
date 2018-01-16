var nlp = require('./src/index');
nlp.verbose('tagger');

var doc = nlp('the largest');
doc.debug();
