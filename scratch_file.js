'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// let sotu = corpus.sotu.parsed()[23];
// sotu = `protecting Medicare, Medicaid, education, and the environment.`;
// const fresh = require('./test/unit/lib/freshPrince.js');
// nlp.verbose('tagger');


//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').debug();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();


var r = nlp('5 days');
r.match('#Duration').debug();
// var dates = r.dates().data();
// console.log(dates);
