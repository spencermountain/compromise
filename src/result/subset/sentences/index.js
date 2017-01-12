'use strict';
const Text = require('../../index');
const Sentence = require('./sentence');


class Sentences extends Text {
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
  passive() {
    this.list = this.list.filter((ts) => {
      return ts.isPassive();
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
  static find(r) {
    r = r.all();
    r.list = r.list.map((ts) => {
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Sentences;
