'use strict';
const Text = require('../../index');
const Contraction = require('./contraction');
const findPossible = require('./findPossible');

class Contractions extends Text {
  data() {
    return this.list.map(ts => ts.data());
  }
  contract() {
    this.forEach((ts) => ts.contract());
    return this;
  }
  expand() {
    this.forEach((ts) => ts.expand());
    return this;
  }
  static find(r) {
    //find currently-contracted
    let found = r.match('#Contraction #Contraction');
    found.list = found.list.map((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
      c.contracted = true;
      return c;
    });
    //find currently-expanded
    let expanded = findPossible(r);
    expanded.list.forEach((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
      c.contracted = false;
      found.list.push(c);
    });
    found.sort('chronological');
    return found;
  }
}

module.exports = Contractions;
