'use strict';
// const corpus = require('nlp-corpus');
const corpus = require('/home/spencer/mountain/nlp/corpus/index.js');
const nlp = require('../../../src/index.js');
const findReasons = require('./reasons');
const fallback = require('./fallback');


const analysis = function() {
  const str = corpus.text.sms();
  console.time('parse');
  let text = nlp.text(str);
  console.timeEnd('parse');
  console.log(text.sentences.length + ' sentences');
  // let reasons = findReasons(text);
  let fallbacks = fallback(text);
  // console.log(reasons);
  console.log(fallbacks);
  return;
};

module.exports = analysis;

analysis();
