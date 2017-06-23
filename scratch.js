'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var doc = nlp('he is');
doc.debug();
doc.contractions().contract().debug();
// console.log(doc.verbs().data());
