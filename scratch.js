var nlp = require('./src/index');
// nlp.verbose('tagger');

// console.log(nlp('spencer was cool').sentences().toPresentTense().out());
// console.log(nlp('we are cool').sentences().toPresentTense().out());
console.log(nlp('i wasn\'t cool').sentences().toPresentTense().out());
