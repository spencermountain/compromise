// 'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('-2').values().data());

r = nlp('is -2').values().debug();
r.isEqual(-2).debug();
