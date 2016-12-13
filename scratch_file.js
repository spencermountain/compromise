'use strict';
//this file is not included in the build.
//use it for messing around.
const freshPrince = require('./test/unit/lib/freshPrince');
const nlp = require('./src/index');
// require('./src/logger').enable();
// var m = nlp(freshPrince).nouns();

var m = nlp('spencer is really really cool').not('#Adverb+');
m.check();
// console.log(m.plaintext());
