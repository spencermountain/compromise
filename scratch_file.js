'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
// const context = {
//   lexicon: {
//     'donkey kong': 'Person'
//   }
// };

// let r = nlp('half a million');
// console.log(nlp('four point sixteen').values().toNumber().normal());
// console.log(nlp('seven eleven').values().toNumber().normal());
// r.check();
// console.log(r.values().parse());

var lexicon = {
  // 'al gharbi district': 'Place',
  // 'suq ajaj': 'Place',
  // 'sūq ajāj': 'Place'
  // 'jabal al gharbi district': 'Place'
  'ajāj': 'Place'
};
// var str = 'Humanitarian crisis in jabal al gharbi district. We live in sūq ajāj';
var str = 'ajāj';
var t = nlp(str, {
  lexicon: lexicon
});
// console.log(t.match('#Place+').asArray());
t.check();
