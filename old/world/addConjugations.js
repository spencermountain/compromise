'use strict';
const conjugate = require('../subset/verbs/methods/conjugate/faster.js');

//extend our current irregular conjugations, overwrite if exists
//also, map the irregulars for easy infinitive lookup - {bought: 'buy'}
const addConjugations = function(obj) {

  Object.keys(obj).forEach((inf) => {
    this.conjugations[inf] = this.conjugations[inf] || {};
    //add it to the lexicon
    this.words[inf] = this.words[inf] || 'Infinitive';
    Object.keys(obj[inf]).forEach((tag) => {
      let word = obj[inf][tag];
      //add this to our conjugations
      this.conjugations[inf][tag] = word;
      //add it to the lexicon, too
      this.words[word] = this.words[word] || tag;
      //also denormalize to cache.toInfinitive
      this.cache.toInfinitive[obj[inf][tag]] = inf;
    });
    //guess the other conjugations
    let forms = conjugate(inf, this);
    Object.keys(forms).forEach((k) => {
      let word = forms[k];
      if (this.words.hasOwnProperty(word) === false) {
        this.words[word] = k;
      }
    });
  });
  return obj;
};
module.exports = addConjugations;
