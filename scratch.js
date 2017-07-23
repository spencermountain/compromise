'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var str = "john's, house";
var doc = nlp(str, { john: 'Place' });
console.log(doc.list[0].lexicon);
// console.log(doc.places().out());
