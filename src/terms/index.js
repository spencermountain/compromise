'use strict';
const paths = require('./paths');
const log = paths.log;
const fns = paths.fns;
const Term = require('../term');
const matchTerms = require('./match');
const tagger = require('./tagger');

class Terms {
  constructor(arr, context) {
    this.terms = arr;
    this.context = context || {};
    this.get = (n) => {
      return this.terms[n];
    };
    // this.terms = this.arr;
  }
  get length() {
    return this.terms.length;
  }
  term(n) {
    return this.terms[n];
  }
  first() {
    return this.terms[0];
  }
  last() {
    return this.terms[this.terms.length - 1];
  }
  plaintext() {
    return this.terms.reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
  }
  normal() {
    return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ');
  }
  insertAt(text, i) {
    let term = new Term(text, this.context);
    this.terms.splice(i + 1, 0, term);
    return this;
  }
  map(fn) {
    return this.terms.map(fn);
  }
  filter(fn) {
    let terms = this.terms.filter(fn);
    return new Terms(terms, this.context);
  }
  endPunctuation() {
    return this.last().endPunctuation();
  }
  tagger() {
    tagger(this)
    return this
  }

}
//some other methods
Terms.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Terms(terms, this.context);
};

Terms.prototype.match = function(reg, verbose) {
  return matchTerms(this, reg, verbose); //returns an array of matches
};

Terms.prototype.remove = function(reg) {
  if (!reg) {
    this.terms.forEach((t) => {
      t.remove();
    });
    return this;
  }
  let ms = matchTerms(this, reg);
  ms = fns.flatten(ms);
  let terms = this.terms.filter((t) => {
    for (let i = 0; i < ms.length; i++) {
      if (t === ms[i]) {
        return false;
      }
    }
    return true;
  });
  return new Terms(terms, this.context);
};

Terms = require('./split')(Terms);

module.exports = Terms;
