'use strict';

const caseMethods = (Terms) => {

  const methods = {

    toTitleCase: function () {
      this.terms.forEach((t) => {
        t.text = t.term.titlecase()
      })
      return this
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = caseMethods;
