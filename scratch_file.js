'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
const context = {
  lexicon: {
    'donkey kong': 'Person'
  }
};
// let r = nlp(corpus.parsed.sotu().obama_2012);
// r.phrases();

// let r = nlp('Air France is cool');
// let r = nlp('guinea-bissau');
// let r = nlp('  ');


// let r = nlp('she was really and immediately nice').adjectives().parse();
// let r = nlp('five nor fifth nor 5 nor 5th').values().toTextValue().toCardinal();
let r = nlp('this Monday').match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('DateChunk');
// console.log(r);
r.check();
