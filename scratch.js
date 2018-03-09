var nlp = require('./src/index');
// nlp.verbose('tagger');

console.log(nlp('nine quintillion two hundred').values().data());
