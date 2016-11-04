'use strict';
const Result = require('../index');
const contract = require('./contract');

class Contractions extends Result {
  constructor(list) {
    super(list);
    this.when('#Contraction+');
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
    return this.parent();
  }
  contract() {
    return contract(this.parent());
  }
}

module.exports = Contractions;
