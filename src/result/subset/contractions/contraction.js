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
      t._text = t.silent_term;
      t.normalize();
      t.silent_term = null;
      t.unTag('Contraction', 'expanded');
    }
  });
  return ts;
};

class Contraction extends Terms {
  data() {
    let expanded = expand(this.clone());
    let contracted = contract(this.clone());
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      expanded: {
        normal: expanded.out('normal'),
        text: expanded.out('text')
      },
      contracted: {
        normal: contracted.out('normal'),
        text: contracted.out('text')
      },
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
