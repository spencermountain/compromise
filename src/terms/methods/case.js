'use strict';

const caseMethods = (Terms) => {

  const methods = {

    toTitleCase: function () {
      this.terms.forEach((t) => {
        t.text = t.term.titlecase();
      });
      this.terms.tagAs('#TitleCase');
      return this;
    },
    toLowerCase: function () {
      this.terms.forEach((t) => {
        t.text = t.text.toLowerCase();
      });
      this.terms.unTag('#TitleCase');
      this.terms.unTag('#UpperCase');
      return this;
    },
    toUpperCase: function () {
      this.terms.forEach((t) => {
        t.text = t.text.toUpperCase();
      });
      this.terms.tagAs('#UpperCase');
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
      this.terms.tagAs('#CamelCase');
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
