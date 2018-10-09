var nlp = require('./src/index');
nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

console.time('reg');
let str = 'word......................................Suffixing';
str.match(/(\.\.+)+$/);
console.timeEnd('reg');
