'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// nlp('well').debug();
console.log(nlp('cute').adjectives().data());
