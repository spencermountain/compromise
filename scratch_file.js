'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
// const context = {
//   lexicon: {
//     'donkey kong': 'Person'
//   }
// };

// let r = nlp('half a million');
// console.log(nlp('four point sixteen').values().toNumber().normal());
console.log(nlp('seven eleven').values().toNumber().normal());
// r.check();
// console.log(r.values().parse());
