'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

var m = nlp('-17,983,983.923');
// console.log(nlp('17,983').values().toNumber().check().plaintext());
// console.log(nlp('17,983').values().parse());
// m.values().toNumber();
// m.values().toOrdinal();
// m.values().toCardinal();
// m.values().toCardinal();
m.check();
// m.values().toNiceNumber();
