'use strict';
//
const adjectivePhrase = function (r) {
  //is really not so good
  // r.match('#Copula+ #Adverb? #Negative? as? #Adverb? #Adjective').tag('AdjectivePhrase').term(0).tag('#Copula');
  // //stonger than
  // r.match('#Comparative than').tag('AdjectivePhrase');
  //very easy
  r.match('#Copula #Adverb? #Negative? #Adverb? #Adjective #Adverb?').match('#Adverb? #Adjective #Adverb?').tag('AdjectivePhrase');
  //difficult but necessary
  r.match('#AdjectivePhrase #Conjunction #Adjective').tag('AdjectivePhrase');
  //is as strong as
  r.match('#AdjectivePhrase as').tag('AdjectivePhrase');
  return r;
};

module.exports = adjectivePhrase;
