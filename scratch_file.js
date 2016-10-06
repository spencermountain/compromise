'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
const context = {
  lexicon: {
    'donkey kong': 'Person'
  }
};
// let r = nlp(corpus.parsed.sotu().obama_2012);
// r.phrases();

let m = nlp('john is cool. john is nice.');
console.log(JSON.stringify(m.ngram(), null, 2));
// m.check();
// console.log(m.list[0].terms[1]);
