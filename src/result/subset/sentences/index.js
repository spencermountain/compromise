'use strict';
const Text = require('../../index');
const Sentence = require('./sentence');


class Sentences extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
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
  static find(r, n) {
    r = r.all();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return new Text(r.list, this.lexicon, this.parent);
  }
}

module.exports = Sentences;
