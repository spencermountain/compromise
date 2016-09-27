'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

//toNumber,toValue,toOrdinal
//match,replace,before/after

require('./src/logger').enable();
const context = {
  lexicon: {
    'donkey kong': 'Person'
  }
};

// let r = nlp(corpus.parsed.sotu().obama_2012);
// r.match('#ConditionPhrase+ {15,15}').phrases();
// let r = nlp('if you, or anyone see this.');
// let r = nlp('if you make under $250,000 a year, like 98% of American families');
// r.check();
// r.phrases();

// nlp(1175).toTextNumber().check();
// let m = nlp('john        is  so   cool! ');
let m = nlp('tomorrow morning');
// m.normalize();
m.check();
// console.log(m.parse());
