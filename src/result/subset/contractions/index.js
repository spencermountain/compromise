'use strict';
const Result = require('../../index');
const contract = require('./contract');

class Contractions extends Result {
  constructor(list) {
    super(list);
    this.match('#Contraction+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {};
    });
  }
  expand() {
    this.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        if (t.silent_term) {
          t.text = t.silent_term;
          t.whitespace.before = ' ';
          t.unTag('Contraction', 'expanded');
        }
      });
    });
    return this.all();
  }
  contract() {
    return contract(this.all());
  }
}

module.exports = Contractions;
