var nlp = require('./src/index');
// nlp.verbose('tagger');


console.log(nlp('i was really cool').sentences().toPresentTense().out());
// console.log(nlp('i was really cool').sentences().toPastTense().out());
// console.log(nlp('i was really cool').sentences().toFutureTense().out());
