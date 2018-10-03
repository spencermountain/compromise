'use strict';
const Text = require('../../text');
//the Acronym() subset class

const methods = {
  stripPeriods: function() {
    this.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        let chars = t._text.split('.');
        if (chars.length > 2) {
          t.text = chars.join('');
        }
      });
    });
    return this;
  },
  addPeriods: function() {
    this.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        let chars = t._text.split('.');
        if (chars.length > 2) {
          let str = t._text.replace(/\./g, '');
          t.text = str.split('').join('.') + '.';
        }
      });
    });
    return this;
  },
  data: function() {
    return this.terms().list.map(ts => {
      let t = ts.terms[0];
      let parsed = t.text
        .toUpperCase()
        .replace(/\./g, '')
        .split('');
      return {
        periods: parsed.join('.'),
        normal: parsed.join(''),
        text: t.text
      };
    });
  }
};

const find = function(r, n) {
  r = r.match('#Acronym');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
