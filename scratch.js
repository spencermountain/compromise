var nlp = require('./src/index');
nlp.verbose('tagger');

let doc = nlp('it was faxed');
doc.debug();
