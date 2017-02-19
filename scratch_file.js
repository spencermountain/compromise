'use strict';
//this file is not included in the build.
//use it for messing around.
// const nlp = require('./builds/compromise.min');
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
const fresh = require('./test/unit/lib/freshPrince.js');
nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').debug();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();

// bug 3. - missing whitespace
// console.log(nlp('june 5-7 1999').out());

//bug 4.
// var r = nlp('1998\'s collection').debug();


// var tagSet = {
//   Noun: {
//     Singular: {
//       Color: {
//         OffWhite: true
//       }
//     }
//   }
// };
// var lexicon = {
//   'mother of pearl': 'OffWhite'
// };
// console.log(nlp('it is mother of pearl', lexicon, tagSet).terms().last().out('tags'));

// var r = nlp('i look like my buddy');
var arr = nlp('you could still go to McGill, the Harvard of Canada!').places().data();
console.log(arr);
