'use strict';
//this file is not included in the build.
//use it for messing around.
const log = require('./src/log');
log.enable();
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');

let str = 'John is really good today. She really walks quickly backwards. ';
let r = nlp(str);
console.log(r.adverbs().byFreq());
// console.log(r.text());
