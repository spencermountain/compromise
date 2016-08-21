'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
require('./src/log').enable('match');

// let str = 'i think he\'s nice';
let r = nlp('is good');
r.terms().pretty();
let m = r.match('is .? good');
console.log('\n\n');
m.pretty();
