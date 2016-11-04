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
// let txt = corpus.parsed.weezer().sweatersong;
let r = nlp('would not');
r.contractions().contract();
// console.log(r.tag('Verb').verbs().parse());
// console.log(t.noun.isPlural());
// console.log(r.adjectives().parse());
// console.log(r.list[0].terms[0].term.isAcronym());
// r.verbs().toFuture();
// let r = nlp('would fuzz').verbs().conjugate();
r.check();
// console.log(r.plaintext());
