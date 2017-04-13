// 'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
const corpus = require('nlp-corpus');
let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');


// nlp("I'm going to the shops").sentences().toPastTense().out()

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
var lexicon = {
  'weds': 'WeekDay',
};

// var m = nlp(text);
// var m = nlp('make any doubt dictate some pressing issues about this budget');
// var m = nlp('And Churchill responded on this night.');
var m = nlp('weds', lexicon);
// var m = nlp('this was one sentence. This makes two now');
console.log(m.out('color'));
m.debug();
// m.contractions().expand();
// m.dates().toLongForm();
// m.values().toNumber();
// console.log(m.values().noDates().out('array'));
// console.log(m.out());
