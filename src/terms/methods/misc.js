'use strict';

const miscMethods = (Terms) => {

  const methods = {
    term: function (n) {
      return this.terms[n];
    },
    first: function () {
      let t = this.terms[0]
      return new Terms([t]);
    },
    last: function () {
      let t = this.terms[this.terms.length - 1]
      return new Terms([t]);
    },
    endPunctuation: function () {
      return this.last().terms[0].endPunctuation();
    },
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;
