'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

var r = nlp('ben is cool. John goes to work. Jen eats a lot.');
r.sentences().toExclamation();
console.log(r.out('text'));
