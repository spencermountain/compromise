var nlp = require('./src/index');
// nlp.verbose('tagger');


// nlp('he studied well').verbs().toGerund().debug();
// console.log(nlp('i would walk').sentences().toPastTense().out());
console.log(nlp('john will not walk quickly').debug().sentences().toPastTense().out());
// console.log(nlp('i should walk to the park').sentences().toPastTense().out());
