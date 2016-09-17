'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

require('./src/logger').enable();
const context = {
  lexicon: {
    'donkey kong': 'Person'
  }
};

// let r = nlp(corpus.parsed.sotu().obama_2014);
let r = nlp('then surely a strong and confident America');
r.check();
r.phrases();
