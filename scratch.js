// 'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
const corpus = require('nlp-corpus');
let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');


// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());

// r = nlp('he walks');
// r.match('walks').tag('Foo');
// r.verbs().toPastTense();
// r.debug();
