'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/logger').enable();

const context = {
  lexicon: {
    'donkey kong': 'Person'
  }
};

console.log(nlp('play some, donkey kong please', context).check());
