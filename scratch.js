'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var str = "john's, house";
// var doc = nlp(str, { john: 'Place' });
// // console.log(doc.list[0].terms[0]);
// console.log(doc.places().out());

var str = "I'll go";
var doc = nlp(str).sentences().debug();
console.log(doc.toPresentTense().out());
