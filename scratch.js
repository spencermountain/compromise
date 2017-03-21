'use strict';
//this file is not included in the build.
//use it for messing around.
var nlp = require('./src/index');
// nlp.verbose('tagger');
// var nlp = require('./builds/compromise');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
// const fresh = require('./test/unit/lib/freshPrince.js');

// bug.1
//  .? vs *

// nlp('is this').sentences(0).toNegative().debug();

// nlp('I\'m going to the shops').sentences().toPastTense().debug();

console.time('tag');
nlp('my dog\'s name is Levi');
console.timeEnd('tag');

console.time('tokenize');
let r = nlp.tokenize('my dog\'s name is Levi');
r.match(['spencer', 'levi', 'jonny']).tag('#Person');
r.debug();
console.timeEnd('tokenize');
