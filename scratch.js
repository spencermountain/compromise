'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var doc = nlp('house');
// let subset = doc.nouns().replace('house', 'cemetary');
// console.log('old: ' + (doc.out() === 'cemetary'));
// // console.log('new: ' + (subset.out() === 'cemetary'));

// var orig = nlp('i am from new jersey');
// let sub1 = orig.match('new jersey');
// let sub2 = sub1.match('jersey');
// let sub3 = sub2.replace('jersey', 'york');
// console.log(sub3.out());

// let doc = nlp('jersey');
// let one = doc.match('.').replace('jersey', 'WIN!');
// console.log(one.out());
let tmp = nlp('jersey').match('.', true);
console.log(tmp.all());
