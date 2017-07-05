'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var lexicon = {
//   paris: 'Person',
//   lkjj: 'Adjective',
//   'donkey kong': 'City',
//   'hong kong convention': 'Person'
// };
// var doc = nlp('gyrations can whipsaw the funds');
// doc.debug();
// console.log(nlp('friendly').adjectives().data());

var doc = nlp('April will get married on friday the third of December, 2019');
var dates = doc.dates();
console.log(dates.data());
