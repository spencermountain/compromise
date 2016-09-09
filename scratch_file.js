'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/logger').enable();

// let str = 'i think he\'s nice';
// let r = nlp('buy eggs quickly on friday. Eat cheese suddenly on saturday.');
// let m = r.match('#adverb on #date').tag('Fun');
// r.match('#Fun+').check();

console.log(nlp('two days').check());
