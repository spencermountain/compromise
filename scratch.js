'use strict';
var nlp = require('./src/index');
nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var m = nlp('the stool will not fall over'); //.match('he #Verb #Particle');
m.debug();
