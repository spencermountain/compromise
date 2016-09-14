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

// let r = nlp(corpus.parsed.sotu().obama_2013);
// let r = nlp('And as time ticked by, her concern was not with her tired body or aching feet, but whether folks like her would get to have their say.');
// let r = nlp('510012');
// r.toOrdinal().check();
// r.phrases();
