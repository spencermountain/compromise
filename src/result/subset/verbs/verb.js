'use strict';
const Terms = require('../../paths').Terms;
const conjugate = require('./methods/conjugate');
const toAdjective = require('./methods/toAdjective');
const interpret = require('./interpret');
const toNegative = require('./toNegative');
const isPlural = require('./methods/isPlural');

class Verb extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.parse();
  }
  parse() {
    this.negative = this.match('#Negative');
    this.adverbs = this.match('#Adverb');
    let aux = this.clone().not('(#Adverb|#Negative)');
    this.verb = aux.match('#Verb').not('#Particle').last();
    this.particle = aux.match('#Particle').last();
    if (this.verb.found) {
      this.verb = this.verb.list[0].terms[0];
    }
    this.auxillary = aux.match('#Auxillary+');
  }
  data(verbose) {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      parts: {
        negative: this.negative.out('normal'),
        auxillary: this.auxillary.out('normal'),
        verb: this.verb.out('normal'),
        adverbs: this.adverbs.out('normal'),
      },
      interpret: interpret(this, verbose),
      conjugations: this.conjugate()
    };
  }
  getNoun() {
    if (!this.refTerms) {
      return null;
    }
    let str = '#Adjective? #Noun+ ' + this.out('normal');
    return this.refTerms.match(str).match('#Noun+');
  }
  //which conjugation is this right now?
  conjugation() {
    return interpret(this, false).tense;
  }
  //blast-out all forms
  conjugate(verbose) {
    return conjugate(this, verbose);
  }

  isPlural() {
    return isPlural(this);
  }
  /** negation **/
  isNegative() {
    return this.match('#Negative').list.length === 1;
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
    return this.match('#Negative').delete();
  }

  /** conjugation **/
  toPastTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.PastTense);
  }
  toPresentTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.PresentTense);
  }
  toFutureTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.FutureTense);
  }
  toInfinitive() {
    let obj = this.conjugate();
    //NOT GOOD. please fix
    this.terms[this.terms.length - 1].text = obj.Infinitive;
    return this;
  }

  asAdjective() {
    return toAdjective(this.verb.out('normal'));
  }

}
module.exports = Verb;
