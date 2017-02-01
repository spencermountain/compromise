'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

console.log('------');
// var m = nlp('he\'d be nice');
// m.contractions().expand();
// m.verbs().toNegative().check();




//insertBefore
//insertAfter

//replace

// console.log(nlp('has played').verbs().toNegative().all().out());
// console.log(nlp('he has played').verbs().toNegative().out());
// console.log(nlp('is playing').verbs().toNegative().out());
// console.log(nlp('spencer is playing').verbs().toNegative().out());
// console.log(nlp('will play').verbs().toNegative().out());
// console.log(nlp('will be playing').verbs().toNegative().out());
// console.log(nlp('had played').verbs().toNegative().out());
// console.log('');
// console.log(nlp('plays').verbs().toNegative().out());
// console.log(nlp('played').verbs().toNegative().out());
// console.log(nlp('he walked').verbs().toNegative().out());

// console.log(nlp('he has quietly surely walked on the ground').verbs().toNegative().out());
// console.log(nlp('she really walked').verbs().toNegative().out('normal'));
nlp('he\'s walked').check();

///===singular
// pastTense -  john played -> john did not play
// presentTense - john plays  -> john does not play
// futureTense - john will play  -> john will not play

///===plural
// pastTense -  we played -> we did not play
// presentTense - we play  -> we do not play
// futureTense -  we will play -> we will not play
