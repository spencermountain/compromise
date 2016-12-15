'use strict';
const Terms = require('../index');
const mutate = require('../mutate');

//whitespace
const addSpaceAt = (ts, i) => {
  if (!ts.terms.length || !ts.terms[i]) {
    return ts;
  }
  ts.terms[i].whitespace.before = ' ';
  return ts;
};

const insertMethods = (Terms) => {

  const methods = {
    insertBefore: function (str) {
      let ts = Terms.fromString(str);
      let index = this.index();
      //pad a space on parent
      addSpaceAt(this.parentTerms, index);
      if (index > 0) {
        addSpaceAt(ts, 0); //if in middle of sentence
      }
      this.parentTerms = mutate.insertAt(this.parentTerms, index, ts);
      return this.parentTerms;
    },
    insertAfter: function (str) {
      let ts = Terms.fromString(str);
      let index = this.terms[this.terms.length - 1].index();
      //beginning whitespace to ts
      addSpaceAt(ts, 0);
      this.parentTerms = mutate.insertAt(this.parentTerms, index + 1, ts);
      return this.parentTerms;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;
