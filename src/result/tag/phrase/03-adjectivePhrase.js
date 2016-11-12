'use strict';
//
const adjectivePhrase = function(result) {
  //is really not so good
  // result.match('#Copula+ #Adverb? #Negative? as? #Adverb? #Adjective').tag('AdjectivePhrase').term(0).tag('#Copula');
  // //stonger than
  // result.match('#Comparative than').tag('AdjectivePhrase');
  //very easy
  result.match('#Copula #Adverb? #Negative? #Adverb? #Adjective #Adverb?').match('#Adverb? #Adjective #Adverb?').tag('AdjectivePhrase');
  //difficult but necessary
  result.match('#AdjectivePhrase #Conjunction #Adjective').tag('AdjectivePhrase');
  //is as strong as
  result.match('#AdjectivePhrase as').tag('AdjectivePhrase');
  return result;
};

module.exports = adjectivePhrase;
