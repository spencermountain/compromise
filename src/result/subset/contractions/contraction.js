'use strict';
const Terms = require('../../paths').Terms;
const contract = require('./contract');

const expand = function(ts) {
  if (ts.contracted === false) {
    return ts;
  }
  ts.terms.forEach((t) => {
    if (t.silent_term) {
      //this term also needs a space now too
      if (!t.text) {
        t.whitespace.before = ' ';
      }
      t.text = t.silent_term;
      t.silent_term = null;
      t.unTag('Contraction', 'expanded');
    }
  });
  return ts;
};

class Contraction extends Terms {
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      isContracted: !!this.contracted
    };
  }
  expand() {
    return expand(this);
  }
  contract() {
    return contract(this);
  }
}
module.exports = Contraction;
