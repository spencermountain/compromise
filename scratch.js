var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

let doc = nlp('i went to the pool. I went to the party.');

doc.match('pool').prepend('infront here!');
// doc.append('behind here!');
console.log(doc.text());
