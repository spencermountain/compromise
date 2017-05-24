'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());

let arr = [
  // 'busked',
  // 'aimed',
  // 'stained',
  // 'looked',

  // 'sheds',
  // 'aces',
  // 'aced',
];
// arr.forEach((str) => {
//   console.log(nlp(str).tag('Verb').verbs().toInfinitive().out());
// });

console.log(nlp('sheds').tag('Verb').verbs().conjugate());
