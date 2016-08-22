'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/log').enable();

// let str = 'i think he\'s nice';
let r = nlp('he is nice. They walked around.');
console.log(r.pretty());
