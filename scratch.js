'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());



// var r = nlp('it is + politic').debug();
// r.match('is \\+', true).debug();

nlp('on Sat, Apr 1st, 2017').debug();
// console.log(nlp('it is 3% of the budget').values().toText().out());
