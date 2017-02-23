'use strict';
const Terms = require('../../paths').Terms;
const toNegative = require('./toNegative');
const toPositive = require('./toPositive');
const Verb = require('../verbs/verb');
const insert = require('./smartInsert');

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

  /** find the first important verbPhrase. returns a Term object */
  mainVerb() {
    let terms = this.match('(#Adverb|#Auxillary|#Verb|#Negative|#Particle)+').if('#Verb'); //this should be (much) smarter
    if (terms.found) {
      terms = terms.list[0].terms;
      return new Verb(terms, this.lexicon, this.refText, this.refTerms);
    }
    return null;
  }

  /** sentence tense conversion**/
  toPastTense() {
    let verb = this.mainVerb();
    if (verb) {
      //this is really ugly..
      let start = verb.out('normal');
      verb.toPastTense();
      // console.log(verb.parentTerms.out() + '!');
      let end = verb.out('normal');
      let r = this.parentTerms.replace(start, end);
      return r;
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
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  }
  toPositive() {
    if (!this.isNegative()) {
      return this;
    }
    return toPositive(this);
  }

  /** smarter insert methods*/
  append(str) {
    return insert.append(this, str);
  }
  prepend(str) {
    return insert.prepend(this, str);
  }

  /** punctuation */
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
    return this.match('was #Adverb? #PastTense #Adverb? by').found; //haha
  }
}
module.exports = Sentence;
