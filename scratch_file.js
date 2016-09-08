'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/logger').enable();

// let str = 'i think he\'s nice';
let r = nlp('buy eggs on friday. Eat cheese on saturday.');
let m = r.match('on #date');
// m.tag('Fun');
m.remove('on').check();
