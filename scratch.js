'use strict';
//this file is not included in the build.
//use it for messing around.
var nlp = require('./src/index');
nlp.verbose('tagger');
// var nlp = require('./builds/compromise');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
// const fresh = require('./test/unit/lib/freshPrince.js');

// bug.1
//  .? vs *

// nlp('is this').sentences(0).toNegative().debug();

// nlp('I\'m going to the shops').sentences().toPastTense().debug();

var p = nlp('That\'s Evan.').debug();
p.contractions().debug();
