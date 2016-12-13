'use strict';
//this file is not included in the build.
//use it for messing around.
const freshPrince = require('./test/unit/lib/freshPrince');
const nlp = require('./src/index');
// require('./src/logger').enable();
// var m = nlp(freshPrince).things();

let m = nlp('spencer\'s trip to France. spencer is nice');
m.things().check();
// m.check();
// console.log(m.plaintext());
