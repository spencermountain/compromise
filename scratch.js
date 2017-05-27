'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

//incriment()
// .out('matches')
// .out('list')

var doc = nlp('he ate 100 dollars');
doc.values().debug();
