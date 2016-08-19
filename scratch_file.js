'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');
// require('./src/log').enable();

let str = 'he is so good. spencer was so nice';
nlp(str).terms().match('[copula] So').pretty();
