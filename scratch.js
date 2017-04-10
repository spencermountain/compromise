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
};
// nlp.extend({
//   Fun: {
//     downward: ['Noun'],
//     enemy: []
//   }
// });

// console.log(nlp('-2').values().data());
r = nlp('i am two years older now');
two = r.match('#Value').tag('#FunTag');
two.replaceWith('three', true);
two.debug();
