'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

const m = nlp('10 and 10?');
m.values().toNumber();
m.check();
