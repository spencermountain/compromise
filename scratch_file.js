'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();


console.log('------');
// var m = nlp('he\'d be nice');
// m.contractions().expand();
// m.verbs().toNegative().check();




//insertBefore
//insertAfter

//replace


var r = nlp('six months and 2 days');
var c = r.clone().values().toNumber();
// console.log(r.match('#Value+').list);
// console.log(r.values().list);
// r.values().data();
// r.values().check();

console.log(r.values().data());
