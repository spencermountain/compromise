'use strict';
const corpus = require('/home/spencer/mountain/nlp/corpus/index.js');
const nlp = require('../../../src/index.js');

const spot_test = function() {
  const str = corpus.text.wiki();
  let text = nlp.text(str);
  let topics = text.spot();
  console.log(topics);
  return;
};

module.exports = spot_test;
spot_test();
