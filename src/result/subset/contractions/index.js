'use strict';
const Text = require('../../index');
const contract = require('./contract');

class Contractions extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    return this.match('#Contraction+');
  }
  parse() {
    return this.terms.map((t) => {
      return {
        text: t.text
      };
    });
  }
  expand() {
    this.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        if (t.silent_term) {
          if (!t.text) {
            t.whitespace.before = ' ';
          }
          t.text = t.silent_term;
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
