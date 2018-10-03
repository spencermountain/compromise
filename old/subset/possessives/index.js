'use strict';
const Text = require('../../text');
// const Terms = require('../../paths').Terms;

const methods = {
  //remove the 's on the end of the word
  strip() {
    this.list.forEach((ts) => {
      let t = ts.terms[ts.terms.length - 1];
      t.text = t.text.replace(/'s$/, '');
      t.unTag('Possessive', '.strip()');
    });
    return this;
  }
};

const find = function(r, n) {
  r = r.match('#Possessive+');
  r = r.splitAfter('#Comma');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
