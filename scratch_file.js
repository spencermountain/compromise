'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();


//bug 2. - transitive .verbs()
// var m = nlp('john is nice');

// m.sentences().toNegative();
// console.log(m.out('text'));

// m.verbs().toNegative();
// console.log(m.out('text'));


console.log(nlp('wish').tag('Verb').verbs().data()[0]);
