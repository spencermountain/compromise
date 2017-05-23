'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());


// lied => ly
// shed => sh
// owed => ow
// aged => ag
// aced => ac
// axed => ax
// egged => eg
// vied => vy
// ared => ar
// sked => sk
// fied => fy
// aked => ak

let arr = [
  'lied',
  'shed',
  'owed',
  'caged',
  'aced',
  'axed',
  'egged',
  'vied',
  'pared',
  'busked',
  'gentrified',
  'raked',
];
arr.forEach((str) => {
  console.log(nlp(str).tag('Verb').verbs().toInfinitive().out());
});
// console.log(nlp('stalked').tag('Verb').verbs().toInfinitive().out());
