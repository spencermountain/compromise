'use strict';
//this file is not included in the build.
//use it for messing around.
// const nlp = require('./builds/compromise.min');
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
// sotu = `protecting Medicare, Medicaid, education, and the environment.`;
const fresh = require('./test/unit/lib/freshPrince.js');
// nlp.verbose('tagger');


//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').debug();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();

// bug 3. - missing whitespace
// console.log(nlp('june 5-7 1999').out());

//bug 4.
// var m = nlp('the stool falls over').sentences();
// m.debug();
// // console.log(m.out());
// m.toPastTense();
// console.log(m.out());
//
// m.toPresentTense();
// console.log(m.out());
// //
// m.toFutureTense();
// console.log(m.out());
// //
// console.log('---------');
// m.toNegative();
// console.log(m.out());
// console.log('---------');
// //
// //
// m.toPastTense();
// console.log(m.out());
// m.toPresentTense();
// console.log(m.out());
// m.toFutureTense();
// console.log(m.out());
// var m = nlp('january 5 to 7 1998');
// m.match('#Value+').splitOn('#Year').debug();
// m.values().debug();
// m = m.values().match('#Year');
// console.log(m.values().data());
// console.log(m.list[0].terms);
// console.log(m.out());

// var r = nlp(fresh).normalize();
