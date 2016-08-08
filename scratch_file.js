'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const nlp = require('./builds/nlp_compromise');

require('./src/log').enable();

// let str = 'spencer\'s house of flies';
let str = 'spencers\'';
let r = nlp(str);
// r.toExpansion();
// r.toContraction();
// console.log(r._sentences[0]._terms[1]);
console.log(r.pretty());
