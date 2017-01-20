'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

const m = nlp('john will be walking');
console.log(m.verbs().data());
