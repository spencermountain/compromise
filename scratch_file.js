'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/log').enable();

let context = {
  lexicon: {
    apple: 'Organization'
  }
};

let str = 'apple is nice';
let r = nlp(str, context);
r.terms().pretty();

console.log('\n\n');
context.lexicon = {
  apple: 'Person'
};
let r2 = nlp(str, context);
r2.terms().pretty();
