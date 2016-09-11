'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

require('./src/logger').enable('tagger');
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

// let r = nlp(corpus.parsed.sotu().obama_2012);
// let r = nlp('That’s not how people feel from Tokyo to Berlin; from Cape Town to Rio; where opinions of America are higher than they’ve been in years.');
let r = nlp('spencer is nice');
r.phrases();
r.check();
