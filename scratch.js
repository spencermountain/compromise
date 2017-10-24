var nlp = require('./src/index');
// nlp.verbose('tagger');

//1) - busted
// var doc = nlp('around 7.5-8');
// doc.contractions().expand();
// doc.values().toText();
// console.log(doc.out());

//2) en-dash
// var doc = nlp('20–20');
// doc.debug();

// 3) lookin'
// var doc = nlp('i\'m looking for amanda');
var doc = nlp('i\'m');
doc.debug();
doc.verbs().toPastTense();
console.log(doc.out());

// 4) support demo words
//wee
//the very model of
// how come
// they're ruffled
// major general
// bel-air
//there's
// nlp("Mr. Putin's").people()

// 5) sentence .topast/.toNegative/toPlural
