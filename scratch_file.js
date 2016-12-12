'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

let all = nlp('six years and 2 days before the start of this next wednesday january 5th 1992 at 6pm');
all.check();
console.log(all.dates().parse()[0].punt);
