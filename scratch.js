var nlp = require('./src/index');
// nlp.verbose('tagger');



var doc = nlp('i just walked to the store');
doc.match('just [#PastTense] to the store').debug();
