'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();


console.log('------');
var m = nlp('he\'d be nice');
// m.insertAt(2, 'fun');
console.log(m.adjectives().data());
