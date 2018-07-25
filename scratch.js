var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();


let text = 'and "Dig Your own grave and Save".';
let doc = nlp(text);
doc.debug();
// let matches = doc.quotations().out('array');
// console.log(matches);
