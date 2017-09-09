'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
let plurals = {
  bookly: 'booklii',
  algebra: 'algebri'
};
nlp.addPlurals(plurals);
let doc = nlp('the bookly did many algebri');
let arr = doc.nouns().data();
doc.debug();
console.log(arr);
