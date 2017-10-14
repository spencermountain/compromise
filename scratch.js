var nlp = require('./src/index');
// nlp.verbose('tagger');

let doc = nlp('john smith and taryn baker'); //.replace('ralf [#Verb]', 'he $1');
doc.people().lastNames().debug();
