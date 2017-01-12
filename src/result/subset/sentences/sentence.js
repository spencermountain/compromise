'use strict';
const Terms = require('../../paths').Terms;
class Sentence extends Terms {
  data() {
    return {
      text: this.plaintext(),
      normal: this.normal()
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

  /** negate the main/first copula*/
  toNegative() {
    let cp = this.match('#Copula');
    if (cp.found) {
      cp.firstTerm().verbs().toNegative();
    } else {
      this.match('#Verb').firstTerm().verbs().toNegative();
    }
    return this;
  }
  toPositive() {
    this.match('#Negative').first().delete();
    return this;
  }

  setPunctuation(punct) {
    let last = this.terms[this.terms.length - 1];
    last.setPunctuation(punct);
  }
  getPunctuation(punct) {
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
