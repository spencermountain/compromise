var nlp = require('./src/index');
// nlp.verbose('tagger');


var doc = nlp('do what Theresa May');
doc.match('may').tag('Verb');
doc.debug();
