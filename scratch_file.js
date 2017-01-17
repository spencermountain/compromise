'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();



//bug 3.
// console.log('durian:', nlp('durian').nouns().out('text'));
console.log('harden:', nlp('harden').nouns().out('text'));
