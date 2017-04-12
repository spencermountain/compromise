// 'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
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


var m = nlp('2015.08.13');
// m.values().toNumber();
m.debug();
// console.log(m.out());
