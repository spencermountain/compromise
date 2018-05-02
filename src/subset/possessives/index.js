'use strict';
const Text = require('../../text');
const Terms = require('../../paths').Terms;

const methods = {
  //remove the 's on it
  normalize() {
    this.list.forEach((ts) => {
      let t = ts.terms[ts.terms.length - 1];
      console.log(t.text);
    });
  }
};

const find = function(r, n) {
  r = r.match('#Possessive+');
  r.debug();
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
