'use strict';
//use this file for messing around.
//... it is not included in the build
// console.log('\n\n\n\n');

const nlp = require('./src/index');
// let terms = (arr) => {
//   return arr
// }
// terms.find = () => {
//   return [5]
// }
//
//
// let nlp = (arr) => {
//   return {
//     terms: terms([1, 2])
//   }
// }


// console.log(nlp('this is a sentence.').terms.find().reverse().find().first())
// console.log(nlp('this is a sentence. it is nice').sentences.unique().first())
console.log(nlp('this is a sentence. it is nice').sentences.unique().terms.first())
