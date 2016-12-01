'use strict';
const Text = require('../../index');

class Sentences extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list
    return this
  }
  find() {
    return this
  }
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
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm()
    nouns.nouns().toSingular()
    return this
  }
  toPlural() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm()
    nouns.nouns().toPlural()
    return this
  }

  /** negate the main/first copula*/
  toNegative() {
    let cp = this.match('#Copula')
    if (cp.found) {
      cp.firstTerm().verbs().toNegative();
    } else {
      this.match('#Verb').firstTerm().verbs().toNegative();
    }
    return this
  }
  toPositive() {
    this.match('#Negative').remove();
    return this
  }

  /** conjugate the main/first verb*/
  toPast() {
    return this
  }
  toPresent() {
    return this
  }
  toFuture() {
    return this
  }

  /** look for 'was _ by' patterns */
  isPassive() {
    //haha
    return this.match('was #Adverb? #PastTense #Adverb? by').found
  }
}

module.exports = Sentences;
