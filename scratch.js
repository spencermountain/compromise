'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
const fresh = require('./test/unit/lib/freshPrince.js');

var doc = nlp(fresh);
doc.sentences(2).debug();
// console.log(doc.quotations().data());
