'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

nlp('we fucked up').debug();
// console.log(nlp('he fucked up').adjectives().data());
