'use strict';
//this file is not included in the build.
//use it for messing around.
// const nlp = require('./src/index');
const nlp = require('./builds/nlp_compromise');

// console.log(nlp('this is a sentence.').terms.find().reverse().find().first())
// console.log(nlp('this is a sentence. it is nice').sentences.unique().first())
// let str = 'roads and houses are nice, but a road is a house and are chairs';
// let r = nlp(str).terms().tense();
let r = nlp('he was incredibly cool').terms().adverbs().remove();
// let r = nlp('fifth of four').toNumber().text();
// let r = nlp('fifth of four');
// let p = r.clone();
// r.toNumber();
console.log(r.text());
// console.log(p.text());
