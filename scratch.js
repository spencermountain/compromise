var nlp = require('./src/index');
// nlp.verbose('tagger');

console.log(nlp('190,000,000').values().data()); //bug!

// console.log(nlp('9000000000200').debug().values().data());
// console.log(nlp('80 grand').debug().values().data());
// console.log(nlp('thirty quintillion and two hundred').debug().values().data());

// - bugs
// console.log(nlp('100,000,000,000').values().data());
// console.log(nlp('nine quintillion two hundred').values().data());
// console.log(nlp('1e8').values().data());
