'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();
var m = nlp('sixty five dollars and four cents USD');
m.values().toNumber();
// $56.04
m.check();
// m.values().toNiceNumber();
