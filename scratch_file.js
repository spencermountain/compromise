'use strict';
//this file is not included in the build.
//use it for messing around.
const freshPrince = require('./test/unit/lib/freshPrince');
const nlp = require('./src/index');
// require('./src/logger').enable();
// var m = nlp(freshPrince).things();

// let m = nlp('the trip to Paris. it is paris france.');
let m = nlp('spencer kelly and dr. spencer kelly');
m.people().unique().check();
// m.places().unique().check();
// m.check();
// console.log(m.root());
