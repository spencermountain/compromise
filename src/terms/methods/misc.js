'use strict';

const miscMethods = (Terms) => {

  const methods = {
    term: function(n) {
      return this.terms[n];
    },
    first: function() {
      return this.terms[0];
    },
    last: function() {
      return this.terms[this.terms.length - 1];
    },
    map: function(fn) {
      return this.terms.map(fn);
    },
    filter: function(fn) {
      let terms = this.terms.filter(fn);
      return new Terms(terms, this.context);
    },
    endPunctuation: function() {
      return this.last().endPunctuation();
    },

    plaintext: function() {
      return this.terms.reduce((str, t) => {
        str += t.plaintext();
        return str;
      }, '');
    },
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;
