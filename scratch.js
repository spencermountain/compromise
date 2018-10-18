var nlp = require('./src/index');
// nlp.verbose(false);

let doc = nlp(`i didn't know`);
doc.debug();
