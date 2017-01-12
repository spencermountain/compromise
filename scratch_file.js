'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

var r = nlp('ben is cool. John goes to work.');
// r.sentences(1).toExclamation();
console.log(r.out('normal'));
