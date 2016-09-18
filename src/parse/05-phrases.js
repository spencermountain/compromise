'use strict';
const conditionPass = require('./phrase/00-conditionPass');
const verbPhrase = require('./phrase/01-verbPhrase');
const nounPhrase = require('./phrase/02-nounPhrase');
const AdjectivePhrase = require('./phrase/03-adjectivePhrase');
//
const phraseTag = function(result) {
  result = conditionPass(result);
  result = verbPhrase(result);
  result = nounPhrase(result);
  result = AdjectivePhrase(result);
  return result;
};

module.exports = phraseTag;
