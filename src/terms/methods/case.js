'use strict';

const caseMethods = (Terms) => {

  const methods = {

    toTitleCase: function () {
      this.terms.forEach((t) => {
        t.text = t.term.titlecase();
      });
      return this;
    },
    toLowerCase: function () {
      this.terms.forEach((t) => {
        t.text = t.text.toLowerCase();
      });
      return this;
    },
    toUpperCase: function () {
      this.terms.forEach((t) => {
        t.text = t.text.toUpperCase();
      });
      return this;
    },
    toCamelCase: function() {
      this.toTitleCase();
      this.terms.forEach((t, i) => {
        if (i !== 0) {
          t.whitespace.before = '';
        }
        t.whitespace.after = '';
      });
      return this;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = caseMethods;
