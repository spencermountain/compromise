var nlp = require('./src/index');
// nlp.verbose(false);

let doc = nlp('i went to the Super-bowl');
doc.debug();
