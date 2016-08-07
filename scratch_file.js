'use strict';
//this file is not included in the build.
//use it for messing around.
const log = require('./src/log');
log.enable();
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');

let str = 'She doesn\'t walk quickly. ';
let r = nlp(str);
// r.toExpansion();
// r.toContraction();
// console.log(r._sentences[0]._terms[1]);
console.log(r.pretty());
