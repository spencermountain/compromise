var nlp = require('./src/index');
// nlp.verbose('tagger');


console.log(nlp('i am cool').sentences().toPresentTense().out());
