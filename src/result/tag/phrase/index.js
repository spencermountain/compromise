'use strict';
const conditionPass = require('./00-conditionPass');
const verbPhrase = require('./01-verbPhrase');
const nounPhrase = require('./02-nounPhrase');
const AdjectivePhrase = require('./03-adjectivePhrase');
//
const phraseTag = function (result) {
  result = conditionPass(result);
  result = verbPhrase(result);
  result = nounPhrase(result);
  result = AdjectivePhrase(result);
  return result;
};

module.exports = phraseTag;
