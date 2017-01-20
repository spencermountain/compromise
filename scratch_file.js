'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();


// const m = nlp('john would not have had been walking');
// console.log(m.verbs().check().data());
var arr = nlp('we walked, talked, and quickly sang').verbs().check().data();
console.log(arr);
