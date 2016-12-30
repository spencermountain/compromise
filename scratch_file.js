'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

//bug 2

// const m = nlp('he is nice, clean, and cool; he also studies - which is cool.');
const m = nlp('he is nice - which is cool... but whatever');
m.check();
// m.clauses().check();
console.log(m.plaintext());
console.log(m.clauses().data());
