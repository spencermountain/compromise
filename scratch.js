'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var doc = nlp('apples, oranges, pears');
doc.nouns().toSingular().debug();
// doc.nouns().toSingular();
