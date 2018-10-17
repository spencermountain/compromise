var nlp = require('./src/index');
// nlp.verbose(false);

let doc = nlp('i went to the super bowl');
doc.tag('Verb');
doc.tag('plural');
doc.debug();
