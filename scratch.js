var nlp = require('./src/index');
// nlp.verbose('tagger');


// console.log(nlp('i am not fun').verbs().conjugate());
console.log(nlp('i am not fun').sentences().toContinuous().out());
