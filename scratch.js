var nlp = require('./src/index');
// nlp.verbose('tagger');


console.log(nlp('disagree').verbs().conjugate(0));
// nlp('he studied well').verbs().toGerund().debug();
// console.log(nlp('we walk to the park').sentences().toContinuous().out());
