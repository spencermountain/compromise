'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const Term = require('./src/term');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
// const context = {
//   lexicon: {
//     'donkey kong': 'Person'
//   }
// };
// let txt = corpus.parsed.weezer().sweatersong;

var str = 'adds in the today queue';
var m = nlp(str);
// m.values().toNiceNumber();
// console.log(m.plaintext());

// let r = nlp('maybe doug is right');
// r = r.match('doug is right');
// r = r.match('is right');
// r = r.match('#Verb').replace('5');
// r = r.term(0)
// r = r.all();
m.check();
// console.log(r.asArray());
// console.log(r.asArray());
// console.log(r.people().parse());
// r.check();



// let r = nlp('1 April to 31 August');
// r.check();
// let t = new Term('april');
// t.tagAs('Infinitive');
// console.log(t.tag);
//
// t.tagAs('Month');
// console.log(t.tag);
