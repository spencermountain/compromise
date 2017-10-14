var nlp = require('./src/index');
nlp.verbose('tagger');

m = nlp('rooms 99-102'); //.replace('ralf [#Verb]', 'he $1');
m.debug();
