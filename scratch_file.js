'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');

// console.log(nlp('this is a sentence.').terms.find().reverse().find().first())
// console.log(nlp('this is a sentence. it is nice').sentences.unique().first())
// let str = 'roads and houses are nice, but a road is a house and are chairs';
// let r = nlp(str).terms().tense();
let r = nlp('he understood').terms()._terms[1].to('pastTense');
console.log(r);
