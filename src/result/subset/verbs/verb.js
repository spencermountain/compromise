'use strict';
const Terms = require('../../paths').Terms;

class Verb extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.negative = this.match('#Negative');
    this.auxillary = this.not('#Negative').match('#Auxillary');
    this.verb = this.not('#Auxillary').match('#Verb');
  }
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      negative: this.negative.out('normal'),
      augillary: this.auxillary.out('normal'),
      verb: this.verb.out('normal'),
    };
  }

  conjugate(debug) {
    return this.verb.list[0].terms[0].verb.conjugate(debug);
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
