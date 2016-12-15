'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();
var m = nlp('sixty five dollars and four cents USD');
// var m = r.match('#Money');
m.check();
// m.values().toNiceNumber();
