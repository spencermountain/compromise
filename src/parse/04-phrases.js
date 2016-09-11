'use strict';
const verbPhrase = require('./phrase/01-verbPhrase');
const nounPhrase = require('./phrase/02-nounPhrase');
//
const phraseTag = function(result) {
  result = verbPhrase(result);
  result = nounPhrase(result);
  return result;
};

module.exports = phraseTag;
