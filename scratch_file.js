'use strict';
//this file is not included in the build.
//use it for messing around.
const log = require('./src/log');
log.enable();
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');

let str = 'John is really good today. Is he? She really walks quickly backwards. ';
let r = nlp(str);
r.sentences().toQuestion();
console.log(r.text());
