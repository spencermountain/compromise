'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();
var m = nlp('the dog sat').match('the dog sat').insertAfter('quickly');
// m.check();
console.log(m.plaintext());
