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
      text: this.plaintext(),
      normal: this.normal(),
      negative: this.negative.normal(),
      augillary: this.auxillary.normal(),
      verb: this.verb.normal(),
    };
  }
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

}
module.exports = Verb;
