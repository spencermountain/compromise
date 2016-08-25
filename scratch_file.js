'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/logger').enable();

// let str = 'i think he\'s nice';
let r = nlp('we will not have quickly stepped up. he is nice.');
// let r = nlp('she is not suddenly beautiful.');
// r.pretty();
// r.toExclamation();
r.verbs().pretty();
