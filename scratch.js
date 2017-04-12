// 'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
const corpus = require('nlp-corpus');
let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');


let extend = {
  tags: {},
  nouns: {
    singular: 'word',
    plural: 'words'
  },
  verbs: {
    infinitive: 'cool',
    pastTense: 'cooled',
  }
};
// nlp.extend({
//   Fun: {
//     downward: ['Noun'],
//     enemy: []
//   }
// });


// var m = nlp(text);
// var m = nlp('make any doubt dictate some pressing issues about this budget');
var m = nlp('this is one sentence. This makes two now.');
// var m = nlp('the budget');
console.log(m.out('color'));
// m.contractions().expand();
// m.dates().toLongForm();
// m.values().toNumber();
// console.log(m.values().noDates().out('array'));
// console.log(m.out());
