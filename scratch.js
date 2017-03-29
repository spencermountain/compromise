'use strict';
//this file is not included in the build.
//use it for messing around.
var nlp = require('./src/index');
// nlp.verbose('tagger');
// var nlp = require('./builds/helloCompiled');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
const fresh = require('./test/unit/lib/freshPrince.js');

// bug.1
//  .? vs *

// nlp('is this').sentences(0).toNegative().debug();

// nlp('I\'m going to the shops').sentences().toPastTense().debug();


// let r = nlp('john and jill were nice');
// r.debug();

// let r = nlp(fresh);
// console.time('parse');
// let m = r.match('#Determiner (story|thing|#Adjective)', true);
// console.timeEnd('parse');
//
// console.time('m');
// // let m = r.list[0].lookup('story', true);
// console.log(m.length);
// console.timeEnd('m');
console.log(nlp('i called the bank every month about money for the loan.').match('loan').out('offset'));
