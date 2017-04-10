// 'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
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

// console.log(nlp('-2').values().data());
r = nlp('was');
r.debug();
r.tag('PastTense');
r.debug();
