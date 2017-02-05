'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
const fresh = require('./test/unit/lib/freshPrince.js');

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


//mutable lexicon
let lex = {
  'High Five': 'Verb'
};
nlp(fresh, lex).debug();
