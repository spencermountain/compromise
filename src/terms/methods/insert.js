'use strict';
const Terms = require('../index');
const mutate = require('../mutate');

const insertMethods = (Terms) => {

  const methods = {
    insertBefore: function (str) {
      return this
    },
    insertAfter: function (str) {
      let ts = Terms.fromString(str)
      let index = this.terms[this.terms.length - 1].index()
      this.parentTerms = mutate.insertAt(this.parentTerms, index, ts)
      // console.log(this.parentTerms.normal())
      return this.parentTerms
    },
    insertAt: function (str, i) {}

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;
