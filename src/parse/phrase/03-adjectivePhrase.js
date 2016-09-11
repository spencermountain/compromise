'use strict';
//
const adjectivePhrase = function(result) {
  //nice house
  result.match('#Copula not? #Adjective').tag('AdjectivePhrase');
  return result;
};

module.exports = adjectivePhrase;
