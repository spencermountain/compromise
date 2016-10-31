'use strict';
const Result = require('../index');

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
        }
      });
    });
    return this.parent();
  }
  contract() {
    return this.parent();
  }
}

module.exports = Contractions;
