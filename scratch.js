var nlp = require('./src/index');
// nlp.verbose('tagger');

let doc = nlp('Phoenix AZ');
doc.debug();
