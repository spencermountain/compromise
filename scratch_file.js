'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();



//bug 3.
// console.log('durian:', nlp('durian').nouns().out('text'));
// console.log('harden:', nlp('harden').nouns().out('text'));
var lexicon = {
  'Jardas Al Abid': 'Place',
};
// var sentence = 'A suicide attack hit the centre of Tobruk killing one person (and the attacker) and injuring more than twenty.';
// var found = nlp(sentence).places().data()[0];
// console.log('Problem#1. Test to find locality in English without lexicon.');
// t.equal('Tobruk', found);

var sentence = 'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.';
nlp(sentence, lexicon).places().check();
