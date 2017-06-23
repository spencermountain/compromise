'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var doc = nlp('in new mexico a walk off home run');
doc.debug();
// console.log(doc.quotations().data());
