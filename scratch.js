'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());



// var r = nlp('it is + politic').debug();
// r.match('is \\+', true).debug();

var r = nlp('third book in 2019');
r.values().toNumber();
console.log(r.out());
r.values().toText();
console.log(r.out());
r.values().toCardinal();
console.log(r.out());
r.values().toOrdinal();
r.values().debug();
console.log(r.out());
