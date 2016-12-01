'use strict';
const Terms = require('../index');


const insertMethods = (Terms) => {

  const methods = {
    insertBefore: function (str) {
      let ts = Terms.fromString(str)
      this.terms = ts.terms.concat(this.terms)
      return this
    },
    insertAfter: function (str) {
      let ts = Terms.fromString(str)
      this.terms = this.terms.concat(ts.terms)
      let index = this.last().terms[0].index()
      console.log(this.all().wut())
      return this
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
