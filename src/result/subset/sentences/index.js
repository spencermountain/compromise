'use strict';
const Text = require('../../index');
const Sentence = require('./sentence');


class Sentences extends Text {

  parse() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
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
    this.match('#Negative').delete();
    return this;
  }

  /** conjugate the main/first verb*/
  toPast() {
    return this;
  }
  toPresent() {
    return this;
  }
  toFuture() {
    return this;
  }

  /** look for 'was _ by' patterns */
  isPassive() {
    //haha
    return this.match('was #Adverb? #PastTense #Adverb? by').found;
  }
  static find(r) {
    r = r.all();
    r.list = r.list.map((ts) => {
      return new Sentence(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return r;
  }
}

module.exports = Sentences;
