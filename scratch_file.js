'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

// let m = nlp('he is really good').sentences().toNegative();
// console.log(m.normal() + '\n\n');
//
// m = nlp('he was walking').sentences().toNegative();
// console.log(m.normal() + '\n\n');
//
// m = nlp('i would have been walking').sentences().toNegative();
// console.log(m.normal() + '\n\n');
//
// m = nlp('she does cook').sentences().toNegative();
// console.log(m.normal() + '\n\n');
//
// m = nlp('by cooking').sentences().toNegative();
// console.log(m.normal() + '\n\n');
//
// m = nlp('they swim').sentences().toNegative();
// console.log(m.normal() + '\n\n');

// let m = nlp('everyone walks').replace('everyone', 'someone');
// let m = nlp('john said everyone walks').sentences().toNegative();
// console.log(m.normal() + '\n\n');

let m = nlp(`i dunno`)
m.contractions().expand();
console.log(m.normal() + '\n\n');



// nlp('a b c').match('b').insertAfter('hi').check();
