'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();


console.log('------');
// var m = nlp('he\'d be nice');
// m.contractions().expand();
// m.sentences().toNegative().check();




//insertBefore
//insertAfter

//replace

// console.log(nlp('has played').sentences().toNegative().all().out());
// console.log(nlp('he has played').sentences().toNegative().out());
// console.log(nlp('is playing').sentences().toNegative().out());
// console.log(nlp('spencer is playing').sentences().toNegative().out());
// console.log(nlp('will play').sentences().toNegative().out());
// console.log(nlp('will be playing').sentences().toNegative().out());
// console.log(nlp('had played').sentences().toNegative().out());
// console.log('');
// console.log(nlp('plays').sentences().toNegative().out());
// console.log(nlp('played').sentences().toNegative().out());
// console.log(nlp('he walked').sentences().toNegative().out());
// console.log(nlp('he has quietly surely walked on the ground').sentences().toNegative().out());
// console.log(nlp('she really walked').sentences().toNegative().out('normal'));
// console.log(nlp('he walks').sentences().toNegative().out('normal'));

///===singular
// pastTense -  john played -> john did not play
// presentTense - john plays  -> john does not play
// futureTense - john will play  -> john will not play

///===plural
// pastTense -  we played -> we did not play
// presentTense - we play  -> we do not play
// futureTense -  we will play -> we will not play
