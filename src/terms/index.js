'use strict';
const paths = require('./paths');
const log = paths.log;
const fns = paths.fns;
const Term = require('../term');
const matchTerms = require('./match');
const splitTerms = require('./splitTerms');

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
  return matchTerms(this, reg, verbose); //returns an array of matches
};

Terms.prototype.splitBefore = function(reg, verbose) {
  let all = [];
  let ms = matchTerms(this, reg, verbose); //returns an array of matches
  ms.forEach((match) => {
    splitTerms(this, match[0]).forEach((a) => {
      all.push(a);
    });
  });
  return all;
};

Terms.prototype.splitAfter = function(reg, verbose) {
  let all = [];
  let ms = matchTerms(this, reg, verbose); //returns an array of matches
  ms.forEach((match) => {
    let endTerm = match[match.length - 1];
    splitTerms(this, endTerm, true).forEach((a) => {
      all.push(a);
    });
  });
  return all;
};

Terms.prototype.splitOn = function(reg, verbose) {
  let all = [];
  let ms = matchTerms(this, reg, verbose); //returns an array of matches
  ms.forEach((mts) => {
    for(let i = 0; i < this.terms.length; i++) {
      if (this.terms[i] === mts[0]) {
        //first piece
        let before = this.terms.slice(0, i);
        all.push(before);

        //second piece
        let end_index = i + mts.length;
        let end = this.terms.slice(end_index, this.terms.length);
        all.push(end);
        return;
      }
    }
    all.push(this.terms);
  });
  return all;
};

Terms.prototype.subset = function(tag) {
  let terms = this.terms.filter((t) => {
    return t.tag[tag];
  });
  return new Terms(terms, this.context);
};

Terms.prototype.when = function(reg, verbose) {
  let found = matchTerms(this, reg, verbose); //returns an array of matches
  found.forEach((arr) => {
    arr.forEach((t) => {
      t.sel = true;
    });
  });
  return this;
};

Terms.prototype.remove = function(reg) {
  let ms = matchTerms(this, reg);
  ms = fns.flatten(ms);
  let terms = this.terms.filter((t) => {
    for(let i = 0; i < ms.length; i++) {
      if (t === ms[i]) {
        return false;
      }
    }
    return true;
  });
  return new Terms(terms, this.context);
};
module.exports = Terms;
