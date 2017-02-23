'use strict';
//this file is not included in the build.
//use it for messing around.
// var nlp = require('./src/index');
var nlp = require('./builds/compromise');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
// const fresh = require('./test/unit/lib/freshPrince.js');

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

var r = nlp('Larry, Curly, and Moe').terms().people().sort();
console.log(r.out('array'));
