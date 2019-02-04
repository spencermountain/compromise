var nlp = require('./src/index');
nlp.verbose('tagger');

let x = `best look after`;

console.log(nlp(x).debug().verbs().data());
