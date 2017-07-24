'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');
//
// var doc = nlp('john smith is nice', { 'john smith': 'Place' });
// doc.debug();
// console.log(doc.world.lexicon.john);

var doc = nlp('john walks quickly'); //.sentences().toFutureTense().debug();
console.log(doc.sentences().world);
