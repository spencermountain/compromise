'use strict';
//
const adjectivePhrase = function (r) {
  let reason = 'adjPhrase-correction';
  //is really not so good
  // r.match('#Copula+ #Adverb? #Negative? as? #Adverb? #Adjective').tag('AdjectivePhrase').term(0).tag('#Copula');
  // //stonger than
  // r.match('#Comparative than').tag('AdjectivePhrase');
  //very easy
  r.match('#Copula #Adverb? #Negative? #Adverb? #Adjective #Adverb?').match('#Adverb? #Adjective #Adverb?').tag('AdjectivePhrase', reason);
  //difficult but necessary
  r.match('#AdjectivePhrase #Conjunction #Adjective').tag('AdjectivePhrase', reason);
  //is as strong as
  r.match('#AdjectivePhrase as').tag('AdjectivePhrase', reason);
  return r;
};

module.exports = adjectivePhrase;
