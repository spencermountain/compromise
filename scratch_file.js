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

// var m = nlp('the cat is nice').replace('cat', 'stinky dog');
var m = nlp('We\'ve   only').contractions().expand()
  // r = r.all();
m.check();
console.log('|' + m.plaintext())
