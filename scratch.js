var nlp = require('./src/index');
nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

console.log(nlp('attempted').verbs().toInfinitive().out());
