'use strict';
const verbPhrase = require('./phrase/01-verbPhrase');
const nounPhrase = require('./phrase/02-nounPhrase');
const AdjectivePhrase = require('./phrase/03-adjectivePhrase');
//
const phraseTag = function(result) {
  result = verbPhrase(result);
  result = nounPhrase(result);
  result = AdjectivePhrase(result);
  return result;
};

module.exports = phraseTag;
