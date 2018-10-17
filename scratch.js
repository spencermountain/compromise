var nlp = require('./src/index');
// nlp.verbose(false);

let doc = nlp('i rumbled to the Super-bowl lopsis at 4:45pm ;)');
doc.debug();
