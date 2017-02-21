'use strict';
const Text = require('../../index');
const Sentence = require('./sentence');

class Sentences extends Text {
  constructor(arr, lexicon, reference) {
    super(arr, lexicon, reference);
  }
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  /** conjugate the main/first verb*/
  toPastTense() {
    this.list = this.list.map((ts) => {
      ts = ts.toPastTense();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  toPresentTense() {
    this.list = this.list.map((ts) => {
      ts = ts.toPresentTense();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  toFutureTense() {
    this.list = this.list.map((ts) => {
      ts = ts.toFutureTense();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  /** negative/positive */
  toNegative() {
    this.list = this.list.map((ts) => {
      ts = ts.toNegative();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  toPositive() {
    this.list = this.list.map((ts) => {
      ts = ts.toPositive();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }

  /** look for 'was _ by' patterns */
  isPassive() {
    this.list = this.list.filter((ts) => {
      return ts.isPassive();
    });
    return this;
  }
  /** add a word to the start */
  prepend(str) {
    this.list = this.list.map((ts) => {
      return ts.prepend(str);
    });
    return this;
  }
  /** add a word to the end */
  append(str) {
    this.list = this.list.map((ts) => {
      return ts.append(str);
    });
    return this;
  }

  /** convert between question/statement/exclamation*/
  toExclamation() {
    this.list.forEach((ts) => {
      ts.setPunctuation('!');
    });
    return this;
  }
  toQuestion() {
    this.list.forEach((ts) => {
      ts.setPunctuation('?');
    });
    return this;
  }
  toStatement() {
    this.list.forEach((ts) => {
      ts.setPunctuation('.');
    });
    return this;
  }
  static find(r, n) {
    r = r.all();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    // return new Text(r.list, r.lexicon, r.reference);
    return r;
  }
}

module.exports = Sentences;
