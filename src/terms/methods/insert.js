'use strict';
const Terms = require('../index');
const mutate = require('../mutate');

const insertMethods = (Terms) => {

  const methods = {
    insertBefore: function (str) {
      let ts = Terms.fromString(str)
      let index = this.terms[0].index()
      this.parentTerms = mutate.insertAt(this.parentTerms, index, ts)
      return this.parentTerms
    },
    insertAfter: function (str) {
      let ts = Terms.fromString(str)
      let index = this.terms[this.terms.length - 1].index()
      this.parentTerms = mutate.insertAt(this.parentTerms, index+1, ts)
      return this.parentTerms
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;
