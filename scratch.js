var nlp = require('./src/index');
// nlp.verbose('tagger');

// let doc = nlp('i just walked to the store');
// doc.match('just [#PastTense] to the store').debug();

let m = nlp('John eats glue').replace('[john]', '$1 smith');
