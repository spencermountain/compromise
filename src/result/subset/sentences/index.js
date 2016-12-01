'use strict';
const Result = require('../../index');

class Sentences extends Result {
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
    return this
  }

  /** negate the main/first copula*/
  toNegative() {
    this.match('#Copula').verbs().negate();
  }
  toPositive() {
    this.match('#Negative').remove();
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
