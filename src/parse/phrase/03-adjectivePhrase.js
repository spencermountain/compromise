'use strict';
//
const adjectivePhrase = function(result) {
  //is really not so good
  // result.match('#Copula+ #Adverb? #Negative? as? #Adverb? #Adjective', true).tag('AdjectivePhrase').term(0).tag('#Copula');
  // //stonger than
  // result.match('#Comparative than', true).tag('AdjectivePhrase');
  //very easy
  result.match('#Adverb? #Adjective #Adverb?', true).tag('AdjectivePhrase');
  //is as strong as
  result.match('#AdjectivePhrase as', true).tag('AdjectivePhrase');
  return result;
};

module.exports = adjectivePhrase;
