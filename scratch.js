var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

let doc = nlp('i went to the pool. I went to the party.');
console.log(doc.nouns().parent().json({
  normal: false,
  tags: false
}));

// console.log(match.stack.size());


// console.log(match.parent().text());
// console.log(doc.nouns());
