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

// let r = nlp('i wanna go');
// let r = nlp('he\'ll go');
// let r = nlp('spencer\'s nice');
// let r = nlp('spencer\'s nice house');
// let r = nlp('it will really be the nice house');

let r = nlp(corpus.parsed.sotu().obama_2012);
r.phrases();
