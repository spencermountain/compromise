'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// let plugin = {
//   plurals: {
//     mouse: 'mousii'
//   }
// };
// nlp.plugin(plugin);
// let doc = nlp('saw a mouse');
// doc.nouns().toPlural();
// doc.debug();
//
// plugin = {
//   words: {
//     trex: 'Dinosaur'
//   },
//   tags: {
//     Dinosaur: {
//       isA: 'Animal'
//     },
//     Animal: {
//       isA: 'Noun'
//     }
//   },
//   regex: {
//     'u{3}': 'Exaggeration'
//   }
// };
// nlp.plugin(plugin);
// doc = nlp('i saw a HUUUUGE trex');
// doc.debug();

// nlp('restore').debug();
console.log(
  nlp('edit')
    .verbs()
    .conjugate()[0].Gerund
);
