var nlp = require('./src/index');
// nlp.verbose('tagger');

let doc = nlp('i just walked to the store');
doc.match('just #PastTense .+ store').debug();
