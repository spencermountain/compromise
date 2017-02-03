'use strict';
const Terms = require('../../paths').Terms;
const toNegative = require('./toNegative');
const Verb = require('../verbs/verb');

class Sentence extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
  }
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal')
    };
  }
  /** inflect the main/first noun*/
  toSingular() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toSingular();
    return this;
  }
  toPlural() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toPlural();
    return this;
  }

  //returns a Term object
  mainVerb() {
    let terms = this.match('(#Verb|#Auxillary|#Adverb|#Particle)+').list[0].terms;
    return new Verb(terms, this.lexicon, this.refText, this.refTerms);
  }

  /** sentence tense conversion**/
  toPastTense() {
    let verb = this.mainVerb();
    if (verb) {
      //this is really ugly..
      let start = verb.out('normal');
      verb.toPastTense();
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  }
  toPresentTense() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      verb.toPresentTense();
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  }
  toFutureTense() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      verb.toFutureTense();
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  }

  /** negation **/
  isNegative() {
    return this.match('#Negative').list.length === 1;
  }
  /** negate the main/first copula*/
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  }
  toPositive() {
    this.match('#Negative').first().remove();
    return this;
  }

  setPunctuation(punct) {
    let last = this.terms[this.terms.length - 1];
    last.setPunctuation(punct);
  }
  getPunctuation() {
    let last = this.terms[this.terms.length - 1];
    return last.getPunctuation();
  }
  /** look for 'was _ by' patterns */
  isPassive() {
    //haha
    return this.match('was #Adverb? #PastTense #Adverb? by').found;
  }
}
module.exports = Sentence;
