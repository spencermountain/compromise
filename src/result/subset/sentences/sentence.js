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

  //returns a Term object
  mainVerb() {
    //this should be more fancy..
    for(let i = 0; i < this.terms.length; i++) {
      let t = this.terms[i];
      if (t.tag.Verb && !t.tag.Auxillary) {
        return t;
      }
    }
    return null;
  }

  /** sentence tense conversion**/
  toPastTense() {
    let verb = this.mainVerb();
    if (verb) {
      verb.verb.toPastTense();
    }
    return this;
  }
  toPresentTense() {
    let verb = this.mainVerb();
    if (verb) {
      verb.verb.toPresentTense();
    }
    return this;
  }
  toFutureTense() {
    let verb = this.mainVerb();
    if (verb) {
      verb.verb.toFutureTense();
    }
    return this;
  }

  /** negate the main/first copula*/
  toNegative() {
    let cp = this.match('#Copula');
    if (cp.found) {
      cp.firstTerm().verbs().toNegative();
    } else {
      let verb = this.mainVerb();
      if (verb) {
        verb.verb.toNegative();
      }
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
