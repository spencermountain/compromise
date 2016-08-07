'use strict';
const methods = require('../term/methods');
const fns = require('../fns');
const SentenceList = require('../sentenceList/sentenceList');

// console.log(methods);
class TermList {
  constructor(terms, context) {
    this._terms = terms;
    this.context = context || {};
    //add filters
    Object.keys(methods.filters).forEach((method) => {
      this[method] = () => {
        this._terms = methods.filters[method](this._terms);
        return this;
      };
    });
    //add map over info methods
    Object.keys(methods.infos).forEach((method) => {
      this[method] = () => {
        return methods.infos[method](this._terms);
      };
    });
    //add transform methods
    Object.keys(methods.transforms).forEach((method) => {
      this[method] = () => {
        return methods.transforms[method](this);
      };
    });
    //add pluck methods
    Object.keys(methods.pluck).forEach((method) => {
      this[method] = () => {
        this._terms = this._terms.map((t) => t.pluck(method));
        this._terms = this._terms.filter(t => t);
        return this;
      };
    });
  }

  get length() {
    return this._terms.length;
  }

  /** remove all these selected terms from their sentences */
  remove() {
    this._terms.forEach((t) => t.remove());
    this._terms = [];
    return this.context.text;
  }
  /** fake foreach */
  forEach(fn) {
    this._terms.forEach(fn);
    return this;
  }
  /** fake map */
  map(fn) {
    return this._terms.map(fn);
  }
  /** fake map */
  filter(fn) {
    this._terms = this._terms.filter(fn);
    return this;
  }
  first() {
    return this._terms[0];
  }
  second() {
    return this._terms[1];
  }
  third() {
    return this._terms[2];
  }
  last() {
    return this._terms[this._terms.length - 1];
  }
  count() {
    return this._terms.length;
  }
  append(str) {
    this._terms.forEach((t) => {
      t.append(str);
    });
    return this.context.parent;
  }
  prepend(str) {
    this._terms.forEach((t) => {
      t.prepend(str);
    });
    return this.context.parent;
  }
  replace(str) {
    this._terms.forEach((t) => {
      t.replace(str);
    });
    return this.context.parent;
  }
  sentences() {
    let sentences = this._terms.map((t) => {
      return t.context.sentence;
    });
    return new SentenceList(sentences);
  }
  text() {
    return this._terms.reduce((str, t) => {
      str += t.whitespace.before + t.text + t.whitespace.after;
      return str;
    }, '');
  }
  /** return unique terms and their frequencies */
  byFreq() {
    let obj = {};
    //count repeating terms
    this._terms.forEach((t) => {
      obj[t.normal] = obj[t.normal] || 0;
      obj[t.normal] += 1;
    });
    let sum = fns.sum(fns.values(obj));
    //set percentage
    let result = Object.keys(obj).map((k) => {
      let percent = ((obj[k] / sum) * 100).toFixed(1);
      return {
        term: k,
        count: obj[k],
        percent: parseFloat(percent)
      };
    });
    //sort
    return result.sort((a, b) => {
      if (a.percent < b.percent) {
        return 1;
      }
      return -1;
    });
  }
}

module.exports = TermList;
