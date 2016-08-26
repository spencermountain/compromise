'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/logger').enable();

// let str = 'i think he\'s nice';
let r = nlp('we will not really have blown up.');
// let r = nlp('she is not suddenly beautiful.');
// r.pretty();
// r.toExclamation();
console.log(r.verbs().arr[0].parts);
