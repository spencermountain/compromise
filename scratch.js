'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
let plurals = {
  bookly: 'booklii',
  snaool: 'snaooli'
};
nlp.addPlurals(plurals);
let doc = nlp('the bookly');
doc.debug();

console.log(doc.nouns().data()[0]);
