'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const Term = require('./src/term');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
// const context = {
//   lexicon: {
//     'donkey kong': 'Person'
//   }
// };
// let txt = corpus.parsed.weezer().sweatersong;

let r = nlp('first to last day');
// r.check();
console.log(r.asArray());

// let r = nlp('1 April to 31 August');
// r.check();
// let t = new Term('april');
// t.tagAs('Infinitive');
// console.log(t.tag);
//
// t.tagAs('Month');
// console.log(t.tag);
