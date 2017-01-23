'use strict';
const Terms = require('../../paths').Terms;
const conjugate = require('./conjugate');
const interpret = require('./interpret');
const toNegative = require('./toNegative');

class Verb extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.negative = this.match('#Negative');
    this.adverbs = this.match('#Adverb');
    let aux = this.clone().not('(#Adverb|#Negative)');
    this.verb = aux.match('#Verb').last();
    this.auxillary = aux.match('#Auxillary+');
  }
  data(debug) {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      parts: {
        negative: this.negative.out('normal'),
        auxillary: this.auxillary.out('normal'),
        verb: this.verb.out('normal'),
        adverbs: this.adverbs.out('normal'),
      },
      interpret: interpret(this, debug)
    };
  }

  conjugate(debug) {
    return conjugate(this, debug);
  }

  /** negation **/
  isNegative() {
    return this.match('#Negative').list === 1;
  }
  isPerfect() {
    return this.auxillary.match('(have|had)').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  }
  toPositive() {
    return this.remove('#Negative');
  }

  /** conjugation **/
  toPastTense() {
    return this;
  }
  toPresentTense() {
    return this;
  }
  toFutureTense() {
    return this;
  }

  toAdjective() {
    return this;
  }

}
module.exports = Verb;
