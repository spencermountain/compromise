'use strict';
//
const adjectivePhrase = function(result) {
  //is really not so good
  result.match('#Copula #Adverb? not? as? #Adverb? #Adjective').tag('AdjectivePhrase').term(0).tag('#Copula');
  //is as strong as
  result.match('#AdjectivePhrase as').tag('AdjectivePhrase');
  return result;
};

module.exports = adjectivePhrase;
