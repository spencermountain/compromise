'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var doc = nlp('18 oct');
// doc.debug();
console.log(nlp('quick').adjectives().data());
