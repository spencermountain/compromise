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

// console.time('parse');
// let r = nlp(fresh);
// console.timeEnd('parse');
//
// console.time('match');
// r.match('#Determiner (story|thing|#Adjective)', true);
// console.timeEnd('match');
//
// console.time('tag');
// r.tag('#Person');
// console.timeEnd('tag');

let r = nlp('we live in Toronto Canada and it is cold');
r.match('#Place+').unTag('*');
r.debug();
