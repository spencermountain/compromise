'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
// const context = {
//   lexicon: {
//     'donkey kong': 'Person'
//   }
// };
let txt = corpus.parsed.weezer().sweatersong;
let r = nlp('i did not walk');
r.verbs().toFuture();
// let r = nlp('google inc');
r.check();
console.log(r.plaintext());
