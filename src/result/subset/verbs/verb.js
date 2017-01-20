'use strict';
const Terms = require('../../paths').Terms;
const conjugate = require('./conjugate');

class Verb extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.negative = this.match('#Negative');
    this.verb = this.not('(#Auxillary|#Negative)').match('#Verb').last();
    this.auxillary = this.not('(#Negative|#Adverb)').match('#Auxillary');
    this.adverbs = this.match('#Adverb');
  }
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      parts: {
        negative: this.negative.out('normal'),
        auxillary: this.auxillary.out('normal'),
        verb: this.verb.out('normal'),
        adverbs: this.adverbs.out('normal'),
      }
    };
  }

  conjugate(debug) {
    return conjugate(this, debug);
  }

  /** negation **/
  isNegative() {
    return this.match('#Negative').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    let t = this.lastTerm();
    if (t.tag.Copula) {
      let i = t.index();
      this.insertAt(i, 'not');
    // t.copula.toNegative();
    } else {
      t.verb.toNegative();
    }
    return this;
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
