'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

const m = nlp('what is 10 and 10?');
m.values().toNumber();
m.check();

console.log(m.plaintext());
// 2 what is 10
