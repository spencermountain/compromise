var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

let doc = nlp('i went to the pool. I went to the party.');

let m = doc.match('i');
m.prepend('oooooooooo yaa');
// console.log(m.text());
// doc.list[0].length += 1;
console.log(doc.text());
