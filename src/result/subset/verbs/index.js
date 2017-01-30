'use strict';
const Text = require('../../index');
const Verb = require('./verb');

class Verbs extends Text {
  constructor(arr, lexicon, reference) {
    super(arr, lexicon, reference);
  }
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  conjugation(debug) {
    return this.list.map((ts) => {
      return ts.conjugation(debug);
    });
  }
  conjugate(debug) {
    return this.list.map((ts) => {
      return ts.conjugate(debug);
    });
  }

  /** negation **/
  isNegative() {
    return this.filter((ts) => {
      ts.isNegative();
    });
  }
  toNegative() {
    this.list = this.list.map((ts) => {
      return ts.toNegative();
    });
    return this;
  }
  toPositive() {
    this.list.forEach((ts) => {
      ts.toPositive();
    });
    return this;
  }

  /** tense **/
  toPastTense() {
    this.list.forEach((ts) => {
      ts.toPastTense();
    });
    return this;
  }
  toPresentTense() {
    this.list.forEach((ts) => {
      ts.toPresentTense();
    });
    return this;
  }
  toFutureTense() {
    this.list.forEach((ts) => {
      ts.toFutureTense();
    });
    return this;
  }
  toInfinitive() {
    this.list.forEach((ts) => {
      ts.toInfinitive();
    });
    return this;
  }
  toAdjective() {
    this.list.forEach((ts) => {
      ts.toAdjective();
    });
    return this;
  }

  static find(r, n) {
    r = r.match('(#Adverb|#Auxillary|#Verb|#Negative|#Particle)+').if('#Verb'); //this should be (much) smarter
    r = r.splitAfter('#Comma');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Verb(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return new Text(r.list, this.lexicon, this.parent);
  // return r;
  }
}


module.exports = Verbs;
