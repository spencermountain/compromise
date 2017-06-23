'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var lexicon = {
//   paris: 'Person',
//   lkjj: 'Adjective',
//   'donkey kong': 'City',
//   'hong kong convention': 'Person'
// };
var doc = nlp('12th day last month');
doc.debug();
// console.log(nlp('friendly').adjectives().data());
