'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toFutureTense().out());
// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());
// console.log(nlp('john is going to the shops').sentences().toPresentTense().out());

// nlp(`I'm`).contractions().expand().debug();

// console.log(nlp('I\'ll go to the shops').sentences().toFutureTense().out());
let r = nlp('fun times in cool town');
let t = r.match('times');
r.replace(t, 'day');
console.log(r.out());
