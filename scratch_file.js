'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const corpus = require('nlp-corpus');
const sotu = corpus.sotu.parsed()[15];
// const fresh = require('./test/unit/lib/freshPrince.js');
// nlp.verbose('tagger');


//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').debug();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();


// var m = nlp('the brown cat played').match('brown').delete();
// console.log(m.out());
// m.check();


//new sorts
// var m = nlp('the cat pllkjasdflkjsdflkjsdflkjayed. he was nice and cool. yes!');
// console.log(m.sort('length').out('grid'));
// console.log(m.sort('wordcount').out('grid'));
// console.log(m.list[0].chars());


// var m = nlp(fresh, lex); //.debug();
// var m = nlp(sotu);
var m = nlp('the United States Military Southern Command, General Barry McCaffrey, as America\'s new drug czar');
// var m = nlp('our federal government');
m.debug();
console.log(m.organizations().out('normal'));
