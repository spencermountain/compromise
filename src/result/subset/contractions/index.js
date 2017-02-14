'use strict';
const Text = require('../../index');
const Contraction = require('./contraction');
const findPossible = require('./findPossible');

class Contractions extends Text {
  data() {
    return this.list.map(ts => ts.data());
  }
  contract() {
    this.list.forEach((ts) => ts.contract());
    return this;
  }
  expand() {
    this.list.forEach((ts) => ts.expand());
    return this;
  }
  contracted() {
    this.list = this.list.filter((ts) => {
      return ts.contracted;
    });
    return this;
  }
  expanded() {
    this.list = this.list.filter((ts) => {
      return !ts.contracted;
    });
    return this;
  }
  static find(r, n) {
    //find currently-contracted
    let found = r.match('#Contraction #Contraction #Contraction?');
    found.list = found.list.map((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      c.contracted = true;
      return c;
    });
    //find currently-expanded
    let expanded = findPossible(r);
    expanded.list.forEach((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      c.contracted = false;
      found.list.push(c);
    });
    found.sort('chronological');
    //get nth element
    if (typeof n === 'number') {
      found = found.get(n);
    }
    return found;
  }
}

module.exports = Contractions;
