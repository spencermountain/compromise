'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());



// var r = nlp('it is + politic').debug();
// r.match('is \\+', true).debug();

// var text = 'out - 2nd video';
// nlp(text).values().debug();

// var text = 'Constructor';
// nlp(text).debug();

// var r = nlp('he is mark hughes', lexicon).debug();
var r = nlp('as an attorney').debug();
// console.log(nlp('dies').verbs().conjugate());
