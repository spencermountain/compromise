var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

// let doc = nlp('i went to the foolish pool to dim swim. To swim is human. fast. working out.');
// doc.tag('Verb');




// doc.debug();

//gotcha?
nlp('cool cool').match('cool+$').debug();
