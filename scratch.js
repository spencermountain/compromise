'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var m = nlp('they are good').debug().sentences().toNegative();
m.debug();
