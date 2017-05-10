'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());



// var r = nlp('it is + politic').debug();
// r.match('is \\+', true).debug();

let r = nlp('20 books');
r.debug();
// // console.log(r.values().out());
// // console.log(r.values().toNumber().all().out());
// r.values().toText();
// console.log(r.out());
// r.debug();

// console.log(nlp('21 books').values().greaterThan(7).out('normal'));
