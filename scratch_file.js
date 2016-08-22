'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
require('./src/log').enable('match');

// let str = 'i think he\'s nice';
let r = nlp('Dr. Spencer Smith says hi');
r.terms().pretty();
let m = r.match('dr spencer smith');
console.log('\n\n');
m.pretty();
