'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var r = nlp('they are flowers');
r.debug();
