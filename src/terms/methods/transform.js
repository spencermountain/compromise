'use strict';
const Term = require('../../term');

const transforms = (Terms) => {

  const methods = {

    insertAt: function (text, i) {
      let term = new Term(text, this.context);
      this.terms.splice(i + 1, 0, term);
      return this;
    },
    clone: function () {
      let terms = this.terms.map((t) => {
        return t.clone();
      });
      return new Terms(terms, this.lexicon, this.parent);
    },
    hyphenate: function () {
      this.terms.forEach((t, i) => {
        if (i !== this.terms.length - 1) {
          t.whitespace.after = '-';
        }
        if (i !== 0) {
          t.whitespace.before = '';
        }
      });
      return this;
    },
    deHyphenate: function () {
      this.terms.forEach((t, i) => {
        if (t.whitespace.after === '-') {
          t.whitespace.after = ' ';
        }
      });
      return this;
    },

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = transforms;
