var nlp = require('./src/index');
// nlp.verbose('tagger');

console.log(nlp('a quintillion').debug().values().data());
// console.log(nlp('thirty quintillion and two hundred').debug().values().data());

// - bugs
// console.log(nlp('nine quintillion two hundred').values().data());
// console.log(nlp('1e8').values().data());
