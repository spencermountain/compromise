var nlp = require('./src/index');
// nlp.verbose('tagger');


var doc = nlp('She\'s coming by ').topics();
doc.debug();
