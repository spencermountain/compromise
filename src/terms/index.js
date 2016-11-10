'use strict';
const paths = require('./paths');
const log = paths.log;
const fns = paths.fns;
const Term = require('../term');
const match = require('./match');

class Terms {
  constructor(arr, context) {
    this.terms = arr;
    this.context = context || {};
    this.get = (n) => {
      return this.terms[n];
    };
  // this.terms = this.arr;
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
  get length() {
    return this.terms.length;
  }
  plaintext() {
    return this.terms.filter((t) => t.sel).reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
  }
  normal() {
    return this.terms.filter((t) => t.sel && t.text).map((t) => t.normal).join(' ');
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

}
//some other methods
Terms.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Terms(terms, this.context);
};

Terms.prototype.match = function(reg, verbose) {
  return match(this, reg, verbose); //returns an array of matches
};

//make one split, from a term Object
Terms.prototype.splitAt = function(term) {
  let before = [];
  let after = [];
  for(let i = 0; i < this.terms.length; i++) {
    let t = this.terms[i];
    if (t == term) {
      let len = this.terms.length;
      before.push(this.terms[i]);
      after = this.terms.slice(i + 1, len);
      if (before.length > 0) {
        return [before, after];
      }
      return [after];
    }
    before.push(this.terms[i]);
  }
  return [before];
};

Terms.prototype.splitAfter = function(reg, verbose) {
  let terms = [];
  let ms = match(this, reg, verbose); //returns an array of matches
  ms.forEach((match) => {
    let endTerm = match[match.length - 1];
    let arr = this.splitAt(endTerm);
    for(let i = 0; i < arr.length; i++) {
      terms.push(arr[i]);
    }
  });
  return terms;
};

Terms.prototype.subset = function(tag) {
  let terms = this.terms.filter((t) => {
    return t.tag[tag];
  });
  return new Terms(terms, this.context);
};

Terms.prototype.when = function(reg, verbose) {
  let found = match(this, reg, verbose); //returns an array of matches
  found.forEach((arr) => {
    arr.forEach((t) => {
      t.sel = true;
    });
  });
  return this;
};

Terms.prototype.remove = function(reg) {
  let matchTerms = match(this, reg);
  matchTerms = fns.flatten(matchTerms);
  let terms = this.terms.filter((t) => {
    for(let i = 0; i < matchTerms.length; i++) {
      if (t === matchTerms[i]) {
        return false;
      }
    }
    return true;
  });
  return new Terms(terms, this.context);
};
module.exports = Terms;
