'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();
var r = nlp('it is $703');
var m = r.match('#Money');
m.check();
// m.values().toNiceNumber();
