'use strict';
const fns = require('../fns');
const methods = require('../sentence/index');

class SentenceList {
  constructor(sentences) {
    this._sentences = sentences;

    //add sentence transform methods
    Object.keys(methods.transform).forEach((k) => {
      let method = 'to' + fns.titleCase(k);
      this[method] = () => {
        this._sentences = this._sentences.map((s) => {
          return s.to(k);
        });
        return this;
      };
    });

  }
  /** flatten results into a reg array*/
  get arr() {
    return this._sentences;
  }
  if(str) {
    this._sentences = this._sentences.filter((s) => s.is(str));
    return this;
  }
  filter(fn) {
    this._sentences = this._sentences.filter(fn);
    return this;
  }
  first() {
    return this._sentences[0];
  }
  last() {
    return this._sentences[this._sentences.length - 1];
  }
  match(regStr) {
    return this;
  }
  text() {
    return this._sentences.reduce((str, s) => {
      return str + s.plaintext();
    }, '');
  }
  pretty() {
    this._sentences.forEach((s) => {
      s.pretty();
    });
  }

}

module.exports = SentenceList;
