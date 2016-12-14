'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

var r = nlp('Sept, 2012').dates().toLongForm();
r.check();
// console.log(r);
